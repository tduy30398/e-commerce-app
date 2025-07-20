'use client';

import { getAllProducts } from '@/actions/product';
import PaginationCustom from '@/components/molecules/PaginationCustom';
import ProductCard from '@/components/molecules/ProductCard';
import ProductPageSkeleton from '@/components/molecules/ProductPageSkeleton';
import { ListFilter } from 'lucide-react';
import React from 'react';
import useSWR from 'swr';

const PAGE_SIZE = 9;

const Product = () => {
  const [page, setPage] = React.useState(1);
  const queryKey = ['/api/product', { page, limit: PAGE_SIZE }];

  const {
    data: products,
    isLoading,
    error,
  } = useSWR(queryKey, () => getAllProducts({ page, limit: PAGE_SIZE }), {
    revalidateOnFocus: false,
  });

  const handleNext = () => {
    if (products?.panigation && page < products.panigation.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  if (isLoading) {
    return <ProductPageSkeleton />;
  }

  if (error) {
    return <div>Error : {error.message}</div>;
  }

  return (
    <div className="section-container mb-36">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8 md:mt-14 mb-9 w-full">
        <aside className="lg:col-span-1 bg-white p-4 rounded-xl shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Filters</h2>
            <ListFilter className="size-5" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select className="w-full border rounded px-3 py-2 text-sm">
              <option value="">All</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Price Range
            </label>
            <input type="range" min="0" max="1000" className="w-full" />
          </div>
        </aside>
        <div className="lg:col-span-3">
          <h2 className="text-3xl font-bold mb-6">Our Trending Products</h2>

          <div className="grid grid-cols-2 xl:grid-cols-3 lg:gap-4">
            {products?.data && products?.data.length > 0 ? (
              products.data.map((product) => (
                <ProductCard key={product._id} {...product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products available.
              </p>
            )}
          </div>
          <PaginationCustom
            onNext={handleNext}
            onPrev={handlePrev}
            totalPages={products?.panigation.totalPages || 1}
            current={page}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
