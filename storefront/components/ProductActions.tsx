'use client';

import { useState } from 'react';

interface Variant {
  id: string;
  title: string;
  price: number;
  available: boolean;
}

export function ProductActions({ variants, price }: { variants: Variant[]; price: number }) {
  const [selected, setSelected] = useState(variants[0]?.id ?? '');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const current = variants.find((v) => v.id === selected);

  function add() {
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="mt-6">
      <p className="mb-2 text-sm font-semibold">Variante</p>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => setSelected(variant.id)}
            aria-pressed={selected === variant.id}
            disabled={!variant.available}
            className={`chip ${selected === variant.id ? 'chip-active' : ''} ${
              !variant.available ? 'cursor-not-allowed opacity-40 line-through' : ''
            }`}
          >
            {variant.title}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <div className="flex items-center rounded-full border border-black/15 bg-white">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="grid h-10 w-10 place-items-center rounded-full text-lg"
            aria-label="Quitar una unidad"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-semibold" aria-live="polite">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="grid h-10 w-10 place-items-center rounded-full text-lg"
            aria-label="Añadir una unidad"
          >
            +
          </button>
        </div>
        <button onClick={add} className="btn-primary h-10 flex-1">
          {added ? 'Añadido ✓' : `Añadir · ${(price * quantity).toFixed(2).replace('.', ',')} €`}
        </button>
      </div>

      <p className="mt-3 text-xs text-[var(--ink-soft)]">
        {current?.available ? 'En stock · listo para enviar en 24 h' : 'Selecciona una variante disponible'}
      </p>
    </div>
  );
}