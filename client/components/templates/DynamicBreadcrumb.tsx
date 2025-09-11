'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { cn, formatKebabSegment, formattedCapitalize, getRoute } from '@/lib/utils';
import useSWR from 'swr';
import { getProductDetail } from '@/actions/product';
import { ROUTES } from '@/lib/constants';
import { useLocale, useTranslations } from 'next-intl';

const SUPPORTED_LOCALES = ['en', 'es', 'fr'];

const DynamicBreadcrumb = () => {
  const pathname = usePathname();
  const params = useParams<{ id?: string; locale?: string }>();
  const rawSegments = pathname.split('/').filter(Boolean);
  const locale = useLocale();
  const t = useTranslations();

  const pathSegments = rawSegments.length > 0 && SUPPORTED_LOCALES.includes(rawSegments[0]) ? rawSegments.slice(1) : rawSegments;

  const { data, isLoading } = useSWR(
    params.id ? ['product-detail', params.id] : null,
    () => getProductDetail(params.id!),
    {
      revalidateOnFocus: false,
      refreshInterval: 0,
    }
  );

  return (
    <Breadcrumb
      className={cn(
        'section-container pt-6 border-t-[1px] border-gray-200',
        rawSegments.length < 2 ? 'hidden' : null
      )}
    >
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              className="text-base"
              href={getRoute(ROUTES.HOME, locale)}
            >
              {t('header.home')}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          const href = `/${[params.locale, ...pathSegments.slice(0, index + 1)]
            .filter(Boolean)
            .join('/')}`;
          const isLast = index === pathSegments.length - 1;
          const isProductDetail =
            pathSegments[0] === 'product' && segment === params.id;

          let displayName: string;

          if (isProductDetail) {
            if (isLoading) {
              displayName = 'Loading...';
            } else {
              displayName = formattedCapitalize(data?.product.name || '') || segment || '';
            }
          } else {
            displayName = formatKebabSegment(segment);
          }

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-base text-black">
                    {displayName}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link className="text-base" href={href}>
                      {displayName}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default DynamicBreadcrumb;
