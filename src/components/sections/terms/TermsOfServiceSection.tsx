'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfServiceSection() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-600">
          Last updated: June 24, 2025
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
          <p className="text-gray-700 mb-4">
            By accessing and using Exvolum's website and services, you accept and agree to be bound by the terms
            and provision of this agreement. These Terms of Service ("Terms") govern your use of our website,
            products, and services.
          </p>
          <p className="text-gray-700 mb-4">
            If you do not agree to abide by the above, please do not use this service. We reserve the right to
            change these terms at any time, and your continued use of the site will signify your acceptance of
            any adjustment to these terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Use License</h2>
          <p className="text-gray-700 mb-4">
            Permission is granted to temporarily download one copy of the materials on Exvolum's website for
            personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer
            of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
          </ul>
          <p className="text-gray-700 mb-4">
            This license shall automatically terminate if you violate any of these restrictions and may be
            terminated by us at any time. Upon terminating your viewing of these materials or upon the
            termination of this license, you must destroy any downloaded materials in your possession.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Product Information and Availability</h2>
          <p className="text-gray-700 mb-4">
            We strive to ensure that all product information on our website is accurate and up-to-date. However,
            we do not warrant that product descriptions, pricing, or other content is accurate, complete, reliable,
            current, or error-free.
          </p>
          <p className="text-gray-700 mb-4">
            All products are subject to availability. We reserve the right to discontinue any product at any time
            and to limit the quantity of any product or service that we offer.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Pricing and Payment</h2>
          <p className="text-gray-700 mb-4">
            All prices displayed on our website are in USD and are subject to change without notice. We reserve
            the right to correct any pricing errors, even after an order has been placed.
          </p>
          <p className="text-gray-700 mb-4">
            Payment must be received by us before we ship your order. We accept various payment methods as
            indicated during checkout. All payments are processed securely through our payment partners.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping and Delivery</h2>
          <p className="text-gray-700 mb-4">
            We will arrange for shipment of products to you. Please check the individual product pages for
            specific delivery information. Delivery dates are estimates only and we cannot guarantee delivery
            by any particular date.
          </p>
          <p className="text-gray-700 mb-4">
            Risk of loss and title for products purchased from us pass to you upon delivery of the products
            to the carrier. Shipping and handling charges are non-refundable.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Returns and Refunds</h2>
          <p className="text-gray-700 mb-4">
            We want you to be completely satisfied with your purchase. If you are not satisfied, you may return
            most items within 30 days of delivery for a full refund, subject to our return policy.
          </p>
          <p className="text-gray-700 mb-4">
            Items must be returned in their original condition and packaging. Custom or personalized items may
            not be eligible for return. Please see our detailed <Link href="/returns" className="text-blue-600 hover:underline">Return Policy</Link> for more information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Accounts</h2>
          <p className="text-gray-700 mb-4">
            When you create an account with us, you must provide information that is accurate, complete, and current
            at all times. You are responsible for safeguarding the password and for maintaining the confidentiality
            of your account.
          </p>
          <p className="text-gray-700 mb-4">
            You agree not to disclose your password to any third party and to take sole responsibility for any
            activities or actions under your account, whether or not you have authorized such activities.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Prohibited Uses</h2>
          <p className="text-gray-700 mb-4">
            You may not use our products or services:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
            <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
            <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
            <li>To submit false or misleading information</li>
            <li>To upload or transmit viruses or any other type of malicious code</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimer</h2>
          <p className="text-gray-700 mb-4">
            The information on this website is provided on an "as is" basis. To the fullest extent permitted by law,
            this company excludes all representations, warranties, conditions and terms whether express, implied,
            statutory or otherwise.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitations of Liability</h2>
          <p className="text-gray-700 mb-4">
            In no event shall Exvolum or its suppliers be liable for any damages (including, without limitation,
            damages for loss of data or profit, or due to business interruption) arising out of the use or inability
            to use the materials on our website, even if we have been notified orally or in writing of the possibility
            of such damage.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law</h2>
          <p className="text-gray-700 mb-4">
            These terms and conditions are governed by and construed in accordance with the laws of the United States
            and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-2"><strong>Email:</strong> legal@exvolum.com</p>
            <p className="text-gray-700 mb-2"><strong>Phone:</strong> (555) 123-4567</p>
            <p className="text-gray-700">
              <strong>Address:</strong> 123 Artisan Way, Craftsville, CS 12345
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
