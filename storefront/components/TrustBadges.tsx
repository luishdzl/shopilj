import { motion } from 'framer-motion';

const badges = [
  { icon: '♻️', title: 'Cero plástico de un solo uso', description: 'Tiras biodegradables' },
  { icon: '🌿', title: 'Vegano & cruelty free', description: 'Ingredientes buenos' },
  { icon: '✅', title: 'Garantía 30 días', description: 'Devolución sin preguntas' },
  { icon: '🚚', title: 'Envío gratis', description: 'A partir de 25€' },
  { icon: '💰', title: 'Ahorra hasta 20%', description: 'Suscríbete' },
  { icon: '🧪', title: 'EcoCert', description: 'Certificación ecológica' },
];

export function TrustBadges() {
  const marqueeItems = [...badges, ...badges];

  return (
    <section className="py-12 bg-[var(--natulim-gray-50)] border-y border-[var(--natulim-green-pale)]">
      <div className="container">
        <div className="marquee overflow-hidden">
          <div className="flex gap-12 pr-12">
            {marqueeItems.map((badge, i) => (
              <div key={i} className="flex items-center gap-3 whitespace-nowrap">
                <span className="text-3xl">{badge.icon}</span>
                <div>
                  <p className="font-semibold text-sm">{badge.title}</p>
                  <p className="text-xs text-gray-500">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}