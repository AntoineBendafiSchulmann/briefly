'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function ReformulationPage() {
  const [context, setContext] = useState('professionnel');
  const [text, setText] = useState('');
  const [model, setModel] = useState('gpt-3.5-turbo');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const prompts = [
    { value: 'professionnel', label: 'Ton professionnel' },
    { value: 'neutre', label: 'Ton neutre' },
    { value: 'convivial', label: 'Ton convivial' },
    { value: 'persuasif', label: 'Ton persuasif' },
    { value: 'document', label: 'Traitement de document' },
  ];

  const models = [
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
    { value: 'gpt-4', label: 'GPT-4' },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, context, model }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.reformulatedText);
      }
    } catch {
      setError('Erreur lors de la reformulation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">Reformulation</h1>
      <p className="text-lg mb-4">
        Entrez votre texte pour obtenir une reformulation adaptée à vos besoins.
      </p>
      <div className="mb-4">
        <label htmlFor="context" className="block text-sm font-medium mb-2">
          Choisissez un contexte prédéfini :
        </label>
        <Select value={context} onValueChange={setContext}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choisissez un contexte" />
          </SelectTrigger>
          <SelectContent>
            {prompts.map((prompt) => (
              <SelectItem key={prompt.value} value={prompt.value}>
                {prompt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <label htmlFor="model" className="block text-sm font-medium mb-2">
          Modèle
        </label>
        <Select value={model} onValueChange={setModel}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionnez un modèle" />
          </SelectTrigger>
          <SelectContent>
            {models.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <label htmlFor="texte" className="block text-sm font-medium mb-2">
          Texte à reformuler
        </label>
        <Textarea
          id="texte"
          placeholder="Entrez votre texte ici..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
        />
      </div>
      <div>
        <Button onClick={handleSubmit} className="w-full mt-2" disabled={loading}>
          {loading ? 'Reformulation en cours...' : 'Reformuler'}
        </Button>
      </div>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {result && (
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded">
          <div className="font-semibold mb-2">Résultat :</div>
          <div>{result}</div>
        </div>
      )}
    </div>
  );
}