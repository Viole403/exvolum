import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session || session.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Mock settings data
  const settings = {
    storeOnline: true,
    emailNotifications: true,
    allowRegistrations: true,
  };

  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session || session.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const updatedSettings = await req.json();

  // In a real application, you would save these settings to a database.
  // For now, we'll just log them and return a success message.
  console.log('Updating settings:', updatedSettings);

  return NextResponse.json({ message: 'Settings updated successfully', updatedSettings });
}
