import { getProductDetail } from '@/actions/product';
import ReviewSkeleton from '@/components/molecules/ReviewSkeleton';
import StarRating from '@/components/molecules/StarRating';
import AddReview from '@/components/organisms/AddReview';
import ItemInfoSelector from '@/components/organisms/ItemInfoSelector';
import RelatedProduct from '@/components/organisms/RelatedProduct';
import Reviews from '@/components/organisms/Reviews';
import { Separator } from '@/components/ui/separator';
import { calculatePercentage, formattedCapitalize } from '@/lib/utils';
import Image from 'next/image';
import React, { Suspense } from 'react';

interface ProductDetailProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductDetailProps) {
  const { id } = await params;
  const productDetail = await getProductDetail(id);
  return {
    title: formattedCapitalize(productDetail.product.name),
    description: productDetail.product.description,
  };
}

const ProductDetail = async ({ params }: ProductDetailProps) => {
  const { id } = await params;
  const productDetail = await getProductDetail(id);
  const { promotionalPrice, price, rating, name, image, description } =
    productDetail.product;

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
            <span className="text-3xl font-semibold">{`$${promotionalPrice || price || 0
              }`}</span>
            {promotionalPrice ? (
              <span className="tex-base md:text-3xl text-gray-400 line-through font-semibold ml-2.5">{`$${price || 0
                }`}</span>
            ) : null}
            {promotionalPrice ? (
              <span className="text-base bg-[#ffebeb] text-[#ff3333] px-2 rounded-4xl ml-2.5">{`-${calculatePercentage(
                promotionalPrice,
                price
              )}%`}</span>
            ) : null}
          </div>
          <p className="mt-3 md:mt-4 text-base line-clamp-3 h-[72px]">
            {description}
          </p>
          <Separator className="my-4 md:my-6" />
          <ItemInfoSelector id={id} />
        </div>
      </div>
      <Separator className="my-4 md:my-6" />
      <AddReview />
      <Suspense
        fallback={
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <ReviewSkeleton key={i} />
            ))}
          </div>
        }
      >
        <Reviews productId={id} />
      </Suspense>
      <RelatedProduct
        className="mt-12 md:mt-16"
        products={productDetail.relatedProducts}
        title="You might also like"
      />
    </div>
  );
};

export default ProductDetail;
