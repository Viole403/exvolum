'use client'

import { useEffect, useState } from 'react';

export function AboutStorySection() {
  const [story, setStory] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/about')
      .then((res) => res.json())
      .then((data) => {
        setStory(data.story);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="h-64 w-full rounded-xl bg-gray-100 animate-pulse mb-16" />;
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{story.heading}</h2>
        <div className="space-y-4 text-gray-600">
          <p>{story.content}</p>
        </div>
      </div>
      {/* Optionally, you can add an image here if you add it to the API */}
    </div>
  );
}
