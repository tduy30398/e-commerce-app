import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'fr', 'es'];
export const defaultLocale = 'en';

export const routing = defineRouting({
  locales,
  defaultLocale,
});
