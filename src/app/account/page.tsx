'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut } from 'lucide-react';

export default function Account() {
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    joinDate: '2024-01-15',
    totalOrders: 12,
    totalSpent: 485.99
  });

  const recentOrders = [
    {
      id: 'EX-ABC123',
      date: '2025-01-10',
      status: 'Delivered',
      total: 47.00,
      items: 2
    },
    {
      id: 'EX-DEF456',
      date: '2025-01-05',
      status: 'Shipped',
      total: 32.99,
      items: 1
    },
    {
      id: 'EX-GHI789',
      date: '2024-12-28',
      status: 'Delivered',
      total: 89.50,
      items: 3
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          Exvolum
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/shop" className="text-gray-600 hover:text-gray-900 transition-colors">
            Shop
          </Link>
          <Link href="/articles" className="text-gray-600 hover:text-gray-900 transition-colors">
            Articles
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
            Contact
          </Link>
          <Button variant="default" className="bg-black hover:bg-gray-800 text-white">
            Account
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="h-10 w-10 text-gray-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>

                <nav className="space-y-2">
                  <Link href="/account" className="flex items-center space-x-3 px-3 py-2 bg-gray-100 rounded-lg text-gray-900">
                    <User className="h-5 w-5" />
                    <span>Account Overview</span>
                  </Link>
                  <Link href="/account/orders" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                    <Package className="h-5 w-5" />
                    <span>Order History</span>
                  </Link>
                  <Link href="/account/wishlist" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                    <Heart className="h-5 w-5" />
                    <span>Wishlist</span>
                  </Link>
                  <Link href="/account/addresses" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                    <MapPin className="h-5 w-5" />
                    <span>Addresses</span>
                  </Link>
                  <Link href="/account/payment" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                    <CreditCard className="h-5 w-5" />
                    <span>Payment Methods</span>
                  </Link>
                  <Link href="/account/profile" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                    <Settings className="h-5 w-5" />
                    <span>Account Settings</span>
                  </Link>
                  <button className="flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg w-full text-left">
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Welcome Section */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name.split(' ')[0]}!</h1>
              <p className="text-gray-600">Manage your account and track your orders</p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Package className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-gray-900">{user.totalOrders}</h3>
                  <p className="text-gray-600">Total Orders</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <CreditCard className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-gray-900">${user.totalSpent}</h3>
                  <p className="text-gray-600">Total Spent</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Heart className="h-8 w-8 text-red-600 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-gray-900">8</h3>
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
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                        <p className="text-sm text-gray-600">{order.date} • {order.items} items</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${order.total}</p>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
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
                <li><Link href="/account/orders" className="hover:text-white">Order History</Link></li>
                <li><Link href="/account/wishlist" className="hover:text-white">Wishlist</Link></li>
                <li><Link href="/account/profile" className="hover:text-white">Profile Settings</Link></li>
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