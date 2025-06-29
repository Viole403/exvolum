'use client';

import { PageLayout, Section } from '@/components';
import { ArticlesHeroSection, ArticlesListSection } from '@/components/sections/articles';

export default function Articles() {
  return (
    <PageLayout>
      <Section background="white" className="py-16">
        <ArticlesHeroSection />
      </Section>
      <Section background="gray" className="py-16">
        <ArticlesListSection />
      </Section>
    </PageLayout>
  );
}