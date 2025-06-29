'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(false);
    setError('');
    if (!password || !confirm) {
      setError('Please fill in both fields.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 800);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white py-16 px-4">
      <div className="max-w-md w-full mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Set New Password</h1>
        <p className="text-gray-700 mb-6">Enter your new password below.</p>
        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="password"
            className="w-full px-4 py-2 border rounded mb-4"
            placeholder="New password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full px-4 py-2 border rounded mb-4"
            placeholder="Confirm new password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            Update Password
          </button>
        </form>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {submitted && (
          <div className="text-green-700 mb-4">Your password has been updated. You can now <Link href="/auth/login" className="underline">log in</Link>.</div>
        )}
        <Link href="/auth/login" className="text-blue-600 hover:underline">&larr; Back to Login</Link>
      </div>
    </main>
  );
}
