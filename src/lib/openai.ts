import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function rewriteText(prompt: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  if (!response.choices || !response.choices[0] || !response.choices[0].message || !response.choices[0].message.content) {
    throw new Error("La réponse de l'api openai est invalide ou vide.");
  }

  return response.choices[0].message.content.trim();
}