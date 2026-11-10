import { Hero } from '@/components/Hero';
import { TrustBadges } from '@/components/TrustBadges';
import { CategoryGrid } from '@/components/CategoryGrid';
import { ProductGrid } from '@/components/ProductGrid';
import { SubscriptionSection } from '@/components/SubscriptionSection';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <CategoryGrid />
      <ProductGrid />
      <SubscriptionSection />
      <Testimonials />
      <FAQ />

      <section className="container pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-[var(--green)] px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[var(--lime)]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <p className="eyebrow justify-center text-white/70">Únete al cambio</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Tu casa y tu ropa, libres de tóxicos
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75">
            Más de 250.000 hogares ya han cambiado su rutina de limpieza. Empieza hoy con envío
            gratis desde 25 €.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="#products" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--green)] transition-transform hover:-translate-y-0.5">
              Comprar productos
            </Link>
            <Link href="#suscribete" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Suscribirme y ahorrar
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}