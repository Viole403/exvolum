'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, ArrowRight } from 'lucide-react';
import AccountSidebar from '@/components/sections/account/AccountSidebar';

export default function Addresses() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetch('/api/user/addresses')
        .then(res => res.json())
        .then(data => setAddresses(data.addresses || []))
        .catch(() => setError('Failed to load addresses'));
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
            <AccountSidebar active="addresses" />
          </div>
          {/* Content */}
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <MapPin className="h-7 w-7" /> My Addresses
            </h1>
            <Card>
              <CardContent className="p-8 space-y-8">
                {error && <div className="text-red-600 mb-4">{error}</div>}
                {addresses.length === 0 ? (
                  <div className="text-gray-500">You have no saved addresses.</div>
                ) : (
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="flex items-center justify-between border rounded-lg p-4">
                        <div>
                          <div className="font-medium text-gray-900">{address.name || `${address.firstName} ${address.lastName}`}</div>
                          <div className="text-gray-600 text-sm">{address.street}, {address.city}, {address.state} {address.zipCode}, {address.country}</div>
                          {address.isDefault && <span className="text-xs text-blue-700 font-semibold">Default</span>}
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/account/addresses/${address.id}`}>
                            Edit <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                <div>
                  <Button asChild>
                    <Link href="/account/addresses/new">Add New Address</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}