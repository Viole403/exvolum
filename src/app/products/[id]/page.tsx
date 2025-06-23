'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Minus, Plus, Star, Heart, Share2 } from 'lucide-react';
import { useParams } from 'next/navigation';

const productData = {
  1: {
    id: 1,
    name: "Premium Artisan Collection",
    price: 10.99,
    image: "https://images.pexels.com/photos/1232594/pexels-photo-1232594.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Experience the pinnacle of craftsmanship with our Premium Artisan Collection. Each piece is meticulously handcrafted by skilled artisans using traditional techniques passed down through generations.",
    details: "This exceptional product represents the perfect blend of traditional craftsmanship and modern design sensibilities. Made from the finest materials and finished to perfection.",
    category: "Premium",
    inStock: true,
    rating: 4.9,
    reviews: 127
  },
  2: {
    id: 2,
    name: "Natural Elements Series",
    price: 15.99,
    image: "https://images.pexels.com/photos/1191458/pexels-photo-1191458.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Discover the beauty of nature captured in our Natural Elements Series. These carefully curated pieces bring the essence of the outdoors into your space.",
    details: "Sourced from sustainable materials and crafted with environmental consciousness, this collection represents our commitment to both quality and sustainability.",
    category: "Natural",
    inStock: true,
    rating: 4.8,
    reviews: 89
  },
  3: {
    id: 3,
    name: "Fresh Harvest Collection",
    price: 12.99,
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Our Fresh Harvest Collection celebrates the abundance of nature with vibrant, fresh selections that bring energy and vitality to your daily routine.",
    details: "Each item in this collection is carefully selected at peak freshness and quality, ensuring you receive only the best nature has to offer.",
    category: "Fresh",
    inStock: true,
    rating: 4.7,
    reviews: 156
  }
};

const relatedProducts = [
  {
    id: 2,
    name: "Natural Elements",
    price: 15.99,
    image: "https://images.pexels.com/photos/1191458/pexels-photo-1191458.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Beautiful natural collection"
  },
  {
    id: 4,
    name: "Signature Blend",
    price: 18.99,
    image: "https://images.pexels.com/photos/1833769/pexels-photo-1833769.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Our bestselling signature item"
  },
  {
    id: 5,
    name: "Gourmet Selection",
    price: 22.99,
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Premium gourmet experience"
  },
  {
    id: 6,
    name: "Classic Heritage",
    price: 14.99,
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Time-tested traditional recipe"
  }
];

export default function ProductDetail() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const product = productData[productId as keyof typeof productData];
  
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Button asChild>
            <Link href="/shop">Back to Shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

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
          <Button variant="default" className="bg-black hover:bg-gray-800 text-white">
            Cart (0)
          </Button>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="px-6 py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-gray-900">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                    {product.category}
                  </span>
                  {product.inStock && (
                    <span className="text-sm bg-green-100 px-3 py-1 rounded-full text-green-600">
                      In Stock
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-6">${product.price}</p>
                <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 text-center min-w-[60px]">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-black hover:bg-gray-800 text-white py-3"
                    size="lg"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="px-4"
                  >
                    <Heart
                      className={`h-5 w-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`}
                    />
                  </Button>
                  <Button variant="outline" className="px-4">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Additional Details */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Details</h3>
                <p className="text-gray-600 leading-relaxed">{product.details}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{relatedProduct.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">${relatedProduct.price}</span>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/products/${relatedProduct.id}`}>View</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Exvolum</h3>
              <p className="text-gray-300">Premium products for modern living</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/shop" className="hover:text-white">Shop</Link></li>
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/shipping" className="hover:text-white">Shipping Info</Link></li>
                <li><Link href="/returns" className="hover:text-white">Returns</Link></li>
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