import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from './lib/constants';
import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';

const protectedRoutes = [ROUTES.PROFILE, ROUTES.PROFILE_OAUTH];
const authRoutes = [ROUTES.LOGIN, ROUTES.REGISTER];

const locales = ['en', 'es', 'fr'];
const defaultLocale = 'en';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: false,
});

export async function middleware(request: NextRequest) {
  const intlResponse = await intlMiddleware(request);
  if (intlResponse) return intlResponse;

  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}`, request.url)
    );
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const refreshToken = request.cookies.get('refreshToken');

  const isLogged = Boolean(refreshToken || token);

  const segments = pathname.split('/');
  const locale = locales.includes(segments[1]) ? segments[1] : null;
  const route = locale ? `/${segments.slice(2).join('/')}` : pathname;

  if (!isLogged && protectedRoutes.includes(route)) {
    return NextResponse.redirect(
      new URL(`/${locale ?? defaultLocale}${ROUTES.LOGIN}`, request.url)
    );
  }

  if (isLogged && authRoutes.includes(route)) {
    return NextResponse.redirect(
      new URL(`/${locale ?? defaultLocale}${ROUTES.HOME}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
