'use client';

import { useState } from 'react';
import RewriteForm from '@/components/ui/rewrite-form';

export default function TestPage() {
  const [context, setContext] = useState('mail');

  const handleContextChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setContext(e.target.value);
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Tester la reformulation</h1>
      <div className="mb-4">
        <label htmlFor="context" className="block text-sm font-medium mb-2">
          Choisissez le contexte de reformulation :
        </label>
        <select
          id="context"
          value={context}
          onChange={handleContextChange}
          className="border p-2 w-full"
        >
          <option value="mail">Mail professionnel</option>
          <option value="neutre">Ton neutre</option>
          <option value="humain">Ton humain</option>
        </select>
      </div>
      <RewriteForm context={context} />
    </main>
  );
}