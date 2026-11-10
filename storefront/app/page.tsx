import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { SubscriptionSection } from '@/components/SubscriptionSection';
import { TrustBadges } from '@/components/TrustBadges';
import { FAQ } from '@/components/FAQ';

export default async function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBadges />
      <ProductGrid />
      <SubscriptionSection />
      <FAQ />
    </main>
  );
}
