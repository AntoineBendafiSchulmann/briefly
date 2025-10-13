'use client';

import { useState } from 'react';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';

export default function ReformulationPage() {
  const [context, setContext] = useState('professionnel');
  const [text, setText] = useState('');

  const prompts = [
    { value: 'professionnel', label: 'Ton professionnel' },
    { value: 'neutre', label: 'Ton neutre' },
    { value: 'convivial', label: 'Ton convivial' },
    { value: 'persuasif', label: 'Ton persuasif' },
    { value: 'document', label: 'Traitement de document' },
  ];

  const handleSubmit = () => {
    console.log('Texte soumis :', text);
    console.log('Contexte sélectionné :', context);
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
        <select
          id="context"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          className="border p-2 w-full rounded"
        >
          {prompts.map((prompt) => (
            <option key={prompt.value} value={prompt.value}>
              {prompt.label}
            </option>
          ))}
        </select>
      </div>
      <InputGroup className="mb-4">
        <InputGroupInput
          placeholder="Entrez votre texte ici..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div>
          <Button onClick={handleSubmit}>Reformuler</Button>
        </div>
      </InputGroup>
    </div>
  );
}