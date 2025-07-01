'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Section } from '@/components';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(false);
    setError('');
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 800);
  };

  return (
    <>
      <Section background="white" className="py-16">
        <div className="max-w-md w-full mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
          <p className="text-gray-700 mb-6">Enter your email address and we'll send you a link to reset your password.</p>
          <form onSubmit={handleSubmit} className="mb-6">
            <input
              type="email"
              className="w-full px-4 py-2 border rounded mb-4"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
            >
              Send Reset Link
            </button>
          </form>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          {submitted && (
            <div className="text-green-700 mb-4">If an account with that email exists, a reset link has been sent.</div>
          )}
          <Link href="/auth/login" className="text-blue-600 hover:underline">&larr; Back to Login</Link>
        </div>
      </Section>
    </>
  );
}
