import { Section } from '@/components';

export default function AuthCodeErrorPage() {
  return (
    <>
      <Section background="white" className="py-16">
        <div className="max-w-md w-full mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4 text-red-600">Authentication Code Error</h1>
          <p className="text-gray-700 mb-6">
            The authentication code you provided is invalid, expired, or has already been used.<br />
            Please request a new code or try logging in again.
          </p>
          <Link href="/auth/login" className="text-blue-600 hover:underline font-medium">
            &larr; Back to Login
          </Link>
        </div>
      </Section>
    </>
  );
}
