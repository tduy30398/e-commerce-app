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
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import useSWR from 'swr';
import { getProductDetail } from '@/actions/product';

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const params = useParams<{ id: string }>();
  const pathSegments = pathname.split('/').filter(Boolean);

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
        pathname === '/' ? 'hidden' : ''
      )}
    >
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link className="text-base" href={ROUTES.HOME}>
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === pathSegments.length - 1;
          const isProductDetail =
            pathSegments[0] === 'product' && segment === params.id;

          let displayName: string;

          if (isProductDetail) {
            if (isLoading) {
              displayName = 'Loading...';
            } else {
              displayName = data?.product.name || segment || '';
            }
          } else {
            displayName = segment.charAt(0).toUpperCase() + segment.slice(1);
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
