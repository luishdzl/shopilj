import { motion } from 'framer-motion';

export function SubscriptionSection() {
  return (
    <section className="py-12 sm:py-20 bg-[var(--natulim-gray-50)] border-y border-[var(--natulim-green-pale)]">
      <div className="container">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Suscripciones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Plan Básico</h3>
            <p className="text-gray-600 mb-4">Acceso a 50 productos + envío gratis</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold text-[var(--natulim-green)]">$9.99/mes</span>
              <button className="btn-secondary">Suscríbete</button>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Plan Premium</h3>
            <p className="text-gray-600 mb-4">Acceso a 200 productos + envío gratis + soporte prioritario</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold text-[var(--natulim-green)]">$24.99/mes</span>
              <button className="btn-primary">Suscríbete</button>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Plan Familiar</h3>
            <p className="text-gray-600 mb-4">Hasta 4 usuarios + envío gratis</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold text-[var(--natulim-green)]">$19.99/mes</span>
              <button className="btn-secondary">Suscríbete</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
