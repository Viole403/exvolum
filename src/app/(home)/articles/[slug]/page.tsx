import { notFound } from 'next/navigation';
import { Section } from '@/components';
import Link from 'next/link';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Await the params Promise
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/article/${slug}`, {
    cache: 'no-store',
  });
  if (!res.ok) return notFound();
  const article = await res.json();

  return (
    <>
      <Section background="white" className="py-16">
        <div className="max-w-2xl w-full mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 text-center">{article.title}</h1>
            <p className="text-gray-500 text-center mb-2">By {article.author} &middot; {new Date(article.publishedAt).toLocaleDateString()}</p>
            {article.image && (
              <img src={article.image} alt={article.title} className="w-full h-64 object-cover rounded mb-6" />
            )}
          </div>
          <article className="prose prose-lg max-w-none mb-8">
            <p>{article.content}</p>
          </article>
          <div className="text-center">
            <Link href="/articles" className="text-blue-600 hover:underline">&larr; Back to Articles</Link>
          </div>
        </div>
      </Section>
    </>
  );
}