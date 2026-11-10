import Link from 'next/link';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-[var(--natulim-green-pale)] to-white overflow-hidden">
      <div className="container relative py-16 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="badge badge-green mb-4">+250.000 hogares</span>
            </motion.div>
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--natulim-gray-900)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            >
              La colada más sencilla{' '}
              <span className="text-[var(--natulim-green)]">y sostenible</span>
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl text-gray-600 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
              Tiras biodegradables que se disuelven en la lavadora. Sin plásticos de un solo uso, con ingredientes buenos para la piel y el planeta.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            >
              <Link href="#products" className="btn-primary">
                Ver productos
              </Link>
              <Link href="#suscribete" className="btn-secondary">
                Crea tu plan
              </Link>
            </motion.div>
            <motion.div
              className="flex items-center gap-6 pt-4 text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--natulim-green)]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L3 7v11h14V7l-7-5z" />
                </svg>
                Cero plástico
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--natulim-green)]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L3 7v11h14V7l-7-5z" />
                </svg>
                Vegano y cruelty free
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--natulim-green)]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L3 7v11h14V7l-7-5z" />
                </svg>
                Garantía 30 días
              </span>
            </motion.div>
          </div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-[var(--natulim-green)] to-[var(--natulim-green-light)] shadow-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-white text-center p-8">
                  <div className="text-8xl mb-4">🧺</div>
                  <p className="text-2xl font-semibold">Eco-Tiras</p>
                  <p className="text-lg opacity-80">Detergente 40 lavados</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}