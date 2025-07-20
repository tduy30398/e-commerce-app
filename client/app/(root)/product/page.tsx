import ProductPageSkeleton from '@/components/molecules/ProductPageSkeleton';
import ProductPage from '@/components/templates/ProductPage';
import { Suspense } from 'react';

const Product = () => {
  return (
    <div className="section-container mb-36">
      <Suspense fallback={<ProductPageSkeleton />}>
        <ProductPage />
      </Suspense>
    </div>
  );
};

export default Product;
