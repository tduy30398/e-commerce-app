import React from 'react';
import { getReviews } from '@/actions/review';
import ReviewList from '../templates/ReviewList';

interface ReviewsProps {
  productId: string;
}

const Reviews = async ({ productId }: ReviewsProps) => {
  const reviews = await getReviews(productId);

  return (
    <section className="mt-6 md:mt-8 flex flex-col gap-4">
      <ReviewList productId={productId} initReviews={reviews} />
    </section>
  );
};

export default Reviews;
