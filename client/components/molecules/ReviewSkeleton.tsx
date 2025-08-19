import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { Separator } from '../ui/separator'

const ReviewSkeleton = () => {
  return (
    <div className="border-[1px] border-black/10 p-4 md:p-6 rounded-2xl">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-5 w-5 rounded-full" />
        ))}
      </div>

      <div className="flex items-center gap-4 mt-6">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-5 w-32" />
      </div>

      <Separator className="my-4" />

      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <Skeleton className="h-4 w-24 mt-4" />
    </div>
  )
}

export default ReviewSkeleton
