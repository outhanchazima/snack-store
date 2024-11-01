import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Provider } from 'jotai';
import { Toaster } from '@/components/ui/sonner';
import { Navigation } from '@/components/Navigation';
import { Cart } from '@/components/Cart';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SnackBox - Premium Snacks Delivered',
  description: 'Discover and order premium snacks with fast delivery',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navigation />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Cart />
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}