'use client';

import { Section, CartSection } from '@/components';

export default function Cart() {
  return (
    <>
      <Section background="gray" className="py-8">
        <CartSection />
      </Section>
    </>
  );
}