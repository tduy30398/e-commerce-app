import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from './lib/constants';
import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from './i18n/routing';

const protectedRoutes = [ROUTES.PROFILE, ROUTES.PROFILE_OAUTH];
const authRoutes = [ROUTES.LOGIN, ROUTES.REGISTER];

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: false,
});

export function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const { pathname } = request.nextUrl;
  const segments = pathname.split('/');
  const locale = locales.includes(segments[1]) ? segments[1] : defaultLocale;
  const route = locale ? `/${segments.slice(2).join('/')}` : pathname;

  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  const refreshToken = request.cookies.get('refreshToken');
  const isLogged = Boolean(refreshToken);

  if (!isLogged && protectedRoutes.includes(route)) {
    return NextResponse.redirect(
      new URL(`/${locale}${ROUTES.LOGIN}`, request.url)
    );
  }

  if (isLogged && authRoutes.includes(route)) {
    return NextResponse.redirect(
      new URL(`/${locale}${ROUTES.HOME}`, request.url)
    );
  }

  return response ?? NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
