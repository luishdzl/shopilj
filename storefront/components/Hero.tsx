'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[var(--lime)]/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[var(--green)]/10 blur-3xl" />

      <div className="container relative grid items-center gap-12 py-12 lg:grid-cols-[1.05fr_1fr] lg:py-20">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-[var(--ink-soft)]"
          >
            <span className="flex -space-x-1.5" aria-hidden="true">
              <span className="h-5 w-5 rounded-full bg-[var(--green)] ring-2 ring-white" />
              <span className="h-5 w-5 rounded-full bg-[var(--lime)] ring-2 ring-white" />
              <span className="h-5 w-5 rounded-full bg-[var(--sand)] ring-2 ring-white" />
            </span>
            <span className="font-semibold text-[var(--ink)]">+250.000</span> eco-hogares ya lo usan
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="text-balance text-[2.6rem] font-semibold leading-[1.03] tracking-tight sm:text-6xl"
          >
            La colada más sencilla{' '}
            <span className="relative inline-block text-[var(--green)]">
              y sostenible
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 240 10" fill="none" aria-hidden="true">
                <path d="M2 8c40-6 90-6 130-2 40 4 76 2 106-3" stroke="var(--lime)" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
            className="mt-6 max-w-lg text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg"
          >
            Tiras biodegradables que se disuelven en la lavadora. Sin plásticos de un solo uso y con
            ingredientes buenos para tu piel y para el planeta.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link href="#products" className="btn-primary">
              Comprar ahora
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="#suscribete" className="btn-secondary">
              Crear mi plan y ahorrar
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-black/10 pt-6"
          >
            {[
              ['4,8/5', '34.950 reseñas'],
              ['0 %', 'plástico de un solo uso'],
              ['30 días', 'garantía de devolución'],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-xl font-semibold">{value}</dt>
                <dd className="mt-0.5 text-[11px] leading-snug text-[var(--ink-soft)]">{label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="relative mx-auto w-full max-w-lg"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-[var(--cream-deep)] shadow-[0_30px_80px_-30px_rgba(23,37,28,0.45)]">
            <Image
              src="/images/hero.jpg"
              alt="Tiras de detergente biodegradables junto a toallas blancas dobladas"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 520px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-white/90 px-4 py-3 backdrop-blur">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--green)]">Producto estrella</p>
                <p className="font-display text-lg font-semibold">Eco-Tiras · 40 lavados</p>
              </div>
              <span className="badge badge-lime">Desde 9,95 €</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="absolute -left-3 top-8 hidden rounded-2xl border border-black/[0.06] bg-white/95 px-4 py-3 shadow-xl backdrop-blur sm:block"
          >
            <div className="flex items-center gap-1 text-[var(--green)]" aria-hidden="true">
              {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
            </div>
            <p className="mt-1 text-xs font-medium text-[var(--ink-soft)]">“Funciona de verdad.”</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62, ease }}
            className="absolute -right-2 bottom-24 hidden rounded-2xl border border-black/[0.06] bg-[var(--lime)] px-4 py-3 shadow-xl sm:block"
          >
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#3d5a1f]">Vegano</p>
            <p className="text-xs text-[#3d5a1f]/80">& cruelty free</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}