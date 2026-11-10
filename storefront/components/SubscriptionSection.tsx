'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { getSubscriptions } from '@/lib/data';

const benefits = [
  'Hasta un 20 % de descuento en cada pedido',
  'Envío gratis desde el segundo envío',
  'Sin permanencia: cambia o cancela cuando quieras',
  'Recordatorios antes de cada entrega',
];

export function SubscriptionSection() {
  const subscriptions = getSubscriptions();
  const [selected, setSelected] = useState(subscriptions[0]?.id ?? '');
  const current = subscriptions.find((s) => s.id === selected);
  const discount = current?.discount ?? 0;
  const base = 12.5;
  const price = (base * (1 - discount)).toFixed(2).replace('.', ',');

  return (
    <section id="suscribete" className="section">
      <div className="container grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <p className="eyebrow mb-2">Suscripción</p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Crea tu plan de limpieza en 30 segundos
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--ink-soft)]">
            Elige la frecuencia que mejor encaje contigo. Nosotros nos encargamos de que nunca te
            falten tus productos favoritos.
          </p>
          <ul className="mt-6 space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--lime)] text-[#3d5a1f]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="card overflow-hidden">
          <div className="border-b border-black/[0.06] bg-[var(--green)] px-6 py-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Tu plan</p>
            <p className="mt-1 font-display text-2xl font-semibold">Eco-Tiras de Detergente</p>
            <p className="mt-1 text-sm text-white/80">40 lavados · sin fragancia</p>
          </div>

          <div className="p-6">
            <p className="mb-3 text-sm font-semibold">Frecuencia de entrega</p>
            <div className="grid grid-cols-2 gap-2.5">
              {subscriptions.map((sub) => (
                <motion.button
                  key={sub.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelected(sub.id)}
                  aria-pressed={selected === sub.id}
                  className={`rounded-xl border-2 p-3.5 text-left transition-colors ${
                    selected === sub.id
                      ? 'border-[var(--green)] bg-[var(--green-pale)]'
                      : 'border-black/10 hover:border-black/25'
                  }`}
                >
                  <span className="block text-sm font-semibold">{sub.title}</span>
                  <span className="mt-0.5 block text-[11px] text-[var(--ink-soft)]">
                    {sub.discount > 0 ? `-${Math.round(sub.discount * 100)} % de descuento` : 'Sin suscripción'}
                  </span>
                </motion.button>
              ))}
            </div>

            <div className="mt-6 flex items-end justify-between border-t border-black/[0.06] pt-5">
              <div>
                <p className="text-xs text-[var(--ink-soft)]">Total estimado</p>
                <p className="font-display text-3xl font-semibold">
                  {price} € <span className="text-sm font-normal text-[var(--ink-soft)]">/ envío</span>
                </p>
              </div>
              <span className="badge badge-green">Ahorras {(base - Number(price.replace(',', '.'))).toFixed(2).replace('.', ',')} €</span>
            </div>

            <button className="btn-primary mt-5 w-full">Crear mi plan</button>
            <p className="mt-3 text-center text-[11px] text-[var(--ink-soft)]">
              Pago seguro · Sin permanencia · Cancela en un clic
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}