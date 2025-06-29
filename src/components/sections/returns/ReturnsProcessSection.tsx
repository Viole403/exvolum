import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, FileText, Truck, CheckCircle } from 'lucide-react';

export function ReturnsProcessSection() {
  const steps = [
    {
      icon: FileText,
      title: "Initiate Return",
      description: "Log into your account and select 'Return Items' next to your order, or contact our support team."
    },
    {
      icon: Package,
      title: "Package Items",
      description: "Pack items securely in original packaging with all tags and accessories included."
    },
    {
      icon: Truck,
      title: "Ship Return",
      description: "Use the prepaid return label we provide or drop off at any authorized shipping location."
    },
    {
      icon: CheckCircle,
      title: "Get Refund",
      description: "Once we receive and inspect your return, we'll process your refund within 5-7 business days."
    }
  ];

  return (
    <div className="bg-gray-50 rounded-2xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Return Items</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Follow these simple steps to return your items and get a full refund.
          Our return process is designed to be quick and hassle-free.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {steps.map((step, index) => (
          <Card key={index} className="text-center relative">
            <CardContent className="p-6">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <step.icon className="h-12 w-12 text-blue-600 mx-auto mb-4 mt-4" />
              <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
          Start a Return
        </Button>
        <p className="text-gray-500 text-sm mt-4">
          Need help? Contact our support team at 1-800-EXVOLUM
        </p>
      </div>
    </div>
  );
}
