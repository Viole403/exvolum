import { ReactNode } from 'react';
import { Container } from './Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'gray' | 'dark';
}

export function Section({
  children,
  className = '',
  id,
  background = 'white'
}: SectionProps) {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-gray-900'
  };
  return (
    <section
      id={id}
      className={`py-12 px-4 sm:px-6 lg:px-8 ${backgroundClasses[background]} ${className}`}
    >
      {children}
    </section>
  );
}
