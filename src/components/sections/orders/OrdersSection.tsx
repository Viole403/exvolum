import { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Container } from '../../layout/Container';

interface OrdersSectionProps {
  children: ReactNode;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
  title?: string;
  subtitle?: string;
}

export function OrdersSection({
  children,
  showBackButton = true,
  backButtonText = "Back to Account",
  backButtonHref = "/account",
  title,
  subtitle
}: OrdersSectionProps) {
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
      {title && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          {subtitle && (
            <p className="text-gray-600">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </Container>
  );
}
