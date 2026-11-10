'use client';

import { useState } from 'react';
import Link from 'next/link';

const links = [
  { label: 'Colada', href: '#categorias' },
  { label: 'Hogar', href: '#categorias' },
  { label: 'Cabello y cuerpo', href: '#categorias' },
  { label: 'Packs', href: '#products' },
  { label: 'Opiniones', href: '#opiniones' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[var(--cream)]/85 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Natulim Style, inicio">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--green)] text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 21c5-2.5 8-6.5 8-11V5l-8-2-8 2v5c0 4.5 3 8.5 8 11Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path d="M8.5 12.5c2.2-.2 4.2-1.7 5.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">Natulim<span className="text-[var(--green)]">.</span></span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[var(--ink-soft)] transition-colors hover:text-[var(--green)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button className="grid h-10 w-10 place-items-center rounded-full text-[var(--ink)] transition-colors hover:bg-black/5" aria-label="Buscar">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" />
              <path d="m16.5 16.5 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
          <button className="hidden h-10 w-10 place-items-center rounded-full text-[var(--ink)] transition-colors hover:bg-black/5 sm:grid" aria-label="Cuenta">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.7" />
              <path d="M5.5 20c.7-3.6 3.3-5.5 6.5-5.5s5.8 1.9 6.5 5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
          <button className="relative grid h-10 w-10 place-items-center rounded-full text-[var(--ink)] transition-colors hover:bg-black/5" aria-label="Carrito">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 8h12l-1 12H7L6 8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
              <path d="M9 8V6.5a3 3 0 0 1 6 0V8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-[var(--green)] text-[10px] font-bold text-white">2</span>
          </button>
          <button
            className="grid h-10 w-10 place-items-center rounded-full text-[var(--ink)] transition-colors hover:bg-black/5 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/[0.06] bg-[var(--cream)] lg:hidden">
          <nav className="container flex flex-col py-3" aria-label="Menú móvil">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-sm font-medium text-[var(--ink-soft)] hover:bg-black/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}