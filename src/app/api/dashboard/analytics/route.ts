import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session || session.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Mock analytics data
  const analyticsData = {
    totalSales: 15234.50,
    newUsers: 120,
    pageViews: 56789,
    conversionRate: 3.5,
    salesOverTime: [
      { date: '2024-01-01', sales: 1200 },
      { date: '2024-02-01', sales: 1500 },
      { date: '2024-03-01', sales: 1300 },
      { date: '2024-04-01', sales: 1800 },
      { date: '2024-05-01', sales: 2000 },
    ]
  };

  return NextResponse.json(analyticsData);
}
