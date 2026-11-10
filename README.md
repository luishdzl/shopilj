# Natulim Style Shopify Mini Project

Mini storefront + integration scaffold inspirado en **Natulim** (https://natulim.com/), construido para demostrar:

- **Tema Shopify** basado en **Dawn**, con Liquid, secciones, snippets y animaciones.
- **Storefront** Next.js + Tailwind + Storefront API (listo para Vercel).
- **Backend Python** (FastAPI) para integraciones: webhooks, idempotencia, reintentos, Odoo, operadores logísticos.
- **Docker Compose** para correr todo en local.

## 🚀 Quick Start (local)

```bash
cd /home/luis/natulim-style-shopify
docker compose up
```

## Arquitectura

- `theme/` → Shopify theme (Dawn) personalizado.
- `storefront/` → Next.js + Tailwind (Storefront API headless).
- `backend-integrations/` → FastAPI + Redis (colas) + webhook verification + idempotency.
- `docs/` → Decisiones técnicas y documentación.

## Tech Stack

- Shopify + Liquid + Dawn
- Next.js 14 + TypeScript + Tailwind CSS + Framer Motion
- Python 3.11 + FastAPI + Redis + Docker
- PostgreSQL + Redis (local via Docker)

## Próximos pasos

1. Personalizar Dawn para Natulim (colores, hero animado, suscripción).
2. Construir storefront Next.js con Storefront API.
3. Implementar backend FastAPI con webhooks/idempotencia.
4. Deploy storefront en Vercel; backend en AWS (Lambda/API Gateway).
