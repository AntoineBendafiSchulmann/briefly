import { OpenAI } from "openai";

let openai: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("clé API OpenAI manquante, veuillez définir OPENAI_API_KEY dans vos variables d'environnement");
  }

  if (!openai) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  return openai;
}

export async function rewriteText(prompt: string, model: string): Promise<string> {
  const openai = getOpenAI();
  const response = await openai.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
  });

  if (!response.choices?.[0]?.message?.content) {
    throw new Error("la réponse de l'API OpenAI est invalide ou vide.");
  }

  return response.choices[0].message.content.trim();
}
