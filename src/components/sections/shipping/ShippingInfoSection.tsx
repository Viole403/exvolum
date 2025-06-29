import { Card, CardContent } from '@/components/ui/card';
import { Truck, Clock, Globe, Shield } from 'lucide-react';

export function ShippingInfoSection() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Shipping Information</h1>

      <p className="text-gray-600 mb-8">
        <strong>Last updated:</strong> June 24, 2025
      </p>

      {/* Shipping Options Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 not-prose">
        <Card className="text-center">
          <CardContent className="p-6">
            <Truck className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Free Standard</h3>
            <p className="text-gray-600 text-sm">
              3-5 business days on orders over $75
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Express</h3>
            <p className="text-gray-600 text-sm">
              1-2 business days for $15
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <Globe className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">International</h3>
            <p className="text-gray-600 text-sm">
              7-14 business days, rates vary
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <Shield className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Insured</h3>
            <p className="text-gray-600 text-sm">
              Full coverage on all shipments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information */}
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Domestic Shipping (US)</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-2 text-left">Shipping Method</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Delivery Time</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Cost</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Tracking</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Standard Shipping</td>
                  <td className="border border-gray-300 px-4 py-2">3-5 business days</td>
                  <td className="border border-gray-300 px-4 py-2">Free on orders $75+, otherwise $8.99</td>
                  <td className="border border-gray-300 px-4 py-2">✓ Included</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Express Shipping</td>
                  <td className="border border-gray-300 px-4 py-2">1-2 business days</td>
                  <td className="border border-gray-300 px-4 py-2">$14.99</td>
                  <td className="border border-gray-300 px-4 py-2">✓ Real-time</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Overnight Shipping</td>
                  <td className="border border-gray-300 px-4 py-2">Next business day</td>
                  <td className="border border-gray-300 px-4 py-2">$24.99</td>
                  <td className="border border-gray-300 px-4 py-2">✓ Real-time</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">International Shipping</h2>
          <p className="text-gray-700 mb-4">
            We currently ship to Canada and select European countries. International shipping
            rates are calculated based on destination, package weight, and selected shipping method.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Canada:</strong> 5-10 business days, starting at $19.99</li>
            <li><strong>Europe:</strong> 7-14 business days, starting at $29.99</li>
            <li><strong>Customs:</strong> Customer is responsible for any duties or taxes</li>
            <li><strong>Tracking:</strong> Full tracking provided for all international orders</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Processing Time</h2>
          <p className="text-gray-700 mb-4">
            All orders are processed within 1-2 business days. Orders placed on weekends or
            holidays will be processed the next business day.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Standard orders: Processed within 1-2 business days</li>
            <li>Custom/personalized items: Additional 3-5 business days</li>
            <li>Pre-order items: Ships according to expected availability date</li>
            <li>Holiday seasons: May require additional processing time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Tracking</h2>
          <p className="text-gray-700 mb-4">
            Once your order ships, you'll receive a confirmation email with tracking information.
            You can also track your order by logging into your account.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Tracking number provided via email</li>
            <li>Real-time updates through our website</li>
            <li>SMS notifications available upon request</li>
            <li>Delivery confirmation with signature (for express orders)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Restrictions</h2>
          <p className="text-gray-700 mb-4">
            Some items may have shipping restrictions due to size, weight, or regulatory requirements:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Oversized items may require special handling fees</li>
            <li>Certain products cannot be shipped to PO Boxes</li>
            <li>Hazardous materials have specific shipping requirements</li>
            <li>Some items may not be available for international shipping</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
