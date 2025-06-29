import { Container } from '@/components/layout/Container';

interface ArticlesSectionProps {
  children: React.ReactNode;
}

export function ArticlesSection({ children }: ArticlesSectionProps) {
  return (
    <Container>
      {children}
    </Container>
  );
}
