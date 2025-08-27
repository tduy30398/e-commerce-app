import React from 'react';
import Image from 'next/image';
import { formattedCapitalize, calculatePercentage } from '@/lib/utils';
import { ProductTypes } from '@/actions/product/type';
import Link from 'next/link';
import StarRating from './StarRating';
import { ROUTES } from '@/lib/constants';

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
      href={`${ROUTES.PRODUCT}/${_id}`}
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
      <h4 className="mt-4 text-base md:text-xl font-semibold truncate">
        {formattedCapitalize(name)}
      </h4>
      <StarRating rating={rating} className="mt-2" />
      <div className="flex items-center mt-2">
        <span className="tex-base md:text-2xl font-semibold">{`$${promotionalPrice || price || 0
          }`}</span>
        {promotionalPrice ? (
          <span className="tex-base md:text-2xl text-gray-400 line-through font-semibold ml-2.5">{`$${price || 0
            }`}</span>
        ) : null}
        {promotionalPrice ? (
          <span className="text-sm bg-[#ffebeb] text-[#ff3333] px-2 rounded-4xl ml-2.5">{`-${calculatePercentage(
            promotionalPrice,
            price
          )}%`}</span>
        ) : null}
      </div>
    </Link>
  );
};

export default ProductCard;
