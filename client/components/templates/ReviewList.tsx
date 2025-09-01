'use client';

import useSWRInfinite from 'swr/infinite';
import { ReviewType } from '@/actions/review/type';
import React from 'react';
import ReviewItem from '../molecules/ReviewItem';
import ReviewSkeleton from '../molecules/ReviewSkeleton';

interface ReviewListProps {
  productId: string;
  initReviews: APIPaginationResponse<ReviewType[]>;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ReviewList = ({ productId, initReviews }: ReviewListProps) => {
  const PAGE_SIZE = initReviews.pagination.limit;
  const loadMoreRef = React.useRef<HTMLDivElement | null>(null);

  const getKey = (
    pageIndex: number,
    previousPageData: APIPaginationResponse<ReviewType[]> | null
  ) => {
    if (
      previousPageData &&
      previousPageData.pagination.page >= previousPageData.pagination.totalPages
    ) {
      return null;
    }
    return `/api/reviews?productId=${productId}&page=${pageIndex + 1}&limit=${PAGE_SIZE}`;
  };

  const { data, size, setSize, isValidating } = useSWRInfinite<
    APIPaginationResponse<ReviewType[]>
  >(getKey, fetcher, {
    fallbackData: [initReviews],
    revalidateFirstPage: false,
  });

  const reviews = data ? data.flatMap((page) => page.data) : [];
  const currentPage = data?.[data.length - 1]?.pagination.page ?? 1;
  const totalPages = data?.[data.length - 1]?.pagination.totalPages ?? 1;
  const hasMore = currentPage < totalPages;

  React.useEffect(() => {
    if (!hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isValidating) {
          setSize(size + 1);
        }
      },
      { threshold: 1 } // fire when fully visible
    );

    const node = loadMoreRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, isValidating, setSize]);

  return (
    <>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewItem productId={productId} key={review._id} review={review} />
        ))
      ) : (
        <p className="text-center text-xl font-semibold">No reviews yet.</p>
      )}

      {hasMore && (
        <>
          <div ref={loadMoreRef} className="h-px" />

          {isValidating && (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <ReviewSkeleton key={`skeleton-${i}`} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ReviewList;
