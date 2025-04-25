import './globals.css';
import { ReactNode } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Inter } from 'next/font/google';
import { Source_Code_Pro } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  display: 'swap' // Добавляем для лучшего отображения шрифтов
});

const sourceCodePro = Source_Code_Pro({ 
  subsets: ['latin'], 
  variable: '--font-mono',
  display: 'swap' // Добавляем для лучшего отображения шрифтов
});

export const metadata = {
  title: 'ArtVibe Museum',
  description: 'A contemporary art museum with modern exhibitions.',
};

// Экспортируем viewport отдельно
export const viewport = 'width=device-width, initial-scale=1, maximum-scale=1';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk" className={`${inter.variable} ${sourceCodePro.variable}`} >
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
