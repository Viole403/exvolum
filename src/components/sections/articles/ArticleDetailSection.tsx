'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, Clock, ArrowLeft, Share2, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ArticleDetailSectionProps {
  articleSlug: string;
}

export default function ArticleDetailSection({ articleSlug }: ArticleDetailSectionProps) {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticle() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/article/${articleSlug}`);
        if (!res.ok) throw new Error('Failed to fetch article');
        const data = await res.json();
        setArticle(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [articleSlug]);

  // TODO: Replace with real related articles from API or context
  const relatedArticles: any[] = [];

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;
  if (!article) return <div className="text-center py-12">Article Not Found</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Navigation */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/articles">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Link>
        </Button>
      </div>

      {/* Article Header */}
      <article className="mb-12">
        <div className="mb-8">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
              {article.category}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{article.readTime}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden mb-8">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {article.content.map((block: any, index: number) => {
            if (block.type === 'heading') {
              return (
                <h2 key={index} className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                  {block.text}
                </h2>
              );
            } else if (block.type === 'paragraph') {
              return (
                <p key={index} className="text-gray-700 mb-6 leading-relaxed">
                  {block.text}
                </p>
              );
            }
            return null;
          })}
        </div>
      </article>

      {/* Related Articles */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {relatedArticles.map((relatedArticle: any) => (
            <Card key={relatedArticle.id} className="hover:shadow-lg transition-shadow">
              <Link href={`/articles/${relatedArticle.slug}`}>
                <CardContent className="p-0">
                  <div className="w-full h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                    <img
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {relatedArticle.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{relatedArticle.readTime}</span>
                      <Button variant="link" className="p-0 h-auto text-blue-600">
                        Read More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
