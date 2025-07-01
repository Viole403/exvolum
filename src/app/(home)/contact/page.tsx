'use client';

import {
  Section,
  ContactSection,
  ContactHeroSection,
  ContactMethodsSection,
  ContactFormSection
} from '@/components';

export default function Contact() {
  return (
    <>
      {/* Hero Section */}
      <Section background="white" className="pt-12 pb-8">
        <ContactSection>
          <ContactHeroSection />
        </ContactSection>
      </Section>

      {/* Contact Methods */}
      <Section background="gray" className="py-12">
        <ContactSection>
          <ContactMethodsSection />
        </ContactSection>
      </Section>

      {/* Contact Form */}
      <Section background="white" className="py-16">
        <ContactSection>
          <ContactFormSection />
        </ContactSection>
      </Section>
    </>
  );
}
