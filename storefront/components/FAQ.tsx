'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getFAQs } from '@/lib/data';

export function FAQ() {
  const faqs = getFAQs();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id="faq" className="section bg-[var(--cream-deep)]">
      <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow mb-2">Dudas frecuentes</p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Todo lo que necesitas saber
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">
            ¿No encuentras tu respuesta? Escríbenos a{' '}
            <a href="mailto:hola@natulim.style" className="font-semibold text-[var(--green)] underline-offset-4 hover:underline">
              hola@natulim.style
            </a>
            {' '}y te respondemos en menos de 24 h.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
                <button
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold sm:text-base"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                >
                  {faq.question}
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--green-pale)] text-[var(--green)]"
                    aria-hidden="true"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-[var(--ink-soft)]">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}