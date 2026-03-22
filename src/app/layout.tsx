import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LanguageProvider } from '@/context/language-context';
import { CartProvider } from '@/context/cart-context';
import { AuthProvider } from '@/components/providers/auth-provider';
import { AutoLogoutProvider } from '@/components/providers/auto-logout-provider';
import { WhatsAppWidget } from '@/components/ui/whatsapp-widget';
import { DM_Sans, Syne } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: true,
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'Scootix',
  description: 'Mantenimiento, reparación y repuestos originales para scooters eléctricos. Energía que te mueve.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://lh3.googleusercontent.com" />
        <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
      </head>
      <body className={cn(dmSans.variable, syne.variable, "font-body antialiased h-full flex flex-col")}>
        <AuthProvider>
          <AutoLogoutProvider>
            <LanguageProvider>
              <CartProvider>
                <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              <WhatsAppWidget />
              <Toaster />
            </CartProvider>
          </LanguageProvider>
          </AutoLogoutProvider>
        </AuthProvider>
      </body>
    </html>
  );
}