'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { cn, formatKebabSegment, formattedCapitalize } from '@/lib/utils';
import useSWR from 'swr';
import { getProductDetail } from '@/actions/product';
import { ROUTES } from '@/lib/constants';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

const DynamicBreadcrumb = () => {
  const pathname = usePathname();
  const params = useParams<{ id?: string; locale?: string }>();
  const rawSegments = pathname.split('/').filter(Boolean);
  const t = useTranslations();

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
        rawSegments.length < 1 ? 'hidden' : null
      )}
    >
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link className="text-base" href={ROUTES.HOME}>
              {t('header.home')}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {rawSegments.map((segment, index) => {
          const href = `/${[params.locale, ...rawSegments.slice(0, index + 1)]
            .filter(Boolean)
            .join('/')}`;
          const isLast = index === rawSegments.length - 1;
          const isProductDetail =
            rawSegments[0] === 'product' && segment === params.id;

          let displayName: string;

          if (isProductDetail) {
            if (isLoading) {
              displayName = 'Loading...';
            } else {
              displayName =
                formattedCapitalize(data?.product.name || '') || segment || '';
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
};

export default DynamicBreadcrumb;
