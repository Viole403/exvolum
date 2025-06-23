'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Package, RefreshCw, Clock, CheckCircle } from 'lucide-react';

export default function Returns() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Returns & Refunds Policy</h1>
          
          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong> January 15, 2025
          </p>

          {/* Quick Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 not-prose">
            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">30-Day Returns</h3>
                <p className="text-gray-600 text-sm">Return items within 30 days of delivery</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <RefreshCw className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Process</h3>
                <p className="text-gray-600 text-sm">Simple online return initiation</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <CheckCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Refunds</h3>
                <p className="text-gray-600 text-sm">Refunds processed within 5-7 business days</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Return Policy Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We want you to be completely satisfied with your purchase. If you're not happy with your order, 
                you can return most items within 30 days of delivery for a full refund or exchange.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Quick Start</h3>
                <p className="text-blue-800 mb-4">
                  To start a return, log into your account and select "Return Items" next to your order, 
                  or contact our customer service team.
                </p>
                <Button asChild>
                  <Link href="/account/orders">Start a Return</Link>
                </Button>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Can Be Returned</h2>
              <div className="grid md:grid-cols-2 gap-6 not-prose">
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-green-900 mb-3">✓ Returnable Items</h3>
                    <ul className="space-y-2 text-green-800 text-sm">
                      <li>• Items in original condition and packaging</li>
                      <li>• Unused products with all accessories</li>
                      <li>• Items with original tags attached</li>
                      <li>• Products returned within 30 days</li>
                      <li>• Items purchased at full price or on sale</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-red-900 mb-3">✗ Non-Returnable Items</h3>
                    <ul className="space-y-2 text-red-800 text-sm">
                      <li>• Personalized or customized items</li>
                      <li>• Perishable goods or food items</li>
                      <li>• Items damaged by misuse</li>
                      <li>• Products without original packaging</li>
                      <li>• Gift cards and digital products</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Return Items</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Initiate Your Return</h3>
                    <p className="text-gray-700">
                      Log into your account and go to "Order History." Find your order and click "Return Items." 
                      Select the items you want to return and the reason for return.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Print Return Label</h3>
                    <p className="text-gray-700">
                      We'll email you a prepaid return shipping label. Print it out and attach it to your package. 
                      For defective items, return shipping is free.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Package and Ship</h3>
                    <p className="text-gray-700">
                      Pack your items securely in the original packaging if possible. Drop off at any authorized 
                      shipping location or schedule a pickup.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">4</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Receive Your Refund</h3>
                    <p className="text-gray-700">
                      Once we receive and process your return, we'll issue a refund to your original payment method 
                      within 5-7 business days.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Refund Information</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Refund Timeline</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Processing:</strong> 1-2 business days after we receive your return</li>
                    <li>• <strong>Credit Card:</strong> 3-5 business days after processing</li>
                    <li>• <strong>PayPal:</strong> 1-2 business days after processing</li>
                    <li>• <strong>Bank Transfer:</strong> 5-7 business days after processing</li>
                  </ul>
                </div>
                <p className="text-gray-700">
                  Refunds are issued to the original payment method used for the purchase. If you paid with a gift card, 
                  the refund will be issued as store credit.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Exchanges</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We currently don't offer direct exchanges. To exchange an item:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                <li>Return the original item following our return process</li>
                <li>Place a new order for the item you want</li>
                <li>We'll process your refund once we receive the returned item</li>
              </ol>
              <p className="text-gray-700 mt-4">
                This ensures you get the item you want as quickly as possible while your refund is being processed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Damaged or Defective Items</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you receive a damaged or defective item, please contact us immediately:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Take photos of the damaged item and packaging</li>
                <li>Contact our customer service within 48 hours of delivery</li>
                <li>We'll provide a prepaid return label at no cost to you</li>
                <li>We'll expedite a replacement or full refund</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">International Returns</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                International customers can return items, but please note:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Customer is responsible for return shipping costs (unless item is defective)</li>
                <li>Items must be returned within 30 days of delivery</li>
                <li>Customs duties and taxes are non-refundable</li>
                <li>Contact our support team for return authorization</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have questions about returns or need assistance with your return:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Email:</strong> returns@exvolum.com</p>
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