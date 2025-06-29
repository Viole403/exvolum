import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Session } from 'next-auth';

const adminRoutes = ['/dashboard'];

export default auth((req) => {
  const request = req as NextRequest & { auth: Session | null };
  const { pathname } = request.nextUrl;
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

  // If it's not an admin route, continue
  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const session = request.auth;
  const isAdmin = (session?.user as any)?.role === 'ADMIN';

  // Redirect to login if not authenticated
  if (!session) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to home if not admin
  if (!isAdmin) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/auth (NextAuth.js API routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/auth|auth/.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}