import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    console.error('Utilisateur non authentifié.');
    return NextResponse.json({ error: 'Utilisateur non authentifié.' }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const history = await prisma.history.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      select: {
        id: true,
        type: true,
        text: true,
        context: true,
        model: true,
        cost: true,
        date: true,
      },
    });

    return NextResponse.json(history, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique :', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération de l\'historique.' }, { status: 500 });
  }
}