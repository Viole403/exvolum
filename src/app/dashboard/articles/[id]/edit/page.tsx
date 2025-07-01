'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm, type Control, type FieldPath, type FieldValues, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Icons } from '@/components/icons';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  slug: z.string().min(1, 'Slug is required').max(100).regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  excerpt: z.string().max(200).optional(),
  content: z.string().min(1, 'Content is required'),
  published: z.boolean().default(false),
  tags: z.string().optional(),
});

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  tags: string[];
  author: string;
  publishedAt: string | null;
};

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState<Article | null>(null);

  type FormValues = z.infer<typeof formSchema>;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any, // Type assertion to handle Zod schema type mismatch
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      published: false,
      tags: '',
    },
  });
  
  const { control, handleSubmit, formState, setValue, watch } = form;

  // Fetch article data
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        // In a real app, you would fetch the article data from your API
        // const response = await fetch(`/api/dashboard/articles/${params.id}`);
        // const data = await response.json();
        
        // Mock data for now
        const mockArticle: Article = {
          id: params.id as string,
          title: 'Getting Started with Next.js',
          slug: 'getting-started-with-nextjs',
          excerpt: 'Learn how to get started with Next.js',
          content: '# Getting Started with Next.js\n\nThis is a sample article content...',
          published: true,
          tags: ['nextjs', 'react', 'javascript'],
          author: 'John Doe',
          publishedAt: '2025-06-20T10:30:00Z',
        };
        
        setArticle(mockArticle);
        
        // Reset form with article data
        form.reset({
          title: mockArticle.title,
          slug: mockArticle.slug,
          excerpt: mockArticle.excerpt,
          content: mockArticle.content,
          published: mockArticle.published,
          tags: mockArticle.tags.join(', '),
        });
        
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchArticle();
    }
  }, [params.id, form]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setValue('slug', slug, { shouldValidate: true });
  };

  

  const onSubmit = handleSubmit(async (values: FormValues) => {
    try {
      setIsLoading(true);
      // In a real app, you would call your API endpoint here
      console.log('Updating article:', values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to articles list after successful update
      router.push('/dashboard/articles');
      toast.success('Article updated successfully');
    } catch (error) {
      console.error('Error saving article:', error);
      toast.error('Failed to update article');
    } finally {
      setIsLoading(false);
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">Article not found</h2>
        <p className="text-muted-foreground mt-2">
          The article you are looking for does not exist or you don't have permission to view it.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.push('/dashboard/articles')}
        >
          Back to Articles
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Article</h1>
        <p className="text-muted-foreground">
          Update the article details below
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter article title"
                        onChange={(e) => {
                          field.onChange(e);
                          handleTitleChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                          /blog/
                        </div>
                        <Input
                          className="pl-16"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="A short excerpt that summarizes the article"
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Write your article content here..."
                        className="min-h-[300px] font-mono text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-6">
              <div className="space-y-4 rounded-lg border p-4">
                <h3 className="font-medium">Publish</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <FormField
                      control={control}
                      name="published"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Published</FormLabel>
                            <FormDescription>
                              Published articles will be visible to all users.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Author</span>
                      <span>{article.author}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created at</span>
                      <span>
                        {article.publishedAt
                          ? new Date(article.publishedAt).toLocaleDateString()
                          : 'Draft'}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push('/dashboard/articles')}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Icons.save className="mr-2 h-4 w-4" />
                      )}
                      Update Article
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-lg border p-4">
                <h3 className="font-medium">Tags</h3>
                <FormField
                  control={control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="tag1, tag2, tag3"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Separate tags with commas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <h3 className="font-medium text-red-800">Danger Zone</h3>
                <p className="mt-2 text-sm text-red-700">
                  Once you delete an article, there is no going back. Please be certain.
                </p>
                <Button
                  type="button"
                  variant="destructive"
                  className="mt-4"
                  disabled={isLoading}
                  onClick={async () => {
                    if (confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
                      try {
                        setIsLoading(true);
                        // In a real app, you would call your API endpoint here
                        console.log('Deleting article:', article.id);
                        
                        // Simulate API call
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        
                        // Redirect to articles list after successful deletion
                        router.push('/dashboard/articles');
                      } catch (error) {
                        console.error('Error deleting article:', error);
                      } finally {
                        setIsLoading(false);
                      }
                    }
                  }}
                >
                  <Icons.trash2 className="mr-2 h-4 w-4" />
                  Delete Article
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
