import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function AboutHeroSection() {
  const [hero, setHero] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/about')
      .then((res) => res.json())
      .then((data) => {
        setHero(data.hero);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Skeleton className="h-64 w-full rounded-xl mb-16" />;
  }

  return (
    <div className="text-center mb-16">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        {hero.title}
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
        {hero.subtitle}
      </p>
      {hero.image && (
        <img src={hero.image} alt={hero.title} className="mx-auto rounded-lg shadow-lg max-h-80 object-cover mb-8" />
      )}
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">5+</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Years of Excellence</h3>
            <p className="text-gray-600 text-sm">
              Delivering quality products and exceptional service
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">50K+</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Happy Customers</h3>
            <p className="text-gray-600 text-sm">
              Trusted by customers worldwide
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">1K+</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Products</h3>
            <p className="text-gray-600 text-sm">
              Carefully curated selection of premium items
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
