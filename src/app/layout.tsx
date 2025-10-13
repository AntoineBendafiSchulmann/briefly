'use client';

import '@/app/globals.css';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/navbar';
import { useEffect, useState } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        {mounted && (
          <ThemeProvider attribute="class" defaultTheme="system">
            <SessionProvider>
              <Navbar />
              <main className="p-6">{children}</main>
            </SessionProvider>
          </ThemeProvider>
        )}
      </body>
    </html>
  );
}