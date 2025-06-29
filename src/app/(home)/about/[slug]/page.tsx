import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Await the params Promise
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/about/team/${slug}`, {
    cache: 'no-store',
  });
  if (!res.ok) return notFound();
  const member = await res.json();

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center py-16 px-4">
      <div className="max-w-lg w-full mx-auto">
        <div className="flex flex-col items-center mb-8">
          <img
            src={member.image}
            alt={member.name}
            className="w-32 h-32 rounded-full object-cover mb-4 border"
          />
          <h1 className="text-3xl font-bold mb-2 text-center">{member.name}</h1>
          <p className="text-blue-600 font-medium mb-4 text-center">{member.role}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 shadow text-gray-800 mb-8">
          <p className="whitespace-pre-line text-lg">{member.description}</p>
        </div>
        <div className="text-center">
          <Link href="/about" className="text-blue-600 hover:underline">&larr; Back to Team</Link>
        </div>
      </div>
    </main>
  );
}