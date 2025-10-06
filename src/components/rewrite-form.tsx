'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface RewriteResponse {
  result: string;
}

export default function RewriteForm() {
  const [text, setText] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error('Erreur côté serveur');
      }

      const data: RewriteResponse = await res.json();
      setResult(data.result);
    } catch (error) {
      console.error('Erreur lors de la reformulation :', error);
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Colle ton texte ici..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={handleSubmit}>Reformuler</Button>

      {result && (
        <div className="p-4 bg-muted rounded-md border text-sm whitespace-pre-wrap">
          {result}
        </div>
      )}
    </div>
  );
}
