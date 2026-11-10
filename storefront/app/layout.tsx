import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Natulim Style — Limpieza eficaz y responsable',
  description: 'Productos de limpieza sin tóxicos, sin plásticos de un solo uso. Suscríbete y ahorra.',
  openGraph: {
    title: 'Natulim Style',
    description: 'Limpieza eficaz y responsable',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}