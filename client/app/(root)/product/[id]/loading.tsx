import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const Loading = () => {
  return (
    <div className="mt-5 lg:mt-9">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-10">
        <div
          className="
            relative aspect-square overflow-hidden rounded-3xl
            w-full sm:w-3/4 md:w-2/3 lg:w-full mx-auto
            lg:col-span-5 xl:col-span-4
          "
        >
          <Skeleton className="w-full h-full" />
        </div>

        <div className="lg:col-span-5 xl:col-span-6">
          <Skeleton className="h-8 sm:h-10 xl:h-14 w-3/4 rounded-lg" />

          <div className="mt-3 sm:mt-4 flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-5 w-5 sm:h-6 sm:w-6 rounded-full"
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center mt-4 gap-2 sm:gap-3">
            <Skeleton className="h-6 sm:h-8 w-20 sm:w-24 rounded-lg" />
            <Skeleton className="h-6 sm:h-8 w-16 sm:w-20 rounded-lg" />
            <Skeleton className="h-5 sm:h-6 w-10 sm:w-12 rounded-lg" />
          </div>

          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <Separator className="my-6" />

          <Skeleton className="h-8 sm:h-10 xl:h-14 w-3/4 rounded-lg" />
          <div className="flex gap-3 sm:gap-4 mt-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
              />
            ))}
          </div>

          <Separator className="my-6" />

          <Skeleton className="h-8 sm:h-10 xl:h-14 w-3/4 rounded-lg" />
          <div className="flex gap-2 sm:gap-3 mt-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-8 w-12 sm:h-10 sm:w-16 rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-36 section-container">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-36 md:h-72 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
