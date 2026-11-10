const reviews = [
  {
    name: 'María G.',
    location: 'Madrid',
    product: 'Eco-Tiras de Detergente',
    quote:
      'Llevo seis meses usándolas y la ropa sale igual de limpia. Me encanta no tener que cargar con botellas de plástico.',
    initials: 'MG',
    color: 'bg-[var(--green)]',
  },
  {
    name: 'Carlos R.',
    location: 'Valencia',
    product: 'Eco Pastillas Lavavajillas',
    quote:
      'El cambio fue inmediato: menos espacio en el armario, menos residuos y el lavavajillas funciona perfecto.',
    initials: 'CR',
    color: 'bg-[#b08968]',
  },
  {
    name: 'Lucía P.',
    location: 'Sevilla',
    product: 'Pack Esenciales del Hogar',
    quote:
      'La suscripción es súper flexible. Cambié la frecuencia dos veces y nunca he tenido un problema.',
    initials: 'LP',
    color: 'bg-[#4a6fa5]',
  },
];

export function Testimonials() {
  return (
    <section id="opiniones" className="section bg-[var(--cream-deep)]">
      <div className="container">
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow mb-2">Opiniones verificadas</p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            4,8 de 5 en más de 34.950 reseñas
          </h2>
          <p className="mt-3 text-sm text-[var(--ink-soft)]">
            Familias reales que han cambiado su rutina de limpieza por una más consciente.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <figure key={review.name} className="card flex h-full flex-col p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex text-[var(--green)]" aria-label="5 de 5 estrellas">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i} aria-hidden="true">{star}</span>
                  ))}
                </div>
                <span className="badge badge-green">Verificada</span>
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-black/[0.06] pt-4">
                <span className={`grid h-10 w-10 place-items-center rounded-full text-xs font-bold text-white ${review.color}`}>
                  {review.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold">{review.name}</p>
                  <p className="text-xs text-[var(--ink-soft)]">{review.location} · {review.product}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}