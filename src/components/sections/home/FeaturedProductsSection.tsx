import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const featuredProducts = [
  {
    id: 1,
    name: "Premium Collection Item",
    price: "$10.99",
    image: "https://images.pexels.com/photos/1232594/pexels-photo-1232594.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "High-quality artisan crafted piece"
  },
  {
    id: 2,
    name: "Natural Elements Set",
    price: "$15.99",
    image: "https://images.pexels.com/photos/1191458/pexels-photo-1191458.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Beautifully arranged natural collection"
  },
  {
    id: 3,
    name: "Signature Series",
    price: "$12.99",
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Our bestselling signature item"
  }
];

export function FeaturedProductsSection() {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
        <p className="text-xl text-gray-600">
          Discover our most popular items loved by customers worldwide
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProducts.map((product) => (
          <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-shadow overflow-hidden">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-3">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">{product.price}</span>
                <Button size="sm" asChild>
                  <Link href={`/products/${product.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-12">
        <Button variant="outline" size="lg" asChild>
          <Link href="/shop">View All Products</Link>
        </Button>
      </div>
    </div>
  );
}
