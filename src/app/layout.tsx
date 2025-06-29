import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Roboto_Mono } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { AuthProvider } from '@/contexts/AuthContext';
import { LocaleProvider } from '@/contexts/LocaleContext';
import { Toaster } from 'sonner';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-serif',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Exvolum - Premium Collection',
  description: 'Discover our curated selection of premium products that elevate your everyday experience with exceptional quality and design.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} ${robotoMono.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <AuthProvider>
              <LocaleProvider>
                <NextIntlClientProvider messages={messages}>
                  {children}
                  <Toaster position="top-right" richColors />
                </NextIntlClientProvider>
              </LocaleProvider>
            </AuthProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
