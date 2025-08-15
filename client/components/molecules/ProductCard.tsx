import React from 'react';
import Image from 'next/image';
import { formattedCapitalize, calculatePercentage } from '@/lib/utils';
import { ProductTypes } from '@/actions/product/type';
import Link from 'next/link';
import StarRating from './StarRating';

const ProductCard: React.FC<ProductTypes> = ({
  name,
  image,
  rating,
  price,
  _id,
  promotionalPrice,
}) => {
  return (
    <Link
      href={`/product/${_id}`}
      className="border border-transparent hover:border-cyan-500 cursor-pointer rounded-lg md:p-2"
    >
      <div className="relative bg-[#F0EEED] rounded-2xl h-40 sm:h-60 mb-4 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <h4 className="mt-4 text-xs md:text-xl font-semibold line-clamp-1">
        {formattedCapitalize(name)}
      </h4>
      <StarRating rating={rating} className="mt-2" />
      <div className="flex items-center mt-2">
        <span className="tex-base md:text-2xl font-semibold">{`$${
          promotionalPrice || price || 0
        }`}</span>
        {promotionalPrice ? (
          <span className="tex-base md:text-2xl text-gray-400 line-through font-semibold ml-[10px]">{`$${
            price || 0
          }`}</span>
        ) : (
          ''
        )}
        {promotionalPrice ? (
          <span className="text-sm bg-[#ffebeb] text-[#ff3333] px-2 rounded-4xl ml-[10px]">{`-${calculatePercentage(
            promotionalPrice,
            price
          )}%`}</span>
        ) : (
          ''
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
