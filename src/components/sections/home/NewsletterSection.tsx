'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail('');
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
      <p className="text-xl text-gray-300 mb-8">
        Subscribe to our newsletter for the latest products and exclusive offers
      </p>
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <Button type="submit" className="bg-white text-gray-900 hover:bg-gray-100">
          Subscribe
        </Button>
      </form>
    </div>
  );
}
