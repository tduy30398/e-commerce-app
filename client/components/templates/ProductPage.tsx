'use client';

import { getAllProducts } from '@/actions/product';
import PaginationCustom from '@/components/molecules/PaginationCustom';
import ProductCard from '@/components/molecules/ProductCard';
import ProductPageSkeleton from '@/components/molecules/ProductPageSkeleton';
import { filterRatings } from '@/public/dummy/general';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import useSWR from 'swr';
import FilterDrawer from '../organisms/FilterDrawer';
import ProductFilter from '../organisms/ProductFilter';

const PAGE_SIZE = 9;

const ProductPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  // Pending state
  const [pendingRating, setPendingRating] = React.useState(
    filterRatings[0].value
  );
  const [pendingIsDiscount, setPendingIsDiscount] = React.useState(false);
  const [pendingPriceRange, setPendingPriceRange] = React.useState<
    [number, number]
  >([50, 300]);

  // State
  const [page, setPage] = React.useState(1);
  const [selectedRating, setSelectedRating] = React.useState(
    filterRatings[0].value
  );
  const [isDiscount, setIsDiscount] = React.useState(false);
  const [priceRange, setPriceRange] = React.useState<[number, number]>([
    50, 300,
  ]);

  const handleApplyFilters = () => {
    setSelectedRating(pendingRating);
    setIsDiscount(pendingIsDiscount);
    setPriceRange(pendingPriceRange);
    setPage(1);
  };

  const queryKey = [
    '/api/product',
    page,
    selectedRating,
    isDiscount,
    priceRange,
    query,
  ];

  const {
    data: products,
    isValidating,
    error,
  } = useSWR(
    queryKey,
    () =>
      getAllProducts({
        page,
        limit: PAGE_SIZE,
        ...(query && { search: query }),
        ...(selectedRating !== 'all' && { minRating: Number(selectedRating) }),
        onSale: isDiscount,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const handleNext = () => {
    if (products?.pagination && page < products.pagination.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  if (isValidating) {
    return <ProductPageSkeleton />;
  }

  if (error) {
    return <div>Error : {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 md:mt-14 mb-9 w-full">
      <aside className="max-lg:hidden lg:col-span-1 bg-white p-4 rounded-xl shadow h-fit">
        <ProductFilter
          pendingRating={pendingRating}
          setPendingRating={setPendingRating}
          pendingIsDiscount={pendingIsDiscount}
          setPendingIsDiscount={setPendingIsDiscount}
          pendingPriceRange={pendingPriceRange}
          setPendingPriceRange={setPendingPriceRange}
          handleApplyFilters={handleApplyFilters}
        />
      </aside>
      <div className="lg:col-span-2 xl:col-span-3">
        <div className="max-lg:mb-7 flex items-center justify-between">
          <h2 className="text-xl sm:text-3xl font-bold sm:mb-6">
            {query ? `Search results for "${query}"` : 'Trending'}
          </h2>
          <div className="flex items-center">
            <p className="text-base">{`Total: ${
              products?.pagination.totalItems || 0
            } product${products?.pagination.totalItems === 1 ? '' : 's'}`}</p>
            <FilterDrawer
              trigger={
                <div className="lg:hidden relative size-8 ml-4 cursor-pointer">
                  <Image fill src="/icons/filter.svg" alt="filter" />
                </div>
              }
              title="Filters"
            >
              <div className="px-5 pb-5">
                <ProductFilter
                  pendingRating={pendingRating}
                  setPendingRating={setPendingRating}
                  pendingIsDiscount={pendingIsDiscount}
                  setPendingIsDiscount={setPendingIsDiscount}
                  pendingPriceRange={pendingPriceRange}
                  setPendingPriceRange={setPendingPriceRange}
                  handleApplyFilters={handleApplyFilters}
                  isHideTitle
                />
              </div>
            </FilterDrawer>
          </div>
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-4">
          {products?.data && products?.data.length > 0 ? (
            products.data.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))
          ) : (
            <p className="col-span-full text-3xl text-center text-black">
              No products available.
            </p>
          )}
        </div>
        {products?.data && products?.data.length > 0 ? (
          <PaginationCustom
            onNext={handleNext}
            onPrev={handlePrev}
            totalPages={products?.pagination.totalPages || 1}
            current={page}
            setPage={setPage}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default ProductPage;
