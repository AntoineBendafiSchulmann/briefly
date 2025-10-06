'use client';

import { useEffect, useState } from 'react';
import { getProviders, signIn, LiteralUnion, ClientSafeProvider } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function LoginClient() {
  const [providers, setProviders] = useState<Record<LiteralUnion<string, string>, ClientSafeProvider> | null>(null);

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold">Connexion à Briefly</h1>
        <p className="text-muted-foreground">Choisissez une méthode pour vous connecter :</p>

        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <Button onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
                Se connecter avec {provider.name}
              </Button>
            </div>
          ))}
      </div>
    </main>
  );
}