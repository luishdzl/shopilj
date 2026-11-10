"""
FastAPI Backend — Natulim Style Integrations
RAMA "vercel": sin base de datos ni Redis.
Todo se consume y persiste desde/hacia archivos JSON locales.

- Los datos semilla viven en `backend-integrations/data/*.json`.
- El estado en tiempo de ejecución se guarda en memoria y, si el
  filesystem es escribible, se refleja en JSON (en Vercel usar /tmp).
"""

import json
import os
import hashlib
import hmac
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Optional

from fastapi import FastAPI, Request, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)

# En Vercel el repo es read-only: escribimos en /tmp
WRITE_DIR = Path(os.getenv("JSON_STORE_DIR", tempfile.gettempdir()))
WRITE_DIR.mkdir(parents=True, exist_ok=True)

ORDERS_FILE = WRITE_DIR / "orders.json"
IDEMPOTENCY_FILE = WRITE_DIR / "idempotency.json"
SEED_PRODUCTS_FILE = DATA_DIR / "products.json"


def _read_json(path: Path, default: Any) -> Any:
    try:
        with path.open("r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return default


def _write_json(path: Path, data: Any) -> None:
    try:
        with path.open("w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    except OSError:
        # Filesystem de solo lectura (p. ej. Vercel): seguimos en memoria
        pass


# Estado en memoria (fuente de verdad en runtime)
_orders: list[dict] = _read_json(ORDERS_FILE, [])
_idempotency: dict[str, dict] = _read_json(IDEMPOTENCY_FILE, {})

app = FastAPI(
    title="Natulim Style Integrations (JSON edition)",
    description="Backend sin base de datos: todo desde JSON. Compatible con Vercel.",
    version="0.2.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============ Health ============
@app.get("/api/health")
async def health():
    return {
        "status": "ok",
        "storage": "json",
        "database": None,
        "runtime_dir": str(WRITE_DIR),
    }


# ============ Catálogo (lectura desde JSON) ============
@app.get("/api/products")
async def list_products():
    data = _read_json(SEED_PRODUCTS_FILE, {"products": []})
    return data.get("products", [])


@app.get("/api/products/{handle}")
async def get_product(handle: str):
    data = _read_json(SEED_PRODUCTS_FILE, {"products": []})
    for product in data.get("products", []):
        if product.get("handle") == handle or product.get("id") == handle:
            return product
    raise HTTPException(status_code=404, detail="Producto no encontrado")


# ============ Webhooks ============
async def verify_shopify_webhook(request: Request) -> bool:
    """Verifica la firma HMAC de Shopify (si hay secreto configurado)."""
    secret = os.getenv("SHOPIFY_WEBHOOK_SECRET", "")
    if not secret:
        # Sin secreto configurado (modo demo) no bloqueamos
        return True

    body = await request.body()
    signature = request.headers.get("X-Shopify-Hmac-Sha256", "")
    if not signature:
        return False

    mac = hmac.new(secret.encode(), body, hashlib.sha256).hexdigest()
    expected = "sha256=" + mac
    return hmac.compare_digest(expected, signature)


def _is_duplicate(key: Optional[str]) -> Optional[dict]:
    if not key:
        return None
    return _idempotency.get(key)


@app.post("/api/webhooks/orders")
async def shopify_orders_webhook(
    request: Request,
    x_idempotency_key: Optional[str] = Header(default=None),
):
    if not await verify_shopify_webhook(request):
        raise HTTPException(status_code=401, detail="Firma de webhook inválida")

    body = await request.json()
    order_data = body.get("order", body)
    order_id = order_data.get("id")

    if not order_id:
        raise HTTPException(status_code=400, detail="No hay order_id")

    duplicate = _is_duplicate(x_idempotency_key)
    if duplicate:
        return {"status": "idempotent", "data": duplicate}

    record = {
        "order_id": str(order_id),
        "external_system": "shopify",
        "status": "queued",
        "raw_data": order_data,
        "processed_at": datetime.now(timezone.utc).isoformat(),
    }
    _orders.append(record)
    _write_json(ORDERS_FILE, _orders)

    if x_idempotency_key:
        _idempotency[x_idempotency_key] = record
        _write_json(IDEMPOTENCY_FILE, _idempotency)

    return {"status": "received", "order_id": str(order_id), "queued": True}


@app.post("/api/webhooks/fulfillments")
async def shopify_fulfillments_webhook(request: Request):
    if not await verify_shopify_webhook(request):
        raise HTTPException(status_code=401, detail="Firma de webhook inválida")

    body = await request.json()
    fulfillment_data = body.get("fulfillment", body)
    return {
        "status": "received",
        "fulfillment_id": fulfillment_data.get("id"),
        "processed_at": datetime.now(timezone.utc).isoformat(),
    }


# ============ Órdenes ============
@app.get("/api/orders")
async def list_orders(status: Optional[str] = None):
    if status:
        return [o for o in _orders if o.get("status") == status]
    return _orders


@app.post("/api/orders")
async def create_order(order: dict):
    record = {
        "order_id": str(order.get("id", f"local-{len(_orders) + 1}")),
        "external_system": "local",
        "status": "created",
        "raw_data": order,
        "processed_at": datetime.now(timezone.utc).isoformat(),
    }
    _orders.append(record)
    _write_json(ORDERS_FILE, _orders)
    return record


# ============ Idempotencia ============
@app.post("/api/idempotency")
async def register_idempotency(
    key: str = Header(...),
    method: str = Header(...),
    path: str = Header(...),
    body: str = Header(...),
):
    _idempotency[key] = {
        "method": method,
        "path": path,
        "body": body,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    _write_json(IDEMPOTENCY_FILE, _idempotency)
    return {"status": "registered", "key": key}


@app.get("/api/idempotency/{key}")
async def get_idempotency(key: str):
    value = _idempotency.get(key)
    if not value:
        raise HTTPException(status_code=404, detail="Idempotency key no encontrada")
    return value


# ============ Reconciliación (demo desde JSON) ============
@app.get("/api/reconcile")
async def reconcile():
    """Compara el catálogo JSON con las órdenes registradas (demo)."""
    products = _read_json(SEED_PRODUCTS_FILE, {"products": []}).get("products", [])
    return {
        "products_checked": len(products),
        "orders_checked": len(_orders),
        "discrepancies": [],
        "source": "json",
        "checked_at": datetime.now(timezone.utc).isoformat(),
    }