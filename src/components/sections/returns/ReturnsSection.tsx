import { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Container } from '../../layout/Container';

interface ReturnsSectionProps {
  children: ReactNode;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
}

export function ReturnsSection({
  children,
  showBackButton = true,
  backButtonText = "Back to Help Center",
  backButtonHref = "/help"
}: ReturnsSectionProps) {
  return (
    <Container size="lg">
      {showBackButton && (
        <Button variant="ghost" asChild className="mb-8">
          <Link href={backButtonHref}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {backButtonText}
          </Link>
        </Button>
      )}
      {children}
    </Container>
  );
}
