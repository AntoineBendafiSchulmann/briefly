'use client';

import '@/app/globals.css';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/navbar';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <SessionProvider>
          <Navbar />
          <main className="p-6">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}