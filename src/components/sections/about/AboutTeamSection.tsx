'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function AboutTeamSection() {
  const [teamMembers, setTeamMembers] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/about/team')
      .then((res) => res.json())
      .then((data) => {
        setTeamMembers(Array.isArray(data) ? data.slice(0, 8) : []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          The passionate people behind Exvolum who work every day to bring you the best products and experiences.
        </p>
      </div>
      <div className="grid md:grid-cols-4 gap-8">
        {loading && Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-xl" />
        ))}
        {!loading && teamMembers && teamMembers.map((member, index) => (
          <Link key={index} href={`/about/${member.slug}`} className="block">
            <Card className="border border-gray-200 shadow-none hover:shadow-md transition-shadow cursor-pointer h-full rounded-lg overflow-hidden">
              <CardContent className="p-4 text-center flex flex-col items-center">
                <div className="relative mb-4 w-28 h-28 rounded-full overflow-hidden border-2 border-gray-100 bg-gray-50 flex items-center justify-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-sm text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-xs line-clamp-3">{member.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
