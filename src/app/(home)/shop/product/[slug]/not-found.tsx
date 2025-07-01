
import { Button } from '@/components/ui/button';
import { ArrowLeft, Package } from 'lucide-react';
import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center">
        <Package className="h-24 w-24 mx-auto mb-6 text-gray-400" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Sorry, we couldn't find the product you're looking for. It may have been removed or the link might be incorrect.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/shop">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shop
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              Go to Homepage
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
