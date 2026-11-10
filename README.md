# Shopilj — Natulim-style Shopify Mini Project (rama `vercel`)

> Esta rama es la versión **sin base de datos**: todo el catálogo y el estado se
> consumen desde archivos **JSON**. Diseñada para desplegar el storefront en
> **Vercel** sin PostgreSQL, Redis ni SQLite.

## 🚀 Qué cambia en esta rama

| Componente | Antes (main) | Ahora (`vercel`) |
|------------|--------------|------------------|
| Storefront | Shopify Storefront API | JSON local (`storefront/data/*.json`) |
| Backend | PostgreSQL + Redis + SQLAlchemy | JSON en memoria + persistencia a archivo |
| Docker | Postgres + Redis + servicios | Solo backend + storefront |
| Vercel | Requería servicios externos | 100% serverless-friendly |

## 📁 Datos JSON

- `storefront/data/products.json` → catálogo de productos
- `storefront/data/collections.json` → colecciones
- `storefront/data/faqs.json` → FAQs + frecuencias de suscripción
- `backend-integrations/data/products.json` → semilla del backend

La librería `storefront/lib/data.ts` es la única capa de acceso a datos del
frontend. Para cambiar el catálogo, edita los JSON (no hace falta tocar código).

## 🧠 Backend sin base de datos

`backend-integrations/app/main.py`:
- Lee el catálogo desde `data/products.json`.
- Guarda órdenes e idempotency keys en memoria y las persiste a JSON.
- En Vercel el filesystem de solo lectura, así que usa `/tmp` (`JSON_STORE_DIR`).
- Verifica firmas HMAC de webhooks **solo si** `SHOPIFY_WEBHOOK_SECRET` existe
  (en modo demo no bloquea).

Endpoints principales:

```
GET  /api/health
GET  /api/products
GET  /api/products/{handle}
POST /api/webhooks/orders
POST /api/webhooks/fulfillments
GET  /api/orders
POST /api/orders
POST /api/idempotency
GET  /api/idempotency/{key}
GET  /api/reconcile
```

## 💻 Correr en local

```bash
docker compose up
```

- Storefront → http://localhost:3000
- Backend    → http://localhost:8000/docs

O sin Docker:

```bash
# Storefront
cd storefront && npm install && npm run dev

# Backend
cd backend-integrations
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## ▲ Desplegar en Vercel

1. Importa el repo en Vercel.
2. Configura **Root Directory** = `storefront`.
3. Framework preset: **Next.js**.
4. No necesitas variables de base de datos. (Opcional: `SHOPIFY_WEBHOOK_SECRET`.)
5. Deploy.

## Estructura

```
shopilj/
├── theme/                    # Tema Shopify Dawn (Liquid)
├── storefront/               # Next.js + JSON (Vercel-ready)
│   ├── data/*.json           # ← fuente de datos
│   ├── lib/data.ts           # ← acceso a datos
│   ├── components/           # Hero, ProductGrid, Subscription, FAQ, TrustBadges
│   └── vercel.json
├── backend-integrations/     # FastAPI sin DB (JSON)
│   ├── app/main.py
│   ├── data/products.json
│   └── Dockerfile
└── docker-compose.yml        # backend + storefront (sin DB)
```

## Tech Stack

- Shopify + Liquid + Dawn
- Next.js 14 + TypeScript + Tailwind CSS + Framer Motion
- Python 3.11 + FastAPI
- Docker Compose (sin DB)
- Vercel (serverless)
