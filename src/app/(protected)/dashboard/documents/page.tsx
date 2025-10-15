'use client';

import { useState, useRef } from 'react';
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from '@/components/ui/empty';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { LoaderIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LargeHeading, Paragraph } from '@/components/ui/typography';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}

export default function DocumentsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [documentType, setDocumentType] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('gpt-3.5-turbo');
  const [summaryDetails, setSummaryDetails] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setError('');
      setDocumentType(getDocumentType(uploadedFile));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] || null;
    if (uploadedFile) {
      setFile(uploadedFile);
      setError('');
      setDocumentType(getDocumentType(uploadedFile));
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFile(null);
    setDocumentType(null);
    setSelectedPrompt(null);
    setCustomPrompt('');
    setSummaryDetails('');
  };

  const getDocumentType = (file: File): string => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension === 'docx') return 'Document Word';
    if (extension === 'pdf') return 'Document PDF';
    if (extension === 'txt') return 'Document Texte';
    return 'Format inconnu';
  };

  const handleSubmit = async () => {
    if (!file || (!selectedPrompt && !customPrompt)) {
      setError('Veuillez compléter toutes les étapes avant de traiter le document.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('model', selectedModel);
      formData.append('prompt', customPrompt || selectedPrompt!);

      if (selectedPrompt === 'Résumé' && summaryDetails) {
        formData.append('summaryDetails', summaryDetails);
      }

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
    <div className="p-8 w-full mx-auto flex justify-between">
      <div className="flex-1 pr-8">
        <h1 className="text-2xl font-bold mb-6">Traitement de Documents</h1>
        <p className="text-lg mb-4">Glissez et déposez un document ou cliquez sur l&#39;icône pour en sélectionner un.</p>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleIconClick}
          className="border-dashed border-2 border-gray-300 rounded p-8 text-center cursor-pointer bg-gray-100 dark:bg-gray-800"
        >
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
                  Glissez et déposez un fichier ici ou cliquez sur l&#39;icône pour en sélectionner un.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <div>
              <p className="text-sm text-gray-600">Fichier sélectionné : {file.name}</p>
              <p className="text-sm text-gray-600 mt-2">Type de document : {documentType}</p>
              <Button
                onClick={handleRemoveFile}
                variant="destructive"
                size="sm"
                className="mt-4"
              >
                Supprimer
              </Button>
            </div>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {file && (
          <div className="mt-4">
            <label htmlFor="model" className="block text-sm font-medium">
              Modèle OpenAI
            </label>
            <Select onValueChange={(value) => setSelectedModel(value)} value={selectedModel}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionnez un modèle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-3.5-turbo">
                  <div className="flex items-center justify-between">
                    GPT-3.5 Turbo
                    <Badge variant="secondary" className="ml-2">
                      Par défaut
                    </Badge>
                  </div>
                </SelectItem>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {file && (
          <div className="mt-4">
            <label htmlFor="prompt" className="block text-sm font-medium">
              Prompt prédéfini
            </label>
            <Select onValueChange={(value) => setSelectedPrompt(value)} value={selectedPrompt || ''}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionnez un prompt" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Résumé">Résumé</SelectItem>
                <SelectItem value="Analyse">Analyse</SelectItem>
                <SelectItem value="Traduction">Traduction</SelectItem>
                <SelectItem value="custom">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {file && selectedPrompt === 'Résumé' && (
          <div className="mt-4">
            <label htmlFor="summaryDetails" className="block text-sm font-medium">
              Précisions optionnelles <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="summaryDetails"
              name="summaryDetails"
              className="w-full"
              value={summaryDetails}
              onChange={(e) => setSummaryDetails(e.target.value)}
              placeholder="Ajoutez des précisions pour le résumé..."
            />
          </div>
        )}

        {file && selectedPrompt === 'custom' && (
          <div className="mt-4">
            <label htmlFor="customPrompt" className="block text-sm font-medium">
              Prompt personnalisé
            </label>
            <Textarea
              id="customPrompt"
              name="customPrompt"
              className="w-full"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Entrez votre prompt ici..."
            />
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={!file || (!selectedPrompt && !customPrompt) || loading}
          variant="default"
          size="lg"
          className={`mt-4 w-full ${(!file || (!selectedPrompt && !customPrompt)) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading && <Spinner className="mr-2" />}
          {loading ? 'Traitement en cours...' : 'Traiter le document'}
        </Button>

        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>

      {result && (
        <div className="w-1/3 bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-md">
          <LargeHeading className="text-lg">Résultat</LargeHeading>
          <Paragraph className="text-sm">{result}</Paragraph>
        </div>
      )}
    </div>
  );
}