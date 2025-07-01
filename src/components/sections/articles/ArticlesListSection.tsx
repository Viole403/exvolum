'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, Clock } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination';

interface ArticlesListSectionProps {
  searchQuery: string;
  selectedCategory: string;
  selectedTag: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function ArticlesListSection({
  searchQuery,
  selectedCategory,
  selectedTag,
  currentPage,
  setCurrentPage,
}: ArticlesListSectionProps) {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.append('query', searchQuery);
        if (selectedCategory !== 'all') params.append('category', selectedCategory);
        if (selectedTag !== 'all') params.append('tags', selectedTag);
        params.append('page', currentPage.toString());
        params.append('pageSize', '6'); // Display 6 articles per page

        const res = await fetch(`/api/article?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch articles');
        const data = await res.json();
        setArticles(data.articles);
        setTotalPages(data.totalPages);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, [searchQuery, selectedCategory, selectedTag, currentPage]);

  const renderPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5; // Number of page links to show directly
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (startPage > 1) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink onClick={() => setCurrentPage(1)} isActive={1 === currentPage}>
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(<PaginationEllipsis key="ellipsis-start" />);
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <PaginationItem key={page}>
          <PaginationLink onClick={() => setCurrentPage(page)} isActive={page === currentPage}>
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<PaginationEllipsis key="ellipsis-end" />);
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => setCurrentPage(totalPages)} isActive={totalPages === currentPage}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  if (loading) return <div className="text-center py-12">Loading articles...</div>;
  if (error) return <div className="text-center py-12 text-red-600">Error: {error}</div>;
  if (!articles.length) return <div className="text-center py-12">No articles found matching your criteria.</div>;

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {articles.map((article) => (
          <Card key={article.slug} className="hover:shadow-lg transition-shadow flex flex-col">
            <Link href={`/articles/${article.slug}`} className="flex flex-col h-full">
              {article.image && (
                <div className="w-full h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardContent className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" /> {article.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> {new Date(article.publishedAt || article.createdAt).toLocaleDateString()}
                  </span>
                  {/* Assuming readTime is available or can be calculated */}
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {article.readTime || '5 min read'}
                  </span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} />
            {renderPaginationItems()}
            <PaginationNext onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} />
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}