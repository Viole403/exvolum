'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Truck, Clock, Globe, Package } from 'lucide-react';

export default function Shipping() {
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
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/help">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Help Center
          </Link>
        </Button>

        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Shipping Information</h1>
          
          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong> January 15, 2025
          </p>

          {/* Quick Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 not-prose">
            <Card className="text-center">
              <CardContent className="p-6">
                <Truck className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Shipping</h3>
                <p className="text-gray-600 text-sm">On orders over $50</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-gray-600 text-sm">3-5 business days</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Globe className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Worldwide</h3>
                <p className="text-gray-600 text-sm">International shipping available</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Package className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tracking</h3>
                <p className="text-gray-600 text-sm">Real-time order tracking</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Domestic Shipping (United States)</h2>
              
              <div className="overflow-x-auto not-prose">
                <table className="w-full border-collapse border border-gray-300 mb-6">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Shipping Method</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Delivery Time</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Standard Shipping</td>
                      <td className="border border-gray-300 px-4 py-3">3-5 business days</td>
                      <td className="border border-gray-300 px-4 py-3">$5.99 (Free on orders $50+)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Express Shipping</td>
                      <td className="border border-gray-300 px-4 py-3">1-2 business days</td>
                      <td className="border border-gray-300 px-4 py-3">$12.99</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Overnight Shipping</td>
                      <td className="border border-gray-300 px-4 py-3">Next business day</td>
                      <td className="border border-gray-300 px-4 py-3">$24.99</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Free Shipping Offer</h3>
                <p className="text-green-800">
                  Enjoy free standard shipping on all orders over $50 within the United States. 
                  This offer applies automatically at checkout.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">International Shipping</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We ship to most countries worldwide. International shipping rates and delivery times 
                vary by destination and are calculated at checkout based on your location and order weight.
              </p>

              <div className="grid md:grid-cols-2 gap-6 not-prose mb-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Canada</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Delivery: 5-8 business days</li>
                      <li>• Shipping: $9.99 - $19.99</li>
                      <li>• Duties/taxes may apply</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Europe</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Delivery: 7-14 business days</li>
                      <li>• Shipping: $15.99 - $29.99</li>
                      <li>• VAT and duties may apply</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Important Note for International Orders</h3>
                <p className="text-blue-800">
                  International customers are responsible for any customs duties, taxes, or fees imposed 
                  by their country. These charges are not included in our shipping costs and are collected 
                  by the shipping carrier upon delivery.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order Processing</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Order Confirmation</h3>
                    <p className="text-gray-700">
                      You'll receive an email confirmation immediately after placing your order with your order details and tracking information.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Processing Time</h3>
                    <p className="text-gray-700">
                      Orders are typically processed within 1-2 business days. During peak seasons, processing may take up to 3 business days.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Shipping Notification</h3>
                    <p className="text-gray-700">
                      Once your order ships, you'll receive a shipping confirmation email with tracking information to monitor your package.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order Tracking</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Track your order easily through multiple methods:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li>Click the tracking link in your shipping confirmation email</li>
                <li>Log into your account and view order status in "Order History"</li>
                <li>Use the tracking number on the carrier's website</li>
                <li>Contact our customer service for assistance</li>
              </ul>
              <Button asChild>
                <Link href="/account/orders">Track Your Orders</Link>
              </Button>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping Restrictions</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Please note the following shipping restrictions:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>We cannot ship to P.O. boxes for certain products</li>
                <li>Some items may have shipping restrictions to certain states or countries</li>
                <li>Hazardous materials cannot be shipped internationally</li>
                <li>Large or heavy items may require special shipping arrangements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Delivery Issues</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you experience any delivery issues:
              </p>
              <div className="grid md:grid-cols-2 gap-6 not-prose">
                <Card className="border-orange-200 bg-orange-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-orange-900 mb-3">Package Not Delivered</h3>
                    <ul className="space-y-2 text-orange-800 text-sm">
                      <li>• Check with neighbors or building management</li>
                      <li>• Verify the shipping address</li>
                      <li>• Contact the carrier directly</li>
                      <li>• Reach out to our customer service</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-red-900 mb-3">Damaged Package</h3>
                    <ul className="space-y-2 text-red-800 text-sm">
                      <li>• Take photos of the damage</li>
                      <li>• Don't discard packaging</li>
                      <li>• Contact us within 48 hours</li>
                      <li>• We'll arrange replacement or refund</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Holiday Shipping</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                During holiday seasons, please note:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Order processing times may be extended</li>
                <li>Shipping carriers may experience delays</li>
                <li>We recommend ordering early for holiday delivery</li>
                <li>Express shipping options are available for last-minute orders</li>
              </ul>
              <div className="bg-yellow-50 p-6 rounded-lg mt-6">
                <h3 className="font-semibold text-yellow-900 mb-2">Holiday Cutoff Dates</h3>
                <p className="text-yellow-800">
                  We'll post specific holiday shipping cutoff dates on our website and social media 
                  to ensure your gifts arrive on time.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Have questions about shipping? We're here to help:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Email:</strong> shipping@exvolum.com</p>
                    <p className="text-gray-700 mb-2"><strong>Phone:</strong> +1 (555) 123-4567</p>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM EST</p>
                    <p className="text-gray-700"><strong>Live Chat:</strong> Available 24/7 on our website</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Exvolum</h3>
              <p className="text-gray-300">Premium quality products for modern living</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/returns" className="hover:text-white">Returns</Link></li>
                <li><Link href="/shipping" className="hover:text-white">Shipping</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/articles" className="hover:text-white">Articles</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
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