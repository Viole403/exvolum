'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ArrowRight } from 'lucide-react';
import AccountSidebar from '@/components/sections/account/AccountSidebar';

export default function Wishlist() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetch('/api/user/wishlist')
        .then(res => res.json())
        .then(data => setWishlist(data.items || []))
        .catch(() => setError('Failed to load wishlist'));
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        
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

  return (
    <div className="min-h-screen bg-white">
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8 py-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AccountSidebar active="wishlist" />
          </div>
          {/* Main Content */}
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Heart className="h-7 w-7 text-red-600" /> My Wishlist
            </h1>
            <Card>
              <CardContent className="p-8 space-y-8">
                {error && <div className="text-red-600 mb-4">{error}</div>}
                {wishlist.length === 0 ? (
                  <div className="text-gray-500">Your wishlist is empty.</div>
                ) : (
                  <div className="space-y-4">
                    {wishlist.map((item) => (
                      <div key={item.id} className="flex items-center justify-between border rounded-lg p-4">
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-gray-600 text-sm">{item.brand}</div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/shop/${item.productId}`}>
                            View <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}