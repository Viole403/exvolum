'use client';

import { PageLayout, Section, CartSection } from '@/components';

export default function Cart() {
  return (
    <PageLayout>
      <Section background="gray" className="py-8">
        <CartSection />
      </Section>
    </PageLayout>
  );
}
