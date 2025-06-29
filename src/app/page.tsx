"use client";

import {
  PageLayout,
  Section,
  HeroSection,
  FeaturesSection,
  FeaturedProductsSection,
  NewsletterSection,
} from "@/components";

export default function Home() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <Section background="white" className="pt-24 pb-16">
        <HeroSection />
      </Section>

      {/* Features Section */}
      <Section background="gray" className="py-16">
        <FeaturesSection />
      </Section>

      {/* Featured Products */}
      <Section background="white" className="py-16">
        <FeaturedProductsSection />
      </Section>
    </PageLayout>
  );
}