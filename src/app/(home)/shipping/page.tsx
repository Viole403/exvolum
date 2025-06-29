'use client';

import {
  PageLayout,
  Section,
  ShippingSection,
  ShippingInfoSection
} from '@/components';

export default function Shipping() {
  return (
    <PageLayout>
      <Section background="white" className="py-16">
        <ShippingSection
          showBackButton={true}
          backButtonText="Back to Help Center"
          backButtonHref="/help"
        >
          <ShippingInfoSection />
        </ShippingSection>
      </Section>
    </PageLayout>
  );
}