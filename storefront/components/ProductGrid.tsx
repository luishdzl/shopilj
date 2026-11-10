'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getProducts } from '@/lib/data';

const filters = ['Todos', 'Colada', 'Hogar', 'Cabello', 'Packs'];

export function ProductGrid() {
  const products = getProducts();
  const [filter, setFilter] = useState('Todos');
  const [added, setAdded] = useState<string | null>(null);

  const visible = useMemo(() => {
    if (filter === 'Todos') return products;
    if (filter === 'Colada') return products.filter((p) => /detergente|perlas/i.test(p.title));
    if (filter === 'Hogar') return products.filter((p) => /lavavajillas|friega|pack/i.test(p.title));
    if (filter === 'Cabello') return products.filter((p) => /champ/i.test(p.title));
    if (filter === 'Packs') return products.filter((p) => /pack/i.test(p.title));
    return products;
  }, [filter, products]);

  function addToCart(id: string) {
    setAdded(id);
    window.setTimeout(() => setAdded((current) => (current === id ? null : current)), 1600);
  }

  return (
    <section id="products" className="section">
      <div className="container">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-2">Los preferidos</p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Más vendidos de los Natulovers
            </h2>
            <p className="mt-3 max-w-lg text-sm text-[var(--ink-soft)]">
              Eficacia real, cero plástico y una suscripción flexible que se adapta a tu hogar.
            </p>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar productos">
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`chip ${filter === f ? 'chip-active' : ''}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <motion.article
              key={product.id}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="card group flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-[0_24px_50px_-24px_rgba(23,37,28,0.35)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--cream-deep)]">
                <Link href={`/productos/${product.handle}`} aria-label={`Ver ${product.title}`}>
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </Link>
                <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                  {product.badge && <span className="badge badge-lime shadow-sm">{product.badge}</span>}
                  {product.compareAtPrice && (
                    <span className="badge badge-dark shadow-sm">
                      -{Math.round((1 - product.price / product.compareAtPrice) * 100)} %
                    </span>
                  )}
                </div>
                <button
                  className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[var(--ink)] shadow-sm backdrop-blur transition-colors hover:bg-white"
                  aria-label={`Guardar ${product.title}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center gap-1.5 text-xs text-[var(--ink-soft)]">
                  <span className="text-[var(--green)]" aria-hidden="true">★★★★★</span>
                  <span className="font-semibold text-[var(--ink)]">{product.rating}</span>
                  <span>({product.reviews.toLocaleString('es-ES')})</span>
                </div>

                <h3 className="font-display text-lg font-semibold leading-snug">
                  <Link href={`/productos/${product.handle}`} className="hover:text-[var(--green)]">
                    {product.title}
                  </Link>
                </h3>

                <ul className="mt-2 space-y-1 text-sm text-[var(--ink-soft)]">
                  {product.features.slice(0, 2).map((feature) => (
                    <li key={feature} className="flex items-start gap-1.5">
                      <svg className="mt-1 shrink-0 text-[var(--green)]" width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {product.variants.slice(0, 3).map((variant) => (
                    <span key={variant.id} className="rounded-full border border-black/10 px-2.5 py-1 text-[11px] text-[var(--ink-soft)]">
                      {variant.title}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                  <div>
                    <p className="font-display text-xl font-semibold">
                      {product.price.toFixed(2).replace('.', ',')} €
                    </p>
                    {product.compareAtPrice && (
                      <p className="text-xs text-[var(--ink-soft)] line-through">
                        {product.compareAtPrice.toFixed(2).replace('.', ',')} €
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(product.id)}
                    className={`btn-primary h-11 w-11 rounded-full p-0 transition-colors ${
                      added === product.id ? 'bg-[var(--ink)]' : ''
                    }`}
                    aria-label={`Añadir ${product.title} al carrito`}
                  >
                    {added === product.id ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}