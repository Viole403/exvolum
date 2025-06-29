import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function AboutValuesSection() {
  const [values, setValues] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/about')
      .then((res) => res.json())
      .then((data) => {
        setValues(data.values);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          These core principles guide everything we do and shape the experience we create for our customers.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values && values.map((value, index) => (
          <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {/* Optionally add an icon here if you add it to the API */}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
