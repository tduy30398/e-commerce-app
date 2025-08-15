import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from './lib/constants';
import { getToken } from "next-auth/jwt";

const protectedRoutes = ['/profile'];
const authRoutes = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  const refreshToken = request.cookies.get('refreshToken');

  const isLogged = refreshToken || token;

  const { pathname } = request.nextUrl;

  if (
    !isLogged &&
    (protectedRoutes.includes(pathname) || pathname.startsWith('/admin'))
  ) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  if (isLogged && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/login', '/register', '/admin/:path*'],
};
