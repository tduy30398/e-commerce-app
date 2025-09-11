import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const Loading = () => {
  return (
    <div className="section-container mb-36 animate-pulse">
      <Skeleton className="h-50 w-full rounded-xl mt-8" />
      <Skeleton className="h-12 w-full rounded-xl mt-8" />
      <Skeleton className="h-12 w-full rounded-xl mt-8" />
      <Skeleton className="h-12 w-1/2 ml-auto rounded-xl mt-8" />
    </div>
  );
};

export default Loading;
