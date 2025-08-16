import ProductPageSkeleton from '@/components/molecules/ProductPageSkeleton';
import ProductPage from '@/components/templates/ProductPage';
import { Suspense } from 'react';

export const metadata = {
  title: 'Product List',
};

const Product = () => {
  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <ProductPage />
    </Suspense>
  );
};

export default Product;
