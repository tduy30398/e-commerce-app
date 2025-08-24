'use client';

import useCartStore from '@/store/useCartStore';
import React from 'react';
import Image from 'next/image';
import { formattedCapitalize } from '@/lib/utils';
import { colorSelectorData, selectorData } from '@/public/dummy/general';

const CartPage = () => {
  const { cart } = useCartStore();

  if (!cart) {
    return (
      <div className="section-container mb-36">Loading Cart Skeleton...</div>
    );
  }

  return (
    <div className="section-container mb-36">
      <div className="mt-5 lg:mt-9">
        <h1 className="text-4xl font-black">SHOPPING CART</h1>
        <div className="grid grid-cols-10 gap-5 mt-6">
          <div className="flex flex-col col-span-6 border border-black/10 rounded-2xl p-6">
            {cart?.items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center not-last:pb-6 not-last:border-b not-last:border-b-black/10 not-first:mt-6"
              >
                <div className="flex">
                  <Image
                    className="mr-2 border border-[#d4d4d4] bg-white aspect-square object-contain rounded-sm shrink-0"
                    src={item.productId.image}
                    alt={item.productId.name}
                    width={128}
                    height={128}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-xl font-bold">
                        {formattedCapitalize(item.productId.name)}
                      </p>
                      <p className="text-base font-medium text-gray-400">
                        <span>Size:</span>
                        <span>
                          {' '}
                          {
                            selectorData.find((s) => s.value === item.size)
                              ?.label
                          }
                        </span>
                      </p>
                      <p className="text-base font-medium text-gray-400">
                        <span>Color:</span>
                        <span>
                          {' '}
                          {
                            colorSelectorData.find(
                              (s) => s.value === item.color
                            )?.name
                          }
                        </span>
                      </p>
                    </div>
                    <p className="text-xl font-bold">
                      {`$${
                        item.productId.promotionalPrice || item.productId.price
                      }`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-4">Right</div>
        </div>
        {/* {cart?.items?.length ? (
          <div className="flex items-center justify-end">
            <span className="mt-8 text-right text-xl font-bold">{`Total (${
              cart.items.length
            } item${Number(cart.items.length) > 1 ? 's' : ''}):`}</span>
            &nbsp;
            <span className="text-[#ee4d2d] mt-8 text-right text-xl font-bold">
              ${formatNumberWithCommas(1200)}
            </span>
          </div>
        ) : null} */}
      </div>
    </div>
  );
};

export default CartPage;
