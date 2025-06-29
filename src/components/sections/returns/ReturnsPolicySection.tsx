import { Card, CardContent } from '@/components/ui/card';
import { Clock, RefreshCw, CheckCircle } from 'lucide-react';

export function ReturnsPolicySection() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Returns & Refunds Policy</h1>

      <p className="text-gray-600 mb-8">
        <strong>Last updated:</strong> June 24, 2025
      </p>

      {/* Quick Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-12 not-prose">
        <Card className="text-center">
          <CardContent className="p-6">
            <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">30-Day Returns</h3>
            <p className="text-gray-600 text-sm">
              Return items within 30 days of delivery for a full refund
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <RefreshCw className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Free Returns</h3>
            <p className="text-gray-600 text-sm">
              No return shipping fees for defective or incorrect items
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <CheckCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Quick Processing</h3>
            <p className="text-gray-600 text-sm">
              Refunds processed within 5-7 business days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Policy Details */}
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Return Eligibility</h2>
          <p className="text-gray-700 mb-4">
            To be eligible for a return, your item must be in the same condition that you received it,
            unworn or unused, with tags, and in its original packaging. You'll also need the receipt
            or proof of purchase.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Items must be returned within 30 days of delivery</li>
            <li>Items must be in original condition with all tags attached</li>
            <li>Original packaging and accessories must be included</li>
            <li>Proof of purchase (receipt or order number) required</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Non-Returnable Items</h2>
          <p className="text-gray-700 mb-4">
            Certain types of items cannot be returned for hygiene and safety reasons:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Perishable goods (food, flowers, plants)</li>
            <li>Personal care items (cosmetics, underwear, swimwear)</li>
            <li>Custom or personalized items</li>
            <li>Digital downloads and gift cards</li>
            <li>Items on final sale or clearance (marked as such)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Processing</h2>
          <p className="text-gray-700 mb-4">
            Once we receive your item, we will inspect it and notify you that we have received your
            returned item. We will immediately notify you on the status of your refund after
            inspecting the item.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Inspection takes 1-2 business days upon receipt</li>
            <li>Approved refunds are processed within 5-7 business days</li>
            <li>Refunds are issued to the original payment method</li>
            <li>You will receive an email confirmation when your refund is processed</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Exchanges</h2>
          <p className="text-gray-700 mb-4">
            We only replace items if they are defective or damaged. If you need to exchange it for
            the same item, send us an email at returns@exvolum.com and send your item to our
            returns center.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about our Returns & Refunds Policy, please contact us at:
          </p>
          <ul className="list-none text-gray-700 mt-4 space-y-2">
            <li><strong>Email:</strong> returns@exvolum.com</li>
            <li><strong>Phone:</strong> 1-800-EXVOLUM</li>
            <li><strong>Hours:</strong> Monday-Friday, 9 AM - 8 PM EST</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
