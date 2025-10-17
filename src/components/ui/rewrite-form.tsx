'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';

interface RewriteFormProps {
  context: string;
}

export default function RewriteForm({ context }: RewriteFormProps) {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, context }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.reformulatedText);
      }
    } catch (err) {
      console.error('Erreur lors de la reformulation :', err);
      setError('Une erreur est survenue lors de la reformulation.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <p className="text-sm text-gray-600 text-center">Contexte sélectionné : {context}</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Entrez votre texte ici..."
        className="w-full p-4 border rounded resize-none"
      />
      <div className="flex justify-center">
        <button
          type="submit"
          className={`px-6 py-2 rounded ${
            theme === 'dark'
              ? 'bg-black text-white border border-white'
              : 'bg-white text-black border border-black'
          }`}
        >
          Reformuler
        </button>
      </div>
      {result && (
        <div className="p-4 bg-green-100 text-green-800 rounded">
          <h3 className="font-bold">Résultat :</h3>
          <p>{result}</p>
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-100 text-red-800 rounded">
          <p>{error}</p>
        </div>
      )}
    </form>
  );
}