<div align="center">

# 🛍️ Shopilj — Natulim-style Storefront

**Limpieza eficaz y responsable · Next.js + JSON · demo desplegada en Vercel**

[![Abrir demo en vivo](https://img.shields.io/badge/▶_ABRIR_DEMO_EN_VIVO-storefront--dun--xi.vercel.app-2d6a4f?style=for-the-badge&logo=vercel&logoColor=white)](https://storefront-dun-xi.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://storefront-dun-xi.vercel.app/)

[![Vista previa del storefront](storefront/public/images/hero.jpg)](https://storefront-dun-xi.vercel.app/)

### 👉 [**Probar la tienda en vivo → storefront-dun-xi.vercel.app**](https://storefront-dun-xi.vercel.app/)

</div>

---

## 🌐 Demo en vivo

| | |
|---|---|
| 🚀 **URL** | **https://storefront-dun-xi.vercel.app/** |
| 🏠 Home | https://storefront-dun-xi.vercel.app/ |
| 🧴 Producto de ejemplo | https://storefront-dun-xi.vercel.app/productos/eco-tiras-40 |
| ⚡ Hosting | Vercel (serverless, sin base de datos) |

> `main` es la versión **sin base de datos**: todo el catálogo y el estado se
> consumen desde archivos **JSON**. Diseñada para desplegar el storefront en
> **Vercel** sin PostgreSQL, Redis ni SQLite.
>
> La versión con base de datos vive en la rama **`bbdd`**.

## 🚀 Qué cambia respecto a `bbdd`

| Componente | `bbdd` (con DB) | `main` (JSON) |
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

> ✅ Despliegue actual: **https://storefront-dun-xi.vercel.app/**

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

---

<div align="center">

### ¿Lo probamos?

## 👉 [**storefront-dun-xi.vercel.app**](https://storefront-dun-xi.vercel.app/)

[![Abrir demo](https://img.shields.io/badge/▶_Abrir_la_tienda-2d6a4f?style=for-the-badge&logo=vercel&logoColor=white)](https://storefront-dun-xi.vercel.app/)

Hecho con 🌱 inspirado en [natulim.com](https://natulim.com)

</div>
