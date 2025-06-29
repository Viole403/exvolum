import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';

// Mock data - replace with actual API calls
async function getDashboardData() {
  // In a real app, you would fetch this data from your API
  return {
    totalUsers: 1245,
    totalArticles: 89,
    activeSessions: 42,
    totalRevenue: 12567.89,
    recentActivity: [
      { id: 1, user: 'John Doe', action: 'Created new article', time: '2 minutes ago' },
      { id: 2, user: 'Jane Smith', action: 'Updated profile', time: '10 minutes ago' },
      { id: 3, user: 'Admin', action: 'Deleted user', time: '1 hour ago' },
    ],
  };
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login');
  }

  // This is a fallback, middleware should handle this
  if ((session.user as any)?.role !== 'ADMIN') {
    redirect('/');
  }

  const data = await getDashboardData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {session.user.name || 'Admin'}! Here's what's happening with your store.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Icons.users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles</CardTitle>
            <Icons.newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalArticles}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Icons.activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.activeSessions}</div>
            <p className="text-xs text-muted-foreground">Active sessions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Icons.dollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.user}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action}
                    </p>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <a
              href="/dashboard/articles/new"
              className="flex items-center p-3 border rounded-lg hover:bg-accent transition-colors"
            >
              <Icons.plusCircle className="h-4 w-4 mr-2" />
              <span>New Article</span>
            </a>
            <a
              href="/dashboard/users"
              className="flex items-center p-3 border rounded-lg hover:bg-accent transition-colors"
            >
              <Icons.users className="h-4 w-4 mr-2" />
              <span>Manage Users</span>
            </a>
            <a
              href="/dashboard/settings"
              className="flex items-center p-3 border rounded-lg hover:bg-accent transition-colors"
            >
              <Icons.settings className="h-4 w-4 mr-2" />
              <span>Settings</span>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
