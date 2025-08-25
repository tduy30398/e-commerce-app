import React from 'react';
import { Skeleton } from '../ui/skeleton';

const ProductCartSkeleton = () => {
  return (
    <div className="flex justify-between not-last:pb-4 md:not-last:pb-6 not-last:border-b not-last:border-b-black/10 not-first:mt-4 md:not-first:mt-6 overflow-hidden">
      {/* Left section */}
      <div className="flex">
        {/* Image skeleton */}
        <Skeleton className="mr-2 aspect-square w-24 h-24 md:w-32 md:h-32 rounded-sm" />

        {/* Details */}
        <div className="flex flex-col justify-between">
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-5 w-[150px] md:w-[250px]" />{' '}
            {/* Product name */}
            <Skeleton className="h-4 w-24" /> {/* Size */}
            <Skeleton className="h-4 w-20" /> {/* Color */}
            <Skeleton className="h-4 w-28 hidden md:block" />{' '}
            {/* Unit price (desktop only) */}
          </div>
          <Skeleton className="h-6 w-32" /> {/* Total price */}
        </div>
      </div>

      {/* Right section */}
      <div className="flex flex-col justify-between items-end shrink-0">
        <Skeleton className="h-6 w-6 rounded-full" /> {/* Delete button */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-md" /> {/* - button */}
          <Skeleton className="h-6 w-8 rounded-md" /> {/* quantity */}
          <Skeleton className="h-8 w-8 rounded-md" /> {/* + button */}
        </div>
      </div>
    </div>
  );
};

export default ProductCartSkeleton;
