import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from './lib/constants';

const protectedRoutes = ['/profile'];
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken');

  const { pathname } = request.nextUrl;

  if (
    !refreshToken &&
    (protectedRoutes.includes(pathname) || pathname.startsWith('/admin'))
  ) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  if (refreshToken && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/login', '/register', '/admin/:path*'],
};
