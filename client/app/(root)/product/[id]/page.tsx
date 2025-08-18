import { getProductDetail } from '@/actions/product';
import ColorSelector from '@/components/molecules/ColorSelector';
import SizeSelector from '@/components/molecules/SizeSelector';
import StarRating from '@/components/molecules/StarRating';
import AddReview from '@/components/organisms/AddReview';
import Reviews from '@/components/organisms/Reviews';
import { Separator } from '@/components/ui/separator';
import { calculatePercentage } from '@/lib/utils';
import { colorSelectorData, selectorData } from '@/public/dummy/general';
import Image from 'next/image';
import React, { Suspense } from 'react';

const ProductDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const {
    promotionalPrice,
    price,
    rating,
    name,
    image,
    description,
  } = await getProductDetail(id);

  return (
    <div className="mt-5 lg:mt-9">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-5 lg:gap-10">
        <div className="lg:col-span-5 xl:col-span-4 relative aspect-[1] overflow-hidden rounded-3xl max-sm:w-full sm:w-1/2 lg:w-full mx-auto">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="lg:col-span-5 xl:col-span-6">
          <p className="text-3xl xl:text-5xl font-black">{name}</p>
          <StarRating rating={rating} className="mt-3 md:mt-4" />
          <div className="flex items-center mt-3 md:mt-4">
            <span className="text-3xl font-semibold">{`$${
              promotionalPrice || price || 0
            }`}</span>
            {promotionalPrice ? (
              <span className="tex-base md:text-3xl text-gray-400 line-through font-semibold ml-[10px]">{`$${
                price || 0
              }`}</span>
            ) : (
              ''
            )}
            {promotionalPrice ? (
              <span className="text-base bg-[#ffebeb] text-[#ff3333] px-2 rounded-4xl ml-[10px]">{`-${calculatePercentage(
                promotionalPrice,
                price
              )}%`}</span>
            ) : (
              ''
            )}
          </div>
          <p className="mt-3 md:mt-4 text-base line-clamp-3 h-[72px]">
            {description}
          </p>
          <Separator className="my-4 md:my-6" />
          <p className="mt-5 text-xl font-semibold">Select colors</p>
          <ColorSelector data={colorSelectorData} />
          <Separator className="my-4 md:my-6" />
          <p className="mt-5 text-xl font-semibold">Choose Size</p>
          <SizeSelector data={selectorData} />
        </div>
      </div>
      <Separator className="my-4 md:my-6" />
      <Suspense fallback={<p>Loading...</p>}>
        <Reviews productId={id} />
      </Suspense>
      <AddReview />
    </div>
  );
};

export default ProductDetail;
