import { NextRequest, NextResponse } from 'next/server';
import { rewriteText } from '@/lib/openai';
import mammoth from 'mammoth';

export async function parseDocx(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value.trim();
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const model = formData.get('model') as string;

  if (!file) {
    return NextResponse.json({ error: 'Aucun fichier fourni.' }, { status: 400 });
  }

  if (!model) {
    return NextResponse.json({ error: 'Aucun modèle sélectionné.' }, { status: 400 });
  }

  try {
    const text = await parseDocx(file);

    if (!text) {
      return NextResponse.json({ error: 'Impossible d\'extraire le contenu du fichier.' }, { status: 400 });
    }

    console.log('Texte extrait du fichier :', text);

    const prompt = `Analyse et traite le contenu suivant extrait d'un document :\n\n${text}`;
    console.log('Prompt envoyé à OpenAI :', prompt);

    const processedText = await rewriteText(prompt, model);
    console.log('Réponse de OpenAI :', processedText);

    return NextResponse.json({ processedText });
  } catch (error) {
    const err = error as Error;
    console.error('Erreur lors du traitement :', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}