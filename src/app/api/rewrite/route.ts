interface RewriteRequest {
  text: string;
}

interface RewriteResponse {
  result: string;
}

export async function POST(req: Request): Promise<Response> {
  if (req.headers.get('content-type') !== 'application/json') {
    return Response.json({ result: 'Requête invalide.' }, { status: 400 });
  }

  let body: RewriteRequest;
  try {
    body = await req.json();
  } catch {
    return Response.json({ result: 'Erreur de parsing JSON.' }, { status: 400 });
  }

  if (!body?.text) {
    return Response.json({ result: 'Aucun texte fourni.' }, { status: 400 });
  }

  const result = `Voici une version reformulée de votre texte :\n\n${body.text.toUpperCase()}`;
  const response: RewriteResponse = { result };

  return Response.json(response);
}