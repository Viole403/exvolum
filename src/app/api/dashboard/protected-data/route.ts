import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(_req: NextRequest) {
  const session = await auth();
  if (!session || session.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Example protected data
  const userCount = await prisma.user.count();
  const articleCount = await prisma.article.count();
  const teamCount = await prisma.teamMember.count();

  return NextResponse.json({
    userCount,
    articleCount,
    teamCount,
    message: 'This is protected dashboard data for admins only.'
  });
}
