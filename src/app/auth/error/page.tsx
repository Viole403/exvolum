'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft } from 'lucide-react';

const errorMessages = {
  OAuthAccountNotLinked: 'An account with this email already exists. Please sign in with your original method.',
  CredentialsSignin: 'Invalid email or password. Please check your credentials and try again.',
  EmailSignin: 'Unable to send email. Please try again later.',
  CallbackRouteError: 'Authentication failed. Please try again.',
  default: 'An unexpected error occurred during authentication. Please try again.',
};

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') as keyof typeof errorMessages;

  const errorMessage = errorMessages[error] || errorMessages.default;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold text-gray-900 mb-8 inline-block">
            Exvolum
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Error</h2>
          <p className="text-gray-600">There was a problem signing you in</p>
        </div>

        <Card>
          <CardContent className="p-8">
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>

            {error === 'OAuthAccountNotLinked' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  It looks like you already have an account with this email address.
                  You can either:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Sign in with your email and password</li>
                  <li>Or use the same social provider you used before</li>
                </ul>
              </div>
            )}

            <div className="space-y-4 mt-6">
              <Button asChild className="w-full">
                <Link href="/auth/login">Try Again</Link>
              </Button>

              <Button variant="outline" asChild className="w-full">
                <Link href="/auth/register">Create New Account</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
