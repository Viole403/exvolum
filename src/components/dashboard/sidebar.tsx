'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

const sidebarItems = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: Icons.layoutDashboard,
  },
  {
    title: 'Articles',
    href: '/dashboard/articles',
    icon: Icons.newspaper,
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: Icons.barChart,
  },
  {
    title: 'Users',
    href: '/dashboard/users',
    icon: Icons.users,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Icons.settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <div className="mt-5 flex-1 flex flex-col
          ">
            <nav className="flex-1 px-2 space-y-1">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <Icon
                      className={cn(
                        isActive ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
