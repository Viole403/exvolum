import { NextRequest, NextResponse } from 'next/server';
import getServerSession from 'next-auth';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

// PUT: Update an address by id for the current user
export async function PUT(
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

  const data = await request.json();
  const address = await prisma.address.update({
    where: { id, userId: user.id },
    data,
  });

  return NextResponse.json(address);
}

// DELETE: Delete an address by id for the current user
export async function DELETE(
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

  await prisma.address.delete({
    where: { id, userId: user.id },
  });

  return NextResponse.json({ success: true });
}