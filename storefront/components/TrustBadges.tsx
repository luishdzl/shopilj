const items = [
  { title: 'Más eficaces', subtitle: 'que los de siempre', icon: 'M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5' },
  { title: 'Sin tóxicos', subtitle: 'para ti y los tuyos', icon: 'M12 3 4 7v5c0 5 3.5 8 8 9 4.5-1 8-4 8-9V7l-8-4Z' },
  { title: 'Cero plástico', subtitle: 'de un solo uso', icon: 'M6 7h12l-1.5 13h-9L6 7Zm3 0V5a3 3 0 0 1 6 0v2' },
  { title: 'Vegano', subtitle: 'y cruelty free', icon: 'M12 21c5-3 8-7 8-11a4 4 0 0 0-8-1 4 4 0 0 0-8 1c0 4 3 8 8 11Z' },
  { title: 'Garantía 30 días', subtitle: 'devolución sencilla', icon: 'M4 12a8 8 0 1 0 2.5-5.8M4 4v4h4' },
  { title: 'Envío gratis', subtitle: 'desde 25 €', icon: 'M3 7h11v10H3V7Zm11 4h4l3 3v3h-7v-6ZM7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z' },
];

export function TrustBadges() {
  return (
    <section aria-label="Ventajas" className="border-y border-black/[0.06] bg-white/60">
      <div className="container grid grid-cols-2 gap-x-4 gap-y-6 py-8 sm:grid-cols-3 lg:grid-cols-6">
        {items.map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--green-pale)] text-[var(--green)]">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d={item.icon} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight">{item.title}</p>
              <p className="mt-0.5 text-xs text-[var(--ink-soft)]">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}