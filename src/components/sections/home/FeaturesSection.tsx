import { Card, CardContent } from '@/components/ui/card';
import { Award, Truck, Users } from 'lucide-react';

export function FeaturesSection() {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Exvolum?</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We're committed to delivering exceptional experiences through quality, service, and innovation.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Award className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Premium Quality</h3>
            <p className="text-gray-600">
              Every product is carefully selected and tested to meet our high standards of quality and craftsmanship.
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <Truck className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast Delivery</h3>
            <p className="text-gray-600">
              Quick and reliable shipping to get your orders to you safely and on time, every time.
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Support</h3>
            <p className="text-gray-600">
              Our knowledgeable team is here to help you find the perfect products for your needs.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
