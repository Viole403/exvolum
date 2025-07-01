'use client';

import { Section, CheckoutSuccessSection } from '@/components';

export default function CheckoutSuccess() {
  return (
    <>
      <Section background="gray" className="py-16">
        <CheckoutSuccessSection />
      </Section>
    </>
  );
}
