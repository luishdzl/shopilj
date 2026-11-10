import Image from 'next/image';
import Link from 'next/link';
import { getCollections } from '@/lib/data';

export function CategoryGrid() {
  const collections = getCollections();

  return (
    <section id="categorias" className="section">
      <div className="container">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-2">Explora</p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Una casa libre de tóxicos
            </h2>
          </div>
          <Link href="#products" className="btn-ghost">
            Ver todos los productos
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              href="#products"
              className={`group relative overflow-hidden rounded-[1.75rem] bg-[var(--cream-deep)] ${
                index === 0 ? 'col-span-2 row-span-2 aspect-[4/3] lg:aspect-auto lg:min-h-[420px]' : 'aspect-[4/3]'
              }`}
            >
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                sizes={index === 0 ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 1024px) 50vw, 25vw'}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
                <div>
                  <h3 className={`font-display font-semibold ${index === 0 ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>
                    {collection.title}
                  </h3>
                  <p className={`mt-1 text-white/80 ${index === 0 ? 'text-sm' : 'text-xs'}`}>
                    {collection.productCount} productos
                  </p>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/20 backdrop-blur transition-colors group-hover:bg-white group-hover:text-[var(--ink)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}