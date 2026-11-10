# Backend Integrations — FastAPI

FastAPI backend para integraciones con Shopify, Odoo, operadores logísticos y reconciliación de datos.

## Endpoints

- `GET /api/products` — Listar productos (con filtros)
- `GET /api/orders` — Listar pedidos
- `GET /api/orders/{id}` — Detalle de pedido
- `POST /api/webhooks/orders` — Webhook de nuevos pedidos (Shopify)
- `POST /api/webhooks/fulfillments` — Webhook de fulfillments
- `POST /api/subscriptions` — Crear suscripción
- `GET /api/subscriptions` — Listar suscripciones
- `POST /api/idempotency` — Registrar idempotency key

## Tecnologías

- FastAPI (Python 3.11)
- Pydantic v2 (validación de datos)
- SQLAlchemy (ORM)
- Redis (colas, idempotency)
- Odoo REST API (integración Odoo)
- Operadores logísticos (correos, MRW, etc.)
- Webhooks Shopify (verificación HMAC, idempotencia)

## Arquitectura

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  FastAPI Backend │────▶│  Redis (queues)  │────▶│  External APIs  │
│  (Python)        │     │  (idempotency)   │     │  (Shopify, Odoo)│
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

## Idempotency

Cada endpoint que puede duplicar se requiere un `idempotency_key` (header `X-Idempotency-Key`). El backend lo almacena en Redis con TTL de 24h.

## Webhooks

- **Shopify Orders** — Verifica firma HMAC, extrae `order_id`, crea/actualiza registro en DB.
- **Shopify Fulfillments** — Actualiza estado de inventario, crea tickets de envío.
- **Odoo** — Sincroniza productos y precios.
- **Logistics** — Actualiza estado de envío, genera etiquetas.

## Idempotency Keys

```
POST /api/idempotency
{
  "key": "unique-key",
  "method": "POST",
  "path": "/api/orders",
  "body": { ... }
}
```

Si la misma key se envía, se devuelve el resultado anterior sin procesar de nuevo.
