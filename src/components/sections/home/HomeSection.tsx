import { ReactNode } from 'react';
import { Container } from '@/components/layout/Container';

interface HomeSectionProps {
  children: ReactNode;
}

export function HomeSection({ children }: HomeSectionProps) {
  return (
    <Container>
      {children}
    </Container>
  );
}
