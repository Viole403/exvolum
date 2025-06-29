'use client';

import { PageLayout, Section, TermsOfServiceSection } from '@/components';

export default function TermsOfService() {
  return (
    <PageLayout>
      <Section background="white" className="py-12">
        <TermsOfServiceSection />
      </Section>
    </PageLayout>
  );
}
