'use client';

import { PageLayout, Section, PrivacyPolicySection } from '@/components';

export default function PrivacyPolicy() {
  return (
    <PageLayout>
      <Section background="white" className="py-12">
        <PrivacyPolicySection />
      </Section>
    </PageLayout>
  );
}
