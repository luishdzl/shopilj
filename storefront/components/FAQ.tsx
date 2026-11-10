'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getFAQs } from '@/lib/data';

export function FAQ() {
  const faqs = getFAQs();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section className="container py-12 sm:py-20">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-12">Preguntas frecuentes</h2>
      <div className="space-y-4">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white rounded-lg shadow-sm border border-[var(--natulim-green-pale)] overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-left text-gray-900 font-medium"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-[var(--natulim-green)]"
                >
                  ▾
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
                    <p className="px-5 pb-5 text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}