import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Navbar } from '@/components/dashboard/navbar';


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  // This is a fallback, as the middleware should handle redirects
  if (!session) {
    redirect('/auth/login');
  }

  // Check if user is admin
  // Ensure user object has required properties
  const user = {
    name: session.user?.name || null,
    email: session.user?.email || null,
    image: session.user?.image || null,
  };

  const isAdmin = (session.user as any)?.role === 'ADMIN';
  
  if (!isAdmin) {
    redirect('/');
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
