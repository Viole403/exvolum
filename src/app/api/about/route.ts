import { NextResponse } from 'next/server';

// Example static content for About page sections. Replace with DB fetch if you add About content to the DB.
export async function GET() {
  const aboutContent = {
    hero: {
      title: 'About Exvolum',
      subtitle: 'Exceptional experiences, curated for you.',
      image: '/images/about-hero.jpg',
    },
    story: {
      heading: 'Our Story',
      content: 'Exvolum was founded to bring quality and inspiration to your home. Our team is passionate about design, quality, and customer experience.',
    },
    values: [
      {
        title: 'Quality',
        description: 'We source only the best products and partners.'
      },
      {
        title: 'Customer Focus',
        description: 'Your satisfaction is our top priority.'
      },
      {
        title: 'Innovation',
        description: 'We are always looking for new ways to delight you.'
      }
    ]
  };
  return NextResponse.json(aboutContent);
}
