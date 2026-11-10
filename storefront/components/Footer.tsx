import Link from 'next/link';

const columns = [
  {
    title: 'Tienda',
    links: ['Colada', 'Cocina y hogar', 'Cabello y cuerpo', 'Bebés', 'Recargas', 'Packs'],
  },
  {
    title: 'Ayuda',
    links: ['Mi cuenta', 'Contacto', 'Preguntas frecuentes', 'Envíos y devoluciones', 'Suscripciones'],
  },
  {
    title: 'Nosotros',
    links: ['Sobre nosotros', 'Ingredientes', 'Opiniones', 'Blog', 'Trabaja con nosotros'],
  },
];

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-white">
      <div className="container py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(3,0.7fr)_1.2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-[var(--lime)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 21c5-2.5 8-6.5 8-11V5l-8-2-8 2v5c0 4.5 3 8.5 8 11Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M8.5 12.5c2.2-.2 4.2-1.7 5.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
              <span className="font-display text-xl font-semibold">Natulim<span className="text-[var(--lime)]">.</span></span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Limpieza eficaz y responsable. Productos sin residuos, prácticos y con ingredientes
              buenos para la piel y el planeta.
            </p>
            <div className="mt-5 flex gap-2">
              {['Instagram', 'TikTok', 'Facebook'].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
                >
                  <span className="text-[10px] font-bold">{social.slice(0, 2)}</span>
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-white/75 transition-colors hover:text-white">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Newsletter</p>
            <p className="mt-4 text-sm text-white/70">
              Consejos de limpieza, novedades y un 10 % en tu primer pedido.
            </p>
            <form className="mt-4 flex overflow-hidden rounded-full border border-white/15 bg-white/5 p-1">
              <input
                type="email"
                required
                placeholder="tu@email.com"
                aria-label="Correo electrónico"
                className="w-full bg-transparent px-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button type="submit" className="btn-primary shrink-0 px-4 py-2 text-xs">
                Suscribirme
              </button>
            </form>
            <p className="mt-3 text-[11px] text-white/40">
              Al suscribirte aceptas nuestra política de privacidad.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Natulim Style. Proyecto demo inspirado en natulim.com.</p>
          <div className="flex flex-wrap gap-2">
            {['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay', 'Bizum'].map((payment) => (
              <span key={payment} className="rounded border border-white/15 px-2 py-1 text-[10px] text-white/60">
                {payment}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}