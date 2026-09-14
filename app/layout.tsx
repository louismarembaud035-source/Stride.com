import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Stride — Studio d’entraînement & Nutrition',
  description: 'Application de fitness et nutrition moderne',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={outfit.className}>
      <body className="bg-core text-primary min-h-screen flex justify-center p-3 pb-24">
        <div className="app-wrapper w-full max-w-[520px] flex flex-col gap-5 relative">
          <Header />
          <main className="app-main flex flex-col gap-5">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
