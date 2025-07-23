'use client';

import { getAllProducts } from '@/actions/product';
import PaginationCustom from '@/components/molecules/PaginationCustom';
import ProductCard from '@/components/molecules/ProductCard';
import ProductPageSkeleton from '@/components/molecules/ProductPageSkeleton';
import { ListFilter } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import useSWR, { mutate } from 'swr';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { filterRatings } from '@/public/dummy/general';
import { Button } from '@/components/ui/button';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';

const PAGE_SIZE = 9;

const ProductPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const [page, setPage] = React.useState(1);
  const [selectedRating, setSelectedRating] = React.useState(
    filterRatings[0].value
  );
  const [isDiscount, setIsDiscount] = React.useState(false);
  const [priceRange, setPriceRange] = React.useState<[number, number]>([
    50, 300,
  ]);

  const handleValueChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const queryKey = ['/api/product', page, query];

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
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8 md:mt-14 mb-9 w-full">
      <aside className="lg:col-span-1 bg-white p-4 rounded-xl shadow h-fit">
        <div className="flex items-center justify-between border-b-[1px] border-b-gray-200 pb-6">
          <h2 className="text-xl font-bold">Filters</h2>
          <ListFilter className="size-5" />
        </div>
        <div className="mt-4 border-b-[1px] border-b-gray-200 pb-6">
          <Label className="block text-xl font-bold mb-1">Rating range</Label>
          <Select value={selectedRating} onValueChange={setSelectedRating}>
            <SelectTrigger className="w-full mt-4">
              <SelectValue placeholder="Select Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {filterRatings.map((rating) => (
                  <SelectItem key={rating.value} value={rating.value}>
                    {rating.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center mt-4 border-b-[1px] border-b-gray-200 pb-6">
          <Label htmlFor="promotional" className="block text-xl font-bold mb-1">
            Only discount
          </Label>
          <Switch
            checked={isDiscount}
            onCheckedChange={setIsDiscount}
            id="promotional"
            className="ml-4 cursor-pointer"
          />
        </div>
        <div className="flex flex-col items-start mt-4 border-b-[1px] border-b-gray-200 pb-6">
          <Label
            htmlFor="price-range"
            className="block text-xl font-bold mb-10"
          >
            Price
          </Label>
          <Slider
            id="price-range"
            min={0}
            max={500}
            step={1}
            value={priceRange}
            onValueChange={handleValueChange}
            className="w-full cursor-pointer"
          />
        </div>
        <Button
          onClick={() => mutate(queryKey)}
          className="main-button mt-8 w-full h-12 cursor-pointer"
        >
          Apply Filter
        </Button>
      </aside>
      <div className="lg:col-span-3">
        <h2 className="text-3xl font-bold mb-6">
          {query ? `Search results for "${query}"` : 'Our Trending Products'}
        </h2>
        <div className="grid grid-cols-2 xl:grid-cols-3 lg:gap-4">
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
