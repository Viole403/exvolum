import { useState, useCallback } from 'react';
import { 
  useForm, 
  type UseFormReturn,
  type SubmitHandler,
  type DefaultValues,
  type UseFormHandleSubmit,
  type FormState,
  type FieldValues,
  type UseFormSetValue,
  type UseFormGetValues,
  type UseFormWatch,
  type UseFormReset,
  type UseFormResetField,
  type UseFormSetError,
  type UseFormClearErrors,
  type UseFormTrigger,
  type UseFormUnregister,
  type Control
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// Define the form schema with Zod
export const articleFormSchema = z.object({
  title: z.string().min(5, {
    message: 'Title must be at least 5 characters.',
  }),
  slug: z.string().min(3, {
    message: 'Slug must be at least 3 characters.',
  }),
  excerpt: z.string().optional(),
  content: z.string().min(10, {
    message: 'Content must be at least 10 characters.',
  }),
  published: z.boolean().default(false),
  tags: z.string().optional(),
});

export type ArticleFormValues = z.infer<typeof articleFormSchema>;

interface UseArticleFormOptions {
  onSuccess?: (data: ArticleFormValues) => void;
  onError?: (error: Error) => void;
  redirectPath?: string;
  defaultValues?: Partial<ArticleFormValues>;
}

type FormMethods = Omit<UseFormReturn<ArticleFormValues>, 'handleSubmit' | 'formState'> & {
  handleSubmit: UseFormHandleSubmit<ArticleFormValues>;
  formState: FormState<ArticleFormValues>;
  getFieldState: UseFormReturn<ArticleFormValues>['getFieldState'];
  setFocus: UseFormReturn<ArticleFormValues>['setFocus'];
  subscribe: UseFormReturn<ArticleFormValues>['subscribe'];
};

interface UseArticleFormReturn {
  form: FormMethods;
  isLoading: boolean;
  onSubmit: SubmitHandler<ArticleFormValues>;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  generateSlug: (title: string) => string;
}

export function useArticleForm({
  onSuccess,
  onError,
  redirectPath = '/dashboard/articles',
  defaultValues = {},
}: UseArticleFormOptions = {}): UseArticleFormReturn {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleFormSchema) as any,
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      published: false,
      tags: '',
      ...defaultValues,
    } as DefaultValues<ArticleFormValues>,
  });

  // Destructure all form methods
  const { 
    control,
    register,
    handleSubmit: formHandleSubmit,
    formState,
    setValue,
    getValues,
    watch,
    reset,
    resetField,
    setError: setFormError,
    clearErrors,
    trigger,
    unregister
  } = form;

  const generateSlug = useCallback((title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-');
  }, []);

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = generateSlug(title);
    setValue('slug', slug, { shouldValidate: true });
  }, [generateSlug, setValue]);

  const onSubmit: SubmitHandler<ArticleFormValues> = useCallback(async (data: ArticleFormValues) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/dashboard/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create article');
      }

      const result = await response.json();
      
      toast.success('Article created successfully');
      
      if (redirectPath) {
        router.push(redirectPath);
      }
      
      onSuccess?.(result);
    } catch (error) {
      console.error('Error creating article:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create article');
      onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [onSuccess, onError, redirectPath, router]);

  const formMethods = {
    control,
    register,
    handleSubmit: formHandleSubmit,
    formState,
    setValue,
    getValues,
    watch,
    reset,
    resetField,
    setError: setFormError,
    clearErrors,
    trigger,
    unregister,
    getFieldState: form.getFieldState,
    setFocus: form.setFocus,
    subscribe: form.subscribe,
  };

  return {
    form: formMethods,
    isLoading,
    onSubmit,
    handleTitleChange,
    generateSlug,
  };
}
