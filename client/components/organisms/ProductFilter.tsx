import React from 'react';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Button } from '../ui/button';
import Selector from '../molecules/Selector';
import Image from 'next/image';
import { filterRatings } from '@/public/dummy/general';
import { Separator } from '../ui/separator';

interface ProductFilterProps {
  pendingRating: string;
  setPendingRating: (value: string) => void;
  pendingIsDiscount: boolean;
  setPendingIsDiscount: (value: boolean) => void;
  pendingPriceRange: [number, number];
  setPendingPriceRange: (value: [number, number]) => void;
  handleApplyFilters: () => void;
  isHideTitle?: boolean;
  disabled?: boolean;
}

const ProductFilter = ({
  pendingRating,
  setPendingRating,
  pendingIsDiscount,
  setPendingIsDiscount,
  pendingPriceRange,
  setPendingPriceRange,
  handleApplyFilters,
  isHideTitle = false,
  disabled = false,
}: ProductFilterProps) => {
  return (
    <>
      {!isHideTitle && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Filters</h2>
            <div className="relative size-8 ml-4">
              <Image fill src="/icons/filter.svg" alt="filter" />
            </div>
          </div>
          <Separator className="my-6" />
        </>
      )}
      <Label className="block text-xl font-bold mb-1 max-lg:mt-6">
        Rating range
      </Label>
      <Selector
        value={pendingRating}
        onValueChange={setPendingRating}
        options={filterRatings}
        placeholder="Select Rating"
      />
      <Separator className="my-6" />
      <div className="flex items-center">
        <Label htmlFor="promotional" className="block text-xl font-bold mb-1">
          Only discount
        </Label>
        <Switch
          checked={pendingIsDiscount}
          onCheckedChange={setPendingIsDiscount}
          id="promotional"
          className="ml-4 cursor-pointer"
        />
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col items-start">
        <Label htmlFor="price-range" className="block text-xl font-bold mb-10">
          Price
        </Label>
        <Slider
          id="price-range"
          min={0}
          max={500}
          step={1}
          value={pendingPriceRange}
          onValueChange={(val: number[]) =>
            setPendingPriceRange([val[0], val[1]])
          }
          className="w-full cursor-pointer"
        />
      </div>
      <Separator className="my-6" />
      <Button
        onClick={handleApplyFilters}
        className="main-button w-full h-12 cursor-pointer"
        disabled={disabled}
      >
        Apply Filter
      </Button>
    </>
  );
};

export default ProductFilter;
