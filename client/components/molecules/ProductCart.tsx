'use client';

import React from 'react';
import Image from 'next/image';
import { formatNumberWithCommas, formattedCapitalize } from '@/lib/utils';
import { colorSelectorData, selectorData } from '@/public/dummy/general';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import QuantityButton from './QuantityButton';
import { ProductItemCard } from '../organisms/RightHeader';
import { getMainSocket } from '@/lib/socket';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProductCartProps {
  data: ProductItemCard;
  onQuantityChange: (id: string, quantity: number) => void;
}

const ProductCart = ({ data: item, onQuantityChange }: ProductCartProps) => {
  const { productId, quantity } = item;
  const isMobile = useIsMobile();

  const handleDelete = () => {
    const mainSocket = getMainSocket();
    if (!mainSocket) return;

    mainSocket.emit('cart:remove', {
      productIds: [productId._id],
    });
  };

  return (
    <div className="flex justify-between not-last:pb-4 md:not-last:pb-6 not-last:border-b not-last:border-b-black/10 not-first:mt-4 md:not-first:mt-6 overflow-hidden">
      <div className="flex">
        <Link href={`${ROUTES.PRODUCT}/${productId._id}`} className="shrink-0">
          <Image
            className="mr-2 border border-[#d4d4d4] bg-white aspect-square object-contain rounded-sm w-25 h-25 md:w-32 md:h-32"
            src={productId.image}
            alt={productId.name}
            width={128}
            height={128}
            sizes="(max-width: 768px) 100px, 128px"
          />
        </Link>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col">
            <Link
              href={`${ROUTES.PRODUCT}/${productId._id}`}
              title={formattedCapitalize(productId.name)}
              className="text:base md:text-xl font-bold truncate max-w-37.5 md:max-w-100"
            >
              {formattedCapitalize(productId.name)}
            </Link>
            <p className="text-sm font-medium text-gray-400">
              <span className="text-black">Size:</span>
              <span>
                {' '}
                {selectorData.find((s) => s.value === item.size)?.label}
              </span>
            </p>
            <p className="text-sm font-medium text-gray-400">
              <span className="text-black">Color:</span>
              <span>
                {' '}
                {colorSelectorData.find((s) => s.value === item.color)?.name}
              </span>
            </p>
            {!isMobile ? (
              <p className="text-sm font-medium text-gray-400">
                <span className="text-black">Unit price:</span>
                <span className="text-black">
                  {' '}
                  {`$${formatNumberWithCommas(
                    productId.promotionalPrice || productId.price
                  )}`}
                </span>
              </p>
            ) : null}
          </div>
          <p className="text-lg font-bold text-[#ee4d2d]">
            <span className="text-base text-black font-medium">
              {isMobile ? '' : 'Total price:'}
            </span>{' '}
            {`$${formatNumberWithCommas(
              (productId.promotionalPrice || productId.price) * quantity
            )}`}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end shrink-0">
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent border-none shadow-none cursor-pointer"
          onClick={handleDelete}
        >
          <Trash2 className="cursor-pointer size-5 text-[#ff3333]" />
        </Button>
        <QuantityButton
          quantity={quantity}
          handleMinus={() => onQuantityChange(productId._id, quantity - 1)}
          handlePlus={() => onQuantityChange(productId._id, quantity + 1)}
          isCard
        />
      </div>
    </div>
  );
};

export default ProductCart;
