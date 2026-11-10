'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { getSubscriptions } from '@/lib/data';

export function SubscriptionSection() {
  const subscriptions = getSubscriptions();
  const [selected, setSelected] = useState(subscriptions[0]?.id);

  return (
    <section id="suscribete" className="py-12 sm:py-20 bg-[var(--natulim-gray-50)] border-y border-[var(--natulim-green-pale)]">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Suscríbete y ahorra</h2>
            <p className="text-gray-600 mt-2">Hasta un 20% de descuento + envío gratis desde tu 2º envío.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Elige tu frecuencia</h3>
            <div className="grid grid-cols-2 gap-3">
              {subscriptions.map((sub) => (
                <motion.button
                  key={sub.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelected(sub.id)}
                  className={`rounded-xl border-2 p-4 text-left transition-colors ${
                    selected === sub.id
                      ? 'border-[var(--natulim-green)] bg-[var(--natulim-green-pale)]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="block font-semibold text-gray-900">{sub.title}</span>
                  <span className="block text-xs text-gray-500 mt-1">{sub.description}</span>
                  {sub.discount > 0 && (
                    <span className="inline-block mt-2 badge badge-green">
                      -{Math.round(sub.discount * 100)}%
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tu plan de limpieza</h3>
              <p className="text-gray-600 mb-4">
                Productos sin tóxicos, sin plásticos de un solo uso y con ingredientes buenos para la piel y el planeta.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>✓ Envío gratis en pedidos recurrentes</li>
                <li>✓ Sin permanencia, cancela cuando quieras</li>
                <li>✓ Cambia la frecuencia desde tu perfil</li>
                <li>✓ Garantía de 30 días</li>
              </ul>
            </div>
            <button className="btn-primary w-full">Crear mi plan</button>
          </div>
        </div>
      </div>
    </section>
  );
}