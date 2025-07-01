'use client';

import {
  Section,
  HelpSection,
  FAQSection,
  ContactSupportSection
} from '@/components';

const faqCategories = [
  {
    title: "Orders & Shipping",
    questions: [
      {
        question: "How long does shipping take?",
        answer: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days."
      },
      {
        question: "Can I track my order?",
        answer: "Yes! Once your order ships, you'll receive a tracking number via email to monitor your package."
      },
      {
        question: "Do you ship internationally?",
        answer: "We currently ship to the US, Canada, and select European countries. International shipping takes 7-14 business days."
      }
    ]
  },
  {
    title: "Returns & Refunds",
    questions: [
      {
        question: "What is your return policy?",
        answer: "We offer 30-day returns for unused items in original packaging. Return shipping is free for defective items."
      },
      {
        question: "How do I start a return?",
        answer: "Visit your account page and select 'Return Items' next to your order, or contact our support team."
      },
      {
        question: "When will I receive my refund?",
        answer: "Refunds are processed within 5-7 business days after we receive your returned item."
      }
    ]
  },
  {
    title: "Account & Payment",
    questions: [
      {
        question: "How do I reset my password?",
        answer: "Click 'Forgot Password' on the login page and follow the instructions sent to your email."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay."
      },
      {
        question: "Is my payment information secure?",
        answer: "Yes, we use industry-standard encryption and never store your payment details on our servers."
      }
    ]
  }
];

export default function Help() {
  return (
    <>
      <Section background="white" className="py-16">
        <HelpSection>
          <FAQSection categories={faqCategories} />
          <ContactSupportSection />
        </HelpSection>
      </Section>
    </>
  );
}