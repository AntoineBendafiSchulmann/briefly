'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <header className="border-b px-6 py-4 flex items-center justify-between bg-background">
      <Link href="/" className="text-lg font-semibold">Briefly</Link>
      <nav className="flex items-center gap-4">
        {session ? (
          <>
            <span className="text-sm text-muted-foreground">
              Connecté en tant que {session.user?.name}
            </span>
            <Button
              variant="outline"
              onClick={() => signOut({ callbackUrl: '/login' })}
            >
              Se déconnecter
            </Button>
          </>
        ) : (
          <Button asChild variant="default">
            <Link href="/login">Connexion</Link>
          </Button>
        )}
      </nav>
    </header>
  )
}