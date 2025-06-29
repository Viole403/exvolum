import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

// POST: Set an address as default for the current user
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Await the params Promise
  const { id } = await params;

  // Set all addresses to isDefault: false
  await prisma.address.updateMany({
    where: { userId: user.id },
    data: { isDefault: false },
  });

  // Set the selected address to isDefault: true
  await prisma.address.update({
    where: { id, userId: user.id },
    data: { isDefault: true },
  });

  return NextResponse.json({ success: true });
}