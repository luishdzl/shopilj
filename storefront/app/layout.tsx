import { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = localFont({
  src: './fonts/inter-latin.woff2',
  variable: '--font-sans',
  display: 'swap',
  weight: '100 900',
});

const fraunces = localFont({
  src: './fonts/fraunces-latin.woff2',
  variable: '--font-display',
  display: 'swap',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Natulim Style — Limpieza eficaz y responsable',
  description:
    'Tiras biodegradables que se disuelven en la lavadora. Sin plásticos de un solo uso, con ingredientes buenos para la piel y el planeta.',
  openGraph: {
    title: 'Natulim Style',
    description: 'Limpieza eficaz y responsable, sin plásticos de un solo uso.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased bg-[var(--cream)] text-[var(--ink)]">
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}