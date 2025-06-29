import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const team = await prisma.teamMember.findMany({
    orderBy: { name: 'asc' },
  });
  return NextResponse.json(team);
}
