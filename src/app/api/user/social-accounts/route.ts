import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { $Enums } from '@prisma/client';

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const accounts = await prisma.socialAccount.findMany({
    where: { userId: user.id },
    select: { provider: true },
  });
  // Build linked object
  const linked = {
    google: accounts.some(a => a.provider === 'GOOGLE'),
    apple: accounts.some(a => a.provider === 'APPLE'),
  };
  return NextResponse.json({ linked });
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // Accept provider from query param or body
  let provider = req.nextUrl.searchParams.get('provider');
  if (!provider) {
    try {
      const body = await req.json();
      provider = body.provider;
    } catch {}
  }
  if (!provider) {
    return NextResponse.json({ error: 'Provider required' }, { status: 400 });
  }
  // Map provider string to enum
  let providerEnum: $Enums.SocialProvider | undefined;
  if (provider.toLowerCase() === 'google') providerEnum = 'GOOGLE';
  if (provider.toLowerCase() === 'apple') providerEnum = 'APPLE';
  if (!providerEnum) {
    return NextResponse.json({ error: 'Invalid provider' }, { status: 400 });
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  // Unlink the social account for this provider
  await prisma.socialAccount.deleteMany({
    where: { userId: user.id, provider: providerEnum },
  });
  return NextResponse.json({ success: true });
}
