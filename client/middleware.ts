import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from './lib/constants';
import { getToken } from 'next-auth/jwt';

const protectedRoutes = ['/profile'];
const authRoutes = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const refreshToken = request.cookies.get('refreshToken');

  const isLogged = Boolean(refreshToken || token);

  let path = request.nextUrl.pathname;

  if (path !== '/' && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  if (!isLogged && (protectedRoutes.includes(path) || path.startsWith('/admin'))) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  if (isLogged && authRoutes.includes(path)) {
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/login', '/register', '/admin', '/admin/:path*'],
};
