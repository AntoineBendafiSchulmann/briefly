'use client';

import { useState } from 'react';
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from '@/components/ui/empty';
import { Button } from '@/components/ui/button';

export default function DocumentsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setError('');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Aucun fichier sélectionné.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/documents', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.processedText || 'Document traité avec succès.');
      }
    } catch {
      setError('Une erreur est survenue lors du traitement.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Traitement de Documents</h1>
      <p className="text-lg mb-4">Glissez et déposez un document pour le traiter.</p>

      {!file ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </EmptyMedia>
            <EmptyTitle>Aucun fichier sélectionné</EmptyTitle>
            <EmptyDescription>
              Glissez et déposez un fichier ici pour commencer le traitement.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-dashed border-2 border-gray-300 rounded p-8 text-center"
        >
          <p className="text-sm text-gray-600">Fichier sélectionné : {file.name}</p>
        </div>
      )}

      <Button
        onClick={handleSubmit}
        disabled={loading}
        variant="default"
        size="lg"
        className="mt-4 w-full"
      >
        {loading ? 'Traitement en cours...' : 'Traiter le document'}
      </Button>

      {error && <p className="mt-4 text-red-500">{error}</p>}
      {result && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
          <h3 className="font-bold">Résultat :</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}