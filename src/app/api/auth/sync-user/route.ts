import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get the current user from Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, email, firstName, lastName, avatarUrl } = body;

    // Verify that the user is trying to sync their own data
    if (user.id !== id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Upsert user in the database
    const dbUser = await prisma.user.upsert({
      where: { id },
      update: {
        email,
        firstName,
        lastName,
        avatarUrl,
        updatedAt: new Date(),
      },
      create: {
        id,
        email,
        firstName,
        lastName,
        avatarUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, user: dbUser });
  } catch (error) {
    console.error('Error syncing user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
