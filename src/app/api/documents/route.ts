import { NextRequest, NextResponse } from 'next/server';
import { rewriteText } from '@/lib/openai';
import mammoth from 'mammoth';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    console.error('Utilisateur non authentifié.');
    return NextResponse.json({ error: 'Utilisateur non authentifié.' }, { status: 401 });
  }

  const userId = session.user.id;

  const formData = await req.formData();
  const file = formData.get('file') as File;
  const model = formData.get('model') as string;
  const context = formData.get('prompt') as string;

  if (!file) {
    console.error('Aucun fichier fourni.');
    return NextResponse.json({ error: 'Aucun fichier fourni.' }, { status: 400 });
  }

  if (!model) {
    console.error('Aucun modèle fourni.');
    return NextResponse.json({ error: 'Aucun modèle sélectionné.' }, { status: 400 });
  }

  if (!context) {
    console.error('Aucun contexte fourni.');
    return NextResponse.json({ error: 'Aucun contexte sélectionné.' }, { status: 400 });
  }

  try {
    console.log('Fichier reçu :', file.name);

    if (!file.name.endsWith('.docx')) {
      console.error('Le fichier n\'est pas un fichier .docx.');
      return NextResponse.json({ error: 'Le fichier doit être au format .docx.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await mammoth.extractRawText({ buffer });
    const text = result.value.trim();

    if (!text) {
      console.error('Impossible d\'extraire le contenu du fichier.');
      return NextResponse.json({ error: 'Impossible d\'extraire le contenu du fichier.' }, { status: 400 });
    }

    console.log('Texte extrait du fichier :', text);

    const prompt = `Analyse et traite le contenu suivant extrait d'un document :\n\n${text}`;
    console.log('Prompt envoyé à OpenAI :', prompt);

    const processedText = await rewriteText(prompt, model);
    console.log('Réponse de OpenAI :', processedText);

    const cost = processedText.length * 0.0001;

    await prisma.history.create({
      data: {
        text: processedText,
        context,
        model,
        cost,
        date: new Date(),
        userId,
      },
    });

    return NextResponse.json({ processedText, cost });
  } catch (error) {
    const err = error as Error;
    console.error('Erreur lors du traitement :', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}