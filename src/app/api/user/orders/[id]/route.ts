import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Await the params Promise
  const { id: orderId } = await params;

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
        user: { email: session.user.email },
      },
      include: {
        items: {
          include: {
            product: {
              include: { images: true }
            },
            variant: true
          }
        },
        shippingAddress: true,
        billingAddress: true,
        tracking: {
          include: { events: true }
        }
      }
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}