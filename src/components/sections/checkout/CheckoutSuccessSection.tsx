'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';

export default function CheckoutSuccessSection() {
  const orderNumber = "EX-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-xl text-gray-600 mb-2">Thank you for your purchase</p>
        <p className="text-gray-500">Order #{orderNumber}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Processing</h3>
                <p className="text-gray-600 mb-4">
                  Your order is being prepared for shipment. You'll receive tracking information once your items are on their way.
                </p>
                <p className="text-sm text-gray-500">
                  Estimated delivery: {estimatedDelivery}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirmation Sent</h3>
                <p className="text-gray-600 mb-4">
                  A detailed confirmation email has been sent to your email address with your order details and receipt.
                </p>
                <p className="text-sm text-gray-500">
                  Check your spam folder if you don't see it in your inbox
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
              <Package className="h-8 w-8 text-blue-600 mx-auto" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Order Processing</h3>
            <p className="text-sm text-gray-600">
              We're carefully preparing your items for shipment
            </p>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
              <ArrowRight className="h-8 w-8 text-blue-600 mx-auto" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Shipping</h3>
            <p className="text-sm text-gray-600">
              Your order will be shipped within 1-2 business days
            </p>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Delivery</h3>
            <p className="text-sm text-gray-600">
              Enjoy your premium artisan products
            </p>
          </div>
        </div>
      </div>

      <div className="text-center space-y-4">
        <Button asChild size="lg">
          <Link href="/orders">
            View Order Details
          </Link>
        </Button>

        <div className="space-x-4">
          <Button variant="outline" asChild>
            <Link href="/shop">
              Continue Shopping
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/account">
              My Account
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-12 text-center text-sm text-gray-500">
        <p>Need help? <Link href="/contact" className="text-blue-600 hover:underline">Contact our support team</Link></p>
      </div>
    </div>
  );
}
