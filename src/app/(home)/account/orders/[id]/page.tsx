'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Package } from 'lucide-react';
import AccountSidebar from '@/components/sections/account/AccountSidebar';

export default function OrderDetails() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id as string;
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && orderId) {
      fetch(`/api/user/orders/${orderId}`)
        .then(res => res.json())
        .then(data => setOrder(data.order))
        .catch(() => setError('Failed to load order details'));
    }
  }, [user, orderId]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-12 px-6">
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

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/account/orders">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
            </Link>
          </Button>
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-red-600 font-semibold">{error}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8 py-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AccountSidebar active="orders" />
          </div>
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Button variant="ghost" asChild className="mb-6">
              <Link href="/account/orders">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Package className="h-7 w-7" /> Order #{order.id}
            </h1>
            <Card>
              <CardContent className="p-8 space-y-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <div className="font-semibold text-gray-900">Placed on {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}</div>
                    <div className="text-gray-600 text-sm">Status: <span className={`font-medium ${order.status === 'DELIVERED' ? 'text-green-700' : 'text-blue-700'}`}>{order.status}</span></div>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="text-lg font-bold text-gray-900">Total: ${order.total}</div>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                  <div className="space-y-4">
                    {order.items?.map((item: any) => (
                      <div key={item.id} className="flex items-center justify-between border rounded-lg p-4">
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-gray-600 text-sm">Qty: {item.quantity}</div>
                        </div>
                        <div className="text-right font-semibold text-gray-900">${item.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                  <div className="text-gray-700">
                    {order.shippingAddress?.name}<br />
                    {order.shippingAddress?.street}<br />
                    {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}<br />
                    {order.shippingAddress?.country}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}