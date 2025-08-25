import React from 'react';
import { Skeleton } from '../ui/skeleton';
import ProductCartSkeleton from '../molecules/ProductCartSkeleton';

const CartPageSkeleton = () => {
  return (
    <div className="section-container mb-36">
      <div className="mt-5 lg:mt-9">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-5 mt-6">
          <div className="flex flex-col col-span-1 lg:col-span-6 border border-black/10 rounded-2xl p-4 md:p-6 h-fit">
            {Array.from({ length: 5 }).map((_, index) => (
              <ProductCartSkeleton key={index} />
            ))}
          </div>
          <div className="col-span-1 lg:col-span-4 border border-black/10 rounded-2xl flex flex-col p-4 md:p-6 h-fit">
            {/* Title */}
            <Skeleton className="h-6 w-40 mb-4 md:mb-6" />

            <div className="flex flex-col gap-3 md:gap-5 mt-2">
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-16" />
              </div>

              {/* Discount */}
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-5 w-20" />
              </div>

              {/* Delivery Fee */}
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-16" />
              </div>

              {/* Separator placeholder */}
              <Skeleton className="h-[1px] w-full" />

              {/* Total */}
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
              </div>

              {/* Promo code input + button */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-12 flex-1 rounded-3xl" />
                <Skeleton className="h-12 w-20 rounded-3xl" />
              </div>

              {/* Checkout button */}
              <Skeleton className="h-12 w-full rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPageSkeleton;
