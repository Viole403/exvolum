'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut } from 'lucide-react';
import AccountSidebar from '@/components/sections/account/AccountSidebar';

export default function Account() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<any[]>([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      setStatsLoading(true);
      Promise.all([
        fetch('/api/user/orders').then(res => res.json()),
        fetch('/api/user/wishlist').then(res => res.json())
      ])
        .then(([ordersData, wishlistData]) => {
          setOrders(ordersData.orders || []);
          setTotalSpent(ordersData.totalSpent || 0);
          setWishlistCount((wishlistData.items || []).length);
          setRecentOrders((ordersData.orders || []).slice(0, 3));
        })
        .finally(() => setStatsLoading(false));
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading || statsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-16 px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4 w-1/4"></div>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="md:col-span-3 h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getUserDisplayName = () => {
    if (user?.name) {
      return user.name;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8 py-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AccountSidebar active="overview" />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Welcome Section */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {getUserDisplayName().split(' ')[0]}!</h1>
              <p className="text-gray-600">Manage your account and track your orders</p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Package className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-gray-900">{orders.length}</h3>
                  <p className="text-gray-600">Total Orders</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <CreditCard className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-gray-900">${totalSpent.toFixed(2)}</h3>
                  <p className="text-gray-600">Total Spent</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Heart className="h-8 w-8 text-red-600 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-gray-900">{wishlistCount}</h3>
                  <p className="text-gray-600">Wishlist Items</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
                  <Button variant="outline" asChild>
                    <Link href="/account/orders">View All Orders</Link>
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentOrders.length === 0 ? (
                    <div className="text-gray-500">You have no orders yet.</div>
                  ) : (
                    recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                          <p className="text-sm text-gray-600">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''} • {order.items?.length || 0} items</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${order.total}</p>
                          <span className={`text-sm px-2 py-1 rounded-full ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-16 flex flex-col items-center justify-center" asChild>
                    <Link href="/shop">
                      <Package className="h-6 w-6 mb-2" />
                      Continue Shopping
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center justify-center" asChild>
                    <Link href="/account/wishlist">
                      <Heart className="h-6 w-6 mb-2" />
                      View Wishlist
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center justify-center" asChild>
                    <Link href="/account/addresses">
                      <MapPin className="h-6 w-6 mb-2" />
                      Manage Addresses
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center justify-center" asChild>
                    <Link href="/help">
                      <Settings className="h-6 w-6 mb-2" />
                      Get Help
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Exvolum</h3>
              <p className="text-gray-300">Premium products for modern living</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/account" className="hover:text-white">My Account</Link></li>
                <li><Link href="/account/orders" className="hover:text-white">Order History</Link></li>
                <li><Link href="/account/wishlist" className="hover:text-white">Wishlist</Link></li>
                <li><Link href="/account/settings" className="hover:text-white">Profile Settings</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/returns" className="hover:text-white">Returns</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Exvolum. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}