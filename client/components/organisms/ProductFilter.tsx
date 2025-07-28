import React from 'react';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Button } from '../ui/button';
import Selector from '../molecules/Selector';
import Image from 'next/image';
import { filterRatings } from '@/public/dummy/general';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
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
    <Accordion type="multiple" defaultValue={['item-1', 'item-2', 'item-3']}>
      {!isHideTitle && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Filters</h2>
            <div className="relative size-8 ml-4">
              <Image fill src="/icons/filter.svg" alt="filter" />
            </div>
          </div>
          <Separator className="mt-6" />
        </>
      )}
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-xl font-bold">
          Rating range
        </AccordionTrigger>
        <AccordionContent>
          <Selector
            value={pendingRating}
            onValueChange={setPendingRating}
            options={filterRatings}
            placeholder="Select Rating"
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-xl font-bold">
          Only discount
        </AccordionTrigger>
        <AccordionContent>
          <Switch
            checked={pendingIsDiscount}
            onCheckedChange={setPendingIsDiscount}
            id="promotional"
            className="cursor-pointer"
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-xl font-bold">
          Price Range
        </AccordionTrigger>
        <AccordionContent>
          <Slider
            id="price-range"
            min={0}
            max={500}
            step={1}
            value={pendingPriceRange}
            onValueChange={(val: number[]) =>
              setPendingPriceRange([val[0], val[1]])
            }
            className="w-full cursor-pointer mt-8"
          />
        </AccordionContent>
      </AccordionItem>
      <Button
        onClick={handleApplyFilters}
        className="main-button w-full h-12 cursor-pointer mt-8"
        disabled={disabled}
      >
        Apply Filter
      </Button>
    </Accordion>
  );
};

export default ProductFilter;
