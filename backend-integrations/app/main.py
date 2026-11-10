"""
FastAPI Backend — Natulim Style Shopify Integrations
"""

import os
import hashlib
import hmac
import json
from typing import Optional

from fastapi import FastAPI, Request, HTTPException, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import redis.asyncio as redis
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# === Configuración ===
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
DB_URL = os.getenv("DATABASE_URL", "sqlite:///./natulim_integrations.db")

redis_client = redis.from_url(REDIS_URL, decode_responses=True)
engine = create_engine(DB_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# === Models ===
class IntegrationLog(BaseModel):
    """Log de integración con campos clave"""
    order_id: Optional[str] = None
    external_id: Optional[str] = None
    status: str = "pending"
    error: Optional[str] = None
    raw_data: Optional[dict] = None
    processed_at: Optional[str] = None

# === Base DB ===
class Integration(Base):
    __tablename__ = "integrations"
    
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(String, unique=True, index=True)
    external_system = Column(String, default="shopify")
    status = Column(String, default="pending")
    error = Column(String, nullable=True)
    raw_data = Column(Text, nullable=True)
    processed_at = Column(String, nullable=True)

Base.metadata.create_all(bind=engine)

# === App ===
app = FastAPI(
    title="Natulim Style Integrations",
    description="Backend FastAPI para integraciones con Shopify, Odoo y operadores logísticos",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Dependencias ===
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# === Health Check ===
@app.get("/api/health")
async def health():
    return {"status": "ok", "redis": redis_client.ping()}

# === Webhooks ===
async def verify_shopify_webhook(request: Request) -> bool:
    """Verificar firma HMAC de webhook de Shopify"""
    body = await request.body()
    signature = request.headers.get("X-Shopify-Hmac-Sha256", "")
    timestamp = request.headers.get("X-Shopify-Webhook-Timeout", "")
    
    if not signature:
        return False
    
    secret = os.getenv("SHOPIFY_WEBHOOK_SECRET", "")
    if not secret:
        # Firmar con base64 decodificado
        import base64
        secret = base64.b64decode(secret.encode())
    
    mac = hmac.new(secret, body, hashlib.sha256).hexdigest()
    expected = "sha256=" + mac
    
    # Verificamos con timing-safe compare
    return hmac.compare_digest(expected, signature)

@app.post("/api/webhooks/orders")
async def shopify_orders_webhook(request: Request, db: Session = Depends(get_db)):
    """Webhook de nuevos pedidos de Shopify"""
    if not await verify_shopify_webhook(request):
        raise HTTPException(status_code=401, detail="Firma de webhook inválida")
    
    body = await request.json()
    order_data = body.get("order", {})
    order_id = order_data.get("id")
    
    if not order_id:
        raise HTTPException(status_code=400, detail "No hay order_id")
    
    # Verificar idempotency key
    idempotency_key = request.headers.get("X-Idempotency-Key", "")
    if idempotency_key:
        cached = redis_client.get(f"idem:{idempotency_key}")
        if cached:
            return {"status": "idempotent", "data": json.loads(cached)}
    
    # Guardar log
    db_integration = Integration(
        order_id=order_id,
        external_system="shopify",
        status="processing",
        raw_data=json.dumps(order_data)
    )
    db.add(db_integration)
    db.commit()
    
    # Encolar tarea
    await redis_client.lpush("queue:orders", json.dumps(order_data))
    
    # Guardar idempotency key
    if idempotency_key:
        redis_client.setex(f"idem:{idempotency_key}", 86400, json.dumps({
            "status": "processing",
            "order_id": order_id
        }))
    
    return {"status": "received", "order_id": order_id, "queued": True}

@app.post("/api/webhooks/fulfillments")
async def shopify_fulfillments_webhook(request: Request):
    """Webhook de fulfillments de Shopify"""
    if not await verify_shopify_webhook(request):
        raise HTTPException(status_code=401, detail="Firma de webhook inválida")
    
    body = await request.json()
    fulfillment_data = body.get("fulfillment", {})
    fulfillment_id = fulfillment_data.get("id")
    
    return {"status": "received", "fulfillment_id": fulfillment_id}

# === Endpoints CRUD ===
@app.get("/api/orders")
async def list_orders(
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Integration).filter(Integration.external_system == "shopify")
    if status:
        query = query.filter(Integration.status == status)
    return query.all()

@app.post("/api/orders")
async def create_order(
    order: dict,
    db: Session = Depends(get_db)
):
    # Simular integración
    db_integration = Integration(
        order_id=str(order.get("id", "new")),
        external_system="shopify",
        status="created",
        raw_data=json.dumps(order)
    )
    db.add(db_integration)
    db.commit()
    return db_integration

# === Suscripciones ===
@app.get("/api/subscriptions")
async def list_subscriptions():
    return []

@app.post("/api/subscriptions")
async def create_subscription(subscription: dict):
    return {"status": "created", "data": subscription}

# === Idempotency ===
@app.post("/api/idempotency")
async def register_idempotency(
    key: str = Header(...),
    method: str = Header(...),
    path: str = Header(...),
    body: str = Header(...)
):
    await redis_client.setex(f"idem:{key}", 86400, body)
    return {"status": "registered", "key": key}

# === Workers (simulación con Redis) ===
@app.on_event("startup")
async def startup():
    # Simular colas de trabajadores
    async def consume_orders():
        while True:
            item = await redis_client.lpop("queue:orders")
            if item:
                data = json.loads(item)
                # Lógica: sincronizar con Odoo, actualizar inventario
                pass
    
    async def reconcile_inventory():
        """Reconciliar diferencias entre Shopify y Odoo"""
        while True:
            # Simular búsqueda de diferencias
            await redis_client.sleep(300)  # Cada 5 minutos
            # Lógica: comparar stock Shopify vs Odoo, detectar discrepancies
    
    # Iniciar tareas en background
    import asyncio
    asyncio.create_task(consume_orders())
    asyncio.create_task(reconcile_inventory())