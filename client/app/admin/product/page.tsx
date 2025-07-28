import TableSkeleton from '@/components/molecules/TableSkeleton';
import ProductTable from '@/components/templates/ProductTable';
import { Suspense } from 'react';

export const metadata = {
  title: 'Product Dashboard',
};

const ProductDashboard = () => {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <ProductTable />
    </Suspense>
  );
};

export default ProductDashboard;
