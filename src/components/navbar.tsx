'use client';

import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/dashboard', label: 'Dashboard' },
  ];

  const isDashboardActive = pathname?.startsWith('/dashboard');

  return (
    <header className="fixed top-0 left-0 right-0 z-20 border-b px-6 py-4 bg-background">
      <div className="flex items-center justify-between">
        {/* Logo and Desktop Navigation */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center text-lg font-semibold">
            <Image
              src="/logo/logo.png"
              alt="Briefly Logo"
              width={32}
              height={22}
              className="object-contain"
            />
            <span className="ml-1">Briefly</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium ${
                link.href === '/dashboard' && isDashboardActive
                  ? 'underline text-primary'
                  : pathname === link.href
                  ? 'underline text-primary'
                  : 'hover:text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Theme Toggle and Session */}
        <div className="hidden md:flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-black" aria-hidden="true" />
              ) : (
                <Moon className="h-5 w-5 text-black" aria-hidden="true" />
              )}
            </button>
          )}
          {session ? (
            <>
              <span className="text-sm text-muted-foreground">
                Connecté en tant que {session.user?.name}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="text-sm font-medium hover:underline"
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <Link href="/login" className="text-sm font-medium hover:underline">
              Connexion
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 transition ml-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Ouvrir le menu</span>
          <div className="flex flex-col gap-1">
            <span className="block w-6 h-0.5 bg-black dark:bg-white"></span>
            <span className="block w-6 h-0.5 bg-black dark:bg-white"></span>
            <span className="block w-6 h-0.5 bg-black dark:bg-white"></span>
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden mt-4 bg-gray-100 dark:bg-gray-800 rounded shadow-lg p-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block text-sm font-medium ${
                link.href === '/dashboard' && isDashboardActive
                  ? 'underline text-primary'
                  : pathname === link.href
                  ? 'underline text-primary'
                  : 'hover:text-muted-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)} // Close menu on link click
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-white" aria-hidden="true" />
                ) : (
                  <Moon className="h-5 w-5 text-black" aria-hidden="true" />
                )}
              </button>
            )}
            {session ? (
              <>
                <span className="block text-sm text-muted-foreground mt-2">
                  Connecté en tant que {session.user?.name}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="block text-sm font-medium hover:underline mt-2"
                >
                  Se déconnecter
                </button>
              </>
            ) : (
              <Link href="/login" className="block text-sm font-medium hover:underline mt-2">
                Connexion
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}