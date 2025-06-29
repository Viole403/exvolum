import { Container } from '@/components/layout/Container';

interface AboutSectionProps {
  children: React.ReactNode;
}

export function AboutSection({ children }: AboutSectionProps) {
  return (
    <Container>
      {children}
    </Container>
  );
}
