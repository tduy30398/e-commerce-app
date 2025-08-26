import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from './lib/constants';
import { getToken } from 'next-auth/jwt';

const protectedRoutes = [ROUTES.PROFILE, ROUTES.PROFILE_OAUTH];
const authRoutes = [ROUTES.LOGIN, ROUTES.REGISTER];

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const refreshToken = request.cookies.get('refreshToken');

  const isLogged = Boolean(refreshToken || token);

  const { pathname } = request.nextUrl;

  if (!isLogged && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  if (isLogged && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/profile-oauth', '/login', '/register'],
};
