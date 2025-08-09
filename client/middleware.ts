import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/profile'];
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken');

  const { pathname } = request.nextUrl;

  if (
    !refreshToken &&
    (protectedRoutes.includes(pathname) || pathname.startsWith('/admin'))
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (refreshToken && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/login', '/register', '/admin/:path*'],
};
