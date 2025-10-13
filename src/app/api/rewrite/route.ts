import { NextRequest, NextResponse } from 'next/server';
import { rewriteText } from '@/lib/openai';

export async function POST(req: NextRequest) {
  const { text, context } = await req.json();

  if (!text || !context) {
    return NextResponse.json({ error: 'Texte ou contexte manquant.' }, { status: 400 });
  }

  const prompt = `Reformule ce texte dans le contexte suivant : ${context}\n\n${text}`;

  try {
    const reformulatedText = await rewriteText(prompt);
    return NextResponse.json({ reformulatedText });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}