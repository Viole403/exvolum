import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
  }
  const member = await prisma.teamMember.findUnique({
    where: { slug },
  });
  if (!member) {
    return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
  }
  return NextResponse.json(member);
}