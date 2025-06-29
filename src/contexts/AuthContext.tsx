'use client';

import React, { createContext, useContext } from 'react';
import { useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from 'next-auth/react';
import { Session } from 'next-auth';

interface AuthContextType {
  session: Session | null;
  user: Session['user'] & { role?: string } | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error?: string }>;
  register: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error?: string }>;
  signInWithCredentials: (email: string, password: string) => Promise<{ error?: string }>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  signOut: async () => {},
  signIn: async () => ({}),
  signUp: async () => ({}),
  register: async () => ({}),
  signInWithCredentials: async () => ({}),
  signInWithGoogle: async () => {},
  signInWithApple: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const signOut = async () => {
    await nextAuthSignOut();
  };

  const signIn = async (email: string, password: string) => {
    try {
      const result = await nextAuthSignIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        return { error: 'Invalid credentials' };
      }

      return {};
    } catch (error) {
      return { error: 'An error occurred during sign in' };
    }
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      // Check if user already exists
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || 'Registration failed' };
      }

      // Automatically sign in after successful registration
      return signIn(email, password);
    } catch (error) {
      return { error: 'An error occurred during registration' };
    }
  };  const signInWithGoogle = async () => {
    try {
      await nextAuthSignIn('google', {
        callbackUrl: '/',
        redirect: true
      });
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  const signInWithApple = async () => {
    try {
      await nextAuthSignIn('apple', {
        callbackUrl: '/',
        redirect: true
      });
    } catch (error) {
      console.error('Apple sign in error:', error);
    }
  };

  // Alias methods for consistency with auth pages
  const register = signUp;
  const signInWithCredentials = signIn;
  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user || null,
        loading,
        signOut,
        signIn,
        signUp,
        register,
        signInWithCredentials,
        signInWithGoogle,
        signInWithApple,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
