import TableSkeleton from '@/components/molecules/TableSkeleton';
import ProductTable from '@/components/templates/ProductTable';
import { redirect } from '@/i18n/navigation';
import { ROUTES } from '@/lib/constants';
import { getLocale } from 'next-intl/server';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

export const metadata = {
  title: 'Product Dashboard',
};

interface CookiesTypes {
  name?: string;
  value?: string;
}

const ProductDashboard = async () => {
  const locale = await getLocale();
  const cookieStore = await cookies();
  const refreshToken: CookiesTypes | undefined =
    cookieStore.get('refreshToken');

  if (!refreshToken) {
    redirect({ href: ROUTES.LOGIN, locale });
  }

  return (
    <Suspense fallback={<TableSkeleton />}>
      <ProductTable />
    </Suspense>
  );
};

export default ProductDashboard;
