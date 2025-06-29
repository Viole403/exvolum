'use client';

import {
  PageLayout,
  Section,
  AboutSection,
  AboutHeroSection,
  AboutStorySection,
  AboutValuesSection,
  AboutTeamSection
} from '@/components';

export default function About() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <Section background="white" className="pt-24 pb-16">
        <AboutSection>
          <AboutHeroSection />
        </AboutSection>
      </Section>

      {/* Story Section */}
      <Section background="gray" className="py-16">
        <AboutSection>
          <AboutStorySection />
        </AboutSection>
      </Section>

      {/* Values Section */}
      <Section background="white" className="py-16">
        <AboutSection>
          <AboutValuesSection />
        </AboutSection>
      </Section>

      {/* Team Section */}
      <Section background="gray" className="py-16">
        <AboutSection>
          <AboutTeamSection />
        </AboutSection>
      </Section>
    </PageLayout>
  );
}