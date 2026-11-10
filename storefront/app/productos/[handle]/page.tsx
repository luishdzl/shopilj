import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductByHandle, getProducts } from '@/lib/data';
import { ProductActions } from '@/components/ProductActions';

export function generateStaticParams() {
  return getProducts().map((product) => ({ handle: product.handle }));
}

export function generateMetadata({ params }: { params: { handle: string } }): Metadata {
  const product = getProductByHandle(params.handle);
  if (!product) return { title: 'Producto no encontrado' };
  return {
    title: `${product.title} — Natulim Style`,
    description: product.description,
  };
}

export default function ProductPage({ params }: { params: { handle: string } }) {
  const product = getProductByHandle(params.handle);
  if (!product) notFound();

  const related = getProducts().filter((p) => p.id !== product.id).slice(0, 3);
  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="container py-10 sm:py-14">
      <nav className="mb-8 flex items-center gap-2 text-xs text-[var(--ink-soft)]" aria-label="Migas de pan">
        <Link href="/" className="hover:text-[var(--green)]">Inicio</Link>
        <span aria-hidden="true">/</span>
        <Link href="/#products" className="hover:text-[var(--green)]">Productos</Link>
        <span aria-hidden="true">/</span>
        <span className="text-[var(--ink)]">{product.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[var(--cream-deep)]">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {product.badge && (
              <span className="badge badge-lime absolute left-4 top-4">{product.badge}</span>
            )}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-2xl bg-[var(--cream-deep)]">
                <Image
                  src={product.images[i % product.images.length]}
                  alt={`${product.title} vista ${i + 1}`}
                  fill
                  sizes="15vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-[var(--ink-soft)]">
              ⭐ {product.rating} · {product.reviews.toLocaleString('es-ES')} reseñas
            </span>
          </div>

          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {product.title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">{product.description}</p>

          <div className="mt-5 flex items-end gap-3">
            <span className="font-display text-3xl font-semibold">
              {product.price.toFixed(2).replace('.', ',')} €
            </span>
            {product.compareAtPrice && (
              <>
                <span className="text-sm text-[var(--ink-soft)] line-through">
                  {product.compareAtPrice.toFixed(2).replace('.', ',')} €
                </span>
                <span className="badge badge-dark">-{discount} %</span>
              </>
            )}
          </div>

          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-[var(--ink-soft)]">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--lime)] text-[#3d5a1f]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {feature}
              </li>
            ))}
          </ul>

          <ProductActions variants={product.variants} price={product.price} />

          <div className="mt-8 grid gap-3 rounded-2xl border border-black/[0.07] bg-white p-5 text-sm sm:grid-cols-3">
            {[
              ['🚚', 'Envío gratis desde 25 €'],
              ['↩️', 'Garantía de 30 días'],
              ['🌱', 'Cero plástico de un solo uso'],
            ].map(([icon, text]) => (
              <div key={text} className="flex items-center gap-2 text-[var(--ink-soft)]">
                <span aria-hidden="true">{icon}</span>
                <span className="text-xs">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">También te puede gustar</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {related.map((item) => (
              <Link key={item.id} href={`/productos/${item.handle}`} className="card group overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--cream-deep)]">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-base font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-[var(--green)]">
                    {item.price.toFixed(2).replace('.', ',')} €
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}