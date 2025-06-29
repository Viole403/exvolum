import { Container } from '@/components/layout/Container';

interface ContactSectionProps {
  children: React.ReactNode;
}

export function ContactSection({ children }: ContactSectionProps) {
  return (
    <Container>
      {children}
    </Container>
  );
}
