'use client';

import { getAllProducts } from '@/actions/product';
import PaginationCustom from '@/components/molecules/PaginationCustom';
import ProductCard from '@/components/molecules/ProductCard';
import { filterRatings } from '@/public/dummy/general';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import useSWR from 'swr';
import FilterDrawer from '../organisms/FilterDrawer';
import ProductFilter from '../organisms/ProductFilter';
import { Skeleton } from '../ui/skeleton';

const PAGE_SIZE = 9;

const ProductPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const pageParam = searchParams.get('page');

  const currentPage = React.useMemo(() => {
    return pageParam ? parseInt(pageParam, 10) : 1;
  }, [pageParam]);

  // Pending state
  const [pendingRating, setPendingRating] = React.useState(
    filterRatings[0].value
  );
  const [pendingIsDiscount, setPendingIsDiscount] = React.useState(false);
  const [pendingPriceRange, setPendingPriceRange] = React.useState<
    [number, number]
  >([50, 300]);

  // State
  const [selectedRating, setSelectedRating] = React.useState(
    filterRatings[0].value
  );
  const [isDiscount, setIsDiscount] = React.useState(false);
  const [priceRange, setPriceRange] = React.useState<[number, number]>([
    50, 300,
  ]);

  const queryKey = [
    '/api/product',
    currentPage,
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
        page: currentPage,
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

  const updatePage = React.useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', page.toString());
      router.replace(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  const handleApplyFilters = React.useCallback(() => {
    setSelectedRating(pendingRating);
    setIsDiscount(pendingIsDiscount);
    setPriceRange(pendingPriceRange);
    updatePage(1);
  }, [pendingRating, pendingIsDiscount, pendingPriceRange, updatePage]);

  const handleNext = React.useCallback(() => {
    if (products && currentPage < products.pagination.totalPages) {
      updatePage(currentPage + 1);
    }
  }, [currentPage, products, updatePage]);

  const handlePrev = React.useCallback(() => {
    if (currentPage > 1) {
      updatePage(currentPage - 1);
    }
  }, [currentPage, updatePage]);

  React.useEffect(() => {
    if (!pageParam) {
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      router.replace(`?${params.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam]);

  if (error) {
    return <div>Error : {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6 mb-9 w-full">
      <aside className="max-lg:hidden lg:col-span-1 bg-white p-4 rounded-xl shadow h-fit">
        <ProductFilter
          pendingRating={pendingRating}
          setPendingRating={setPendingRating}
          pendingIsDiscount={pendingIsDiscount}
          setPendingIsDiscount={setPendingIsDiscount}
          pendingPriceRange={pendingPriceRange}
          setPendingPriceRange={setPendingPriceRange}
          handleApplyFilters={handleApplyFilters}
          disabled={isValidating}
        />
      </aside>
      {!isValidating ? (
        <div className="lg:col-span-2 xl:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl sm:text-3xl font-bold">
              {query ? `Search results for "${query}"` : 'Trending'}
            </h2>
            <div className="flex items-center">
              <p className="text-base">{`Total: ${
                products?.pagination.totalItems || 0
              } product${products?.pagination.totalItems === 1 ? '' : 's'}`}</p>
              <FilterDrawer
                trigger={
                  <div className="lg:hidden relative size-8 ml-4 cursor-pointer">
                    <Image
                      fill
                      src="/icons/filter.svg"
                      alt="filter"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
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
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-3 lg:gap-5">
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
              current={currentPage}
              setPage={updatePage}
            />
          ) : (
            ''
          )}
        </div>
      ) : (
        <div className="lg:col-span-2 xl:col-span-3">
          <Skeleton className="h-12 w-full mb-4" />
          <div className="grid gap-2 grid-cols-2 xl:grid-cols-3 lg:gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
