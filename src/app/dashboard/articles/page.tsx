import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { format } from 'date-fns';

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  published: boolean;
  publishedAt: string | null;
  author: {
    name: string | null;
    email: string | null;
  };
  tags: string[];
  updatedAt: string;
};

async function getArticles() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/dashboard/articles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    return (await response.json()) as Article[];
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
}

export default async function ArticlesPage() {
  const session = await auth();
  let articles: Article[] = [];
  let error: string | null = null;

  if (!session?.user) {
    redirect('/auth/login');
  }

  // This is a fallback, middleware should handle this
  if ((session.user as any)?.role !== 'ADMIN') {
    redirect('/');
  }

  try {
    articles = await getArticles();
  } catch (err) {
    console.error('Error fetching articles:', err);
    error = 'Failed to load articles. Please try again.';
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Articles</h1>
          <p className="text-muted-foreground">
            Manage your blog articles
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/articles/new">
            <Icons.plus className="mr-2 h-4 w-4" />
            New Article
          </Link>
        </Button>
      </div>

      {error ? (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Icons.alertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading articles</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.reload()}
                >
                  <Icons.refreshCw className="mr-2 h-4 w-4" />
                  Try again
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12">
          <Icons.fileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No articles</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new article.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/dashboard/articles/new">
                <Icons.plus className="-ml-1 mr-2 h-5 w-5" />
                New Article
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-md border">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Title
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Author
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Last Updated
                  </th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {articles.map((article) => (
                  <tr
                    key={article.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle font-medium">
                      <div className="flex items-center">
                        <span className="mr-2">
                          {article.published ? (
                            <Icons.checkCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Icons.draft className="h-4 w-4 text-yellow-500" />
                          )}
                        </span>
                        <Link 
                          href={`/dashboard/articles/${article.id}/edit`}
                          className="hover:underline"
                        >
                          {article.title}
                        </Link>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex flex-col">
                        <span className="font-medium">{article.author.name || 'Unknown'}</span>
                        <span className="text-xs text-muted-foreground">
                          {article.author.email || ''}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          article.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {article.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="space-y-1">
                        <div>
                          {format(new Date(article.updatedAt), 'MMM d, yyyy')}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {format(new Date(article.updatedAt), 'h:mm a')}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/blog/${article.slug}`} target="_blank">
                            <Icons.externalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/articles/${article.id}/edit`}>
                            <Icons.edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <form
                          action={`/api/dashboard/articles/${article.id}`}
                          method="POST"
                          onSubmit={async (e) => {
                            e.preventDefault();
                            if (confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
                              try {
                                const response = await fetch(`/api/dashboard/articles/${article.id}`, {
                                  method: 'DELETE',
                                });
                                
                                if (!response.ok) {
                                  throw new Error('Failed to delete article');
                                }
                                
                                // Refresh the page to show updated list
                                window.location.reload();
                              } catch (error) {
                                console.error('Error deleting article:', error);
                                alert('Failed to delete article. Please try again.');
                              }
                            }
                          }}
                        >
                          <Button 
                            type="submit"
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Icons.trash2 className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
