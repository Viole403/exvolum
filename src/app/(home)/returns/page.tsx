'use client';

import {
  PageLayout,
  Section,
  ReturnsSection,
  ReturnsPolicySection,
  ReturnsProcessSection
} from '@/components';

export default function Returns() {
  return (
    <PageLayout>
      <Section background="white" className="py-16">        <ReturnsSection
          showBackButton={true}
          backButtonText="Back to Help Center"
          backButtonHref="/help"
        >
          <ReturnsPolicySection />
        </ReturnsSection>
      </Section>

      <Section background="gray">
        <ReturnsProcessSection />
      </Section>
    </PageLayout>
  );
}