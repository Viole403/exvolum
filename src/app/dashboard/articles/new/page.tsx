'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Control, type FieldPath, type FieldValues, Controller } from 'react-hook-form';
import * as z from "zod";
import { toast } from 'sonner';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Icons } from "@/components/icons";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  slug: z.string().min(3, {
    message: "Slug must be at least 3 characters.",
  }).regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  excerpt: z.string().max(200).optional(),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  published: z.boolean().default(false),
  tags: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Custom form field component with proper TypeScript types


export default function NewArticlePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  // Initialize form with default values and validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      published: false,
      tags: '',
    },
  });

  const { control, handleSubmit, setValue, formState } = form;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setValue('slug', slug, { shouldValidate: true });
  };

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);

      // In a real app, you would call your API endpoint here
      console.log('Creating article:', values);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success message and redirect
      toast.success('Article created successfully');
      router.push('/dashboard/articles');
    } catch (error) {
      console.error('Error creating article:', error);
      toast.error('Failed to create article');
    } finally {
      setIsLoading(false);
    }
  };

  // Wrap the submit handler with react-hook-form's handleSubmit
  const handleFormSubmit = handleSubmit(onSubmit);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">New Article</h2>
        <p className="text-muted-foreground">
          Create a new article for your blog.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={handleFormSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <Input
                  placeholder="Enter article title"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleTitleChange(e);
                  }}
                />
              )}
            />

            <FormField
              control={control}
              name="slug"
              render={({ field }) => (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                    /blog/
                  </div>
                  <Input
                    className="pl-16"
                    placeholder="article-slug"
                    {...field}
                  />
                </div>
              )}
            />
          </div>

          <FormField
            control={control}
            name="excerpt"
            render={({ field }) => (
              <Textarea
                placeholder="A brief summary of your article"
                className="min-h-[100px]"
                {...field}
                value={field.value || ''}
              />
            )}
          />

          <FormField
            control={control}
            name="content"
            render={({ field }) => (
              <Textarea
                placeholder="Write your article content here..."
                className="min-h-[300px] font-mono text-sm"
                {...field}
              />
            )}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4 rounded-lg border p-4">
              <h3 className="font-medium">Tags</h3>
              <FormField
                control={control}
                name="tags"
                render={({ field }) => (
                  <Input
                    placeholder="tag1, tag2, tag3"
                    {...field}
                    value={field.value || ''}
                  />
                )}
              />
              <p className="text-sm text-muted-foreground">
                Separate tags with commas
              </p>
            </div>

            <div className="space-y-4 rounded-lg border p-4">
              <h3 className="font-medium">Publish</h3>
              <FormField
                control={control}
                name="published"
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="published"
                      checked={field.value || false}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="published" className="text-sm font-medium leading-none">
                      Published
                    </Label>
                  </div>
                )}
              />
              <p className="text-sm text-muted-foreground">
                Published articles will be visible to all users.
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
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
              {isLoading ? 'Creating...' : 'Create Article'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
