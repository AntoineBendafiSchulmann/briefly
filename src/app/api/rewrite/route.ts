import { NextRequest, NextResponse } from 'next/server';
import { rewriteText } from '@/lib/openai';
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

  const { text, context, model } = await req.json();

  if (!text || !context || !model) {
    return NextResponse.json({ error: 'Texte, contexte ou modèle manquant.' }, { status: 400 });
  }

  const prompt = `Reformule ce texte dans le contexte suivant : ${context}\n\n${text}`;

  try {
    const reformulatedText = await rewriteText(prompt, model);

    const cost = text.length * 0.0001;

    await prisma.history.create({
      data: {
        text: reformulatedText,
        context,
        cost,
        date: new Date(),
        userId,
      },
    });

    return NextResponse.json({ reformulatedText });
  } catch (error) {
    const err = error as Error;
    console.error('Erreur lors de la reformulation :', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}