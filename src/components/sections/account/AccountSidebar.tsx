// filepath: src/components/sections/account/AccountSidebar.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AccountSidebar({ active = '' }: { active?: string }) {
  const { user, signOut } = useAuth();
  const router = useRouter();
  if (!user) return null;
  const getUserDisplayName = () => {
    if (user?.name) return user.name;
    return user?.email?.split('@')[0] || 'User';
  };
  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="h-10 w-10 text-gray-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{getUserDisplayName()}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <nav className="space-y-2">
          <Link href="/account" className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${active === 'overview' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}>
            <User className="h-5 w-5" />
            <span>Account Overview</span>
          </Link>
          <Link href="/account/orders" className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${active === 'orders' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Package className="h-5 w-5" />
            <span>Order History</span>
          </Link>
          <Link href="/account/wishlist" className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${active === 'wishlist' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Heart className="h-5 w-5" />
            <span>Wishlist</span>
          </Link>
          <Link href="/account/addresses" className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${active === 'addresses' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}>
            <MapPin className="h-5 w-5" />
            <span>Addresses</span>
          </Link>
          <Link href="/account/settings" className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${active === 'settings' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Settings className="h-5 w-5" />
            <span>Account Settings</span>
          </Link>
          <button
            onClick={async () => { await signOut(); router.push('/'); }}
            className="flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg w-full text-left"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </nav>
      </CardContent>
    </Card>
  );
}
