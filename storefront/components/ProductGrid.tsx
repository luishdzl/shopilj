import { motion } from 'framer-motion';

export function ProductGrid() {
  // Mock data — en producción vendría de la API Storefront
  const products = [
    {
      id: 'prod-001',
      title: 'Tiras Detergente Eco 40 Lavados',
      handle: 'eco-tiras-40',
      price: 9.99,
      currency: 'USD',
      images: [
        'https://via.placeholder.com/400x200/2d6a4f/ffffff?text=Product+1',
        'https://via.placeholder.com/400x200/2d6a4f/ffffff?text=Product+2',
        'https://via.placeholder.com/400x200/2d6a4f/ffffff?text=Product+3',
      ],
      variants: [
        { id: 'var-001', name: 'Blanco', price: 9.99 },
        { id: 'var-002', name: 'Azul', price: 9.99 },
      ],
    },
    {
      id: 'prod-002',
      title: 'Tiras Detergente Eco 60 Lavados',
      handle: 'eco-tiras-60',
      price: 14.99,
      currency: 'USD',
      images: [
        'https://via.placeholder.com/400x200/2d6a4f/ffffff?text=Product+4',
        'https://via.placeholder.com/400x200/2d6a4f/ffffff?text=Product+5',
        'https://via.placeholder.com/400x200/2d6a4f/ffffff?text=Product+6',
      ],
      variants: [
        { id: 'var-003', name: 'Blanco', price: 14.99 },
        { id: 'var-004', name: 'Azul', price: 14.99 },
      ],
    },
    {
      id: 'prod-003',
      title: 'Tiras Detergente Eco 30 Lavados',
      handle: 'eco-tiras-30',
      price: 7.99,
      currency: 'USD',
      images: [
        'https://via.placeholder.com/400x200/2d6a4f/ffffff?text=Product+7',
        'https://via.placeholder.com/400x200/2d6a4f/ffffff?text=Product+8',
        'https://via.placeholder.com/400x200/2d6a4f/ffffff?text=Product+9',
      ],
      variants: [
        { id: 'var-005', name: 'Blanco', price: 7.99 },
        { id: 'var-006', name: 'Azul', price: 7.99 },
      ],
    },
  ];

  return (
    <section className="container py-12 sm:py-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Productos</h2>
        <span className="text-sm text-gray-500">Selecciona una suscripción</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <motion.div
            key={p.id}
            className="group cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
            whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}
          >
            <div className="aspect-square rounded-2xl overflow-hidden">
              {p.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ))}
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{p.title}</h3>
              <p className="text-gray-600 mb-3">{p.price} {p.currency}</p>
              <button
                className="btn-primary text-base"
                onClick={() => alert(`Producto ${p.id} seleccionado!`)}
              >
                Añadir al carrito
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
