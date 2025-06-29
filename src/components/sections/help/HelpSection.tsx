import { ReactNode } from 'react';
import { Container } from '../../layout/Container';

interface HelpSectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function HelpSection({
  children,
  title,
  subtitle,
  className = ''
}: HelpSectionProps) {
  return (
    <Container className={className}>
      {title && (
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </Container>
  );
}
