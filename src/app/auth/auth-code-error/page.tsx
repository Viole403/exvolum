'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function AuthCodeError() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold text-gray-900 mb-8 inline-block">
            Exvolum
          </Link>
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-16 w-16 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Error</h2>
          <p className="text-gray-600">
            There was an error processing your authentication request.
          </p>
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-red-800">
                      Authentication Failed
                    </h3>
                    <p className="mt-2 text-sm text-red-700">
                      The authentication code is invalid or has expired. This could happen if:
                    </p>
                    <ul className="mt-2 text-sm text-red-700 list-disc list-inside space-y-1">
                      <li>The link has already been used</li>
                      <li>The link has expired</li>
                      <li>There was a network error</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">What you can do:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Try signing in again with your email and password
                  </li>
                  <li className="flex items-start">
                    <span className="block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Request a new password reset if you forgot your password
                  </li>
                  <li className="flex items-start">
                    <span className="block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Contact support if the problem persists
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col space-y-3">
          <Button asChild className="w-full bg-black hover:bg-gray-800 text-white">
            <Link href="/auth/login">
              Try Signing In Again
            </Link>
          </Button>

          <Button variant="outline" asChild className="w-full">
            <Link href="/auth/reset-password">
              Reset Password
            </Link>
          </Button>

          <Button variant="ghost" asChild className="w-full">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <Link href="/contact" className="text-blue-600 hover:underline font-medium">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
