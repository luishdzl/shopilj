import { motion } from 'framer-motion';

const faqs = [
  {
    id: 'faq-1',
    question: '¿Cómo funciona la suscripción?',
    answer: 'Puedes elegir la frecuencia de entrega y modificarla en cualquier momento. Los pedidos se cargan automáticamente según la frecuencia seleccionada.',
  },
  {
    id: 'faq-2',
    question: '¿Puedo cancelar mi suscripción?',
    answer: 'No hay permanencia. Puedes cancelar tu suscripción en cualquier momento enviándonos un email o desde tu perfil.',
  },
  {
    id: 'faq-3',
    question: '¿Envío gratis?',
    answer: 'Sí, envío gratis a partir de 25€ en tu pedido. Si te suscribes, el envío es gratis en todos los pedidos recurrentes.',
  },
  {
    id: 'faq-4',
    question: '¿Los productos son ecológicos?',
    answer: 'Sí, todos nuestros productos son ecológicos, veganos, sin plástico y con ingredientes naturales.',
  },
];

export function FAQ() {
  return (
    <section className="container py-12 sm:py-20">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-12">Preguntas frecuentes</h2>
      <div className="space-y-6">
        {faqs.map((faq) => (
          <details
            key={faq.id}
            className="bg-white rounded-lg shadow-sm border border-[var(--natulim-green-pale)] p-5 transition-all duration-300"
          >
            <summary className="cursor-pointer flex items-center justify-between w-full text-gray-900 font-medium">
              <span className="flex items-center gap-3">
                <span className="text-xl">{faq.question}</span>
              </span>
              <motion.chevron
                className="w-5 h-5 transition-transform duration-300"
                initial={{ transform: 'rotate(0deg)', opacity: 0 }}
                whileOpen={{ transform: 'rotate(180deg)', opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </summary>
            <div className="mt-3 text-gray-600">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}