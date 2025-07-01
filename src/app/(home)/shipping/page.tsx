'use client';

import {
  Section,
  ShippingSection,
  ShippingInfoSection
} from '@/components';

export default function Shipping() {
  return (
    <>
      <Section background="white" className="py-16">
        <ShippingSection
          showBackButton={true}
          backButtonText="Back to Help Center"
          backButtonHref="/help"
        >
          <ShippingInfoSection />
        </ShippingSection>
      </Section>
    </>
  );
}