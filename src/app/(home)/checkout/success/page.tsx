'use client';

import { PageLayout, Section, CheckoutSuccessSection } from '@/components';

export default function CheckoutSuccess() {
  return (
    <PageLayout>
      <Section background="gray" className="py-16">
        <CheckoutSuccessSection />
      </Section>
    </PageLayout>
  );
}
