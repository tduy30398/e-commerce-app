import React from 'react';
import { Skeleton } from '../ui/skeleton';

const ProfileSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <div className="col-span-1 md:col-span-2">
        <Skeleton className="size-48 rounded-full mx-auto" />
      </div>

      <div className="col-span-1 space-y-2">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-12 w-full rounded" />
      </div>

      <div className="col-span-1 space-y-2">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-12 w-full rounded" />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
