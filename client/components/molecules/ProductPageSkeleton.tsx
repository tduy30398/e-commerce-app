import React from 'react';
import { Skeleton } from '../ui/skeleton';

const ProductPageSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 md:mt-14 mb-9 w-full">
      <aside className="max-lg:hidden lg:col-span-1 bg-white p-4 rounded-xl shadow h-fit">
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-full" />
      </aside>
      <aside className="lg:hidden">
        <Skeleton className="h-10 w-full" />
      </aside>
      <div className="lg:col-span-2 xl:col-span-3">
        <Skeleton className="max-lg:hidden h-12 w-full mb-4" />
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
    </div>
  );
};

export default ProductPageSkeleton;
