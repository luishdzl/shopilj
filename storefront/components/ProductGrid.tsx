'use client';

import { motion } from 'framer-motion';
import { getFeaturedProducts } from '@/lib/data';

export function ProductGrid() {
  const products = getFeaturedProducts(6);

  return (
    <section id="products" className="container py-12 sm:py-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Los preferidos de los Natulovers</h2>
        <span className="text-sm text-gray-500">Selecciona una suscripción</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <motion.div
            key={p.id}
            className="group cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}
          >
            <div className="relative aspect-square bg-[var(--natulim-green-pale)] flex items-center justify-center">
              {p.badge && (
                <span className="absolute top-3 left-3 badge badge-green z-10">{p.badge}</span>
              )}
              <div className="text-6xl">🧺</div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                <span>⭐ {p.rating}</span>
                <span>({p.reviews.toLocaleString()} reseñas)</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{p.title}</h3>
              <ul className="text-sm text-gray-600 mb-3 space-y-1">
                {p.features.slice(0, 2).map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl font-bold text-[var(--natulim-green)]">
                  {p.price.toFixed(2)}{p.currency === 'EUR' ? '€' : ` ${p.currency}`}
                </span>
                {p.compareAtPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {p.compareAtPrice.toFixed(2)}€
                  </span>
                )}
              </div>
              <button className="btn-primary w-full text-base">
                Añadir al carrito
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}