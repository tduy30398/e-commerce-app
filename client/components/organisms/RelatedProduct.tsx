import React from 'react';
import ProductCard from '../molecules/ProductCard';
import { ProductTypes } from '@/actions/product/type';
import { cn } from '@/lib/utils';

interface RelatedProductProps {
  products: ProductTypes[];
  title?: string;
  className?: string;
}

const RelatedProduct = ({ products, title, className }: RelatedProductProps) => {
  return (
    <div className={cn('flex flex-col items-center w-full', className)}>
      {title && <h2 className="text-2xl md:text-5xl font-extrabold uppercase">{title}</h2>}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 gap-x-3 lg:gap-2 mt-8 md:mt-14 mb-9 w-full">
        {products?.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products available.
          </p>
        )}
      </div>
    </div>
  );
};

export default RelatedProduct;
