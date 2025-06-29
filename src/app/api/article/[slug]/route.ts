import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_req: any, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const article = await prisma.article.findUnique({
      where: { slug },
    });
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}