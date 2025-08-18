'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import useProfileStore from '@/store/useProfileStore';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';
import useSWRMutation from 'swr/mutation';
import { createReview } from '@/actions/review';
import { toast } from 'sonner';
import { revalidateReviews } from '@/actions/product';

const AddReview = () => {
  const { profileData, accessToken } = useProfileStore();
  const params = useParams<{ id: string }>();

  const method = useForm<{
    review: string;
  }>({
    mode: 'onChange',
    defaultValues: {
      review: '',
    },
  });

  const { trigger: createReviewTrigger, isMutating: createReviewLoading } =
    useSWRMutation('review', createReview, {
      onSuccess: async () => {
        await revalidateReviews();
        method.reset();
        toast.success('Review added');
      },
      onError: () => {
        toast.error('Create review failed');
      },
    });

  const onSubmit = async (data: { review: string }) => {
    createReviewTrigger({
      id: params.id!,
      data: {
        comment: data.review,
        rating: 4,
      },
    });
  };

  return (
    <FormProvider {...method}>
      <form
        onSubmit={method.handleSubmit(onSubmit)}
        className={cn(
          'w-full border rounded-2xl p-2 md:p-4 shadow-sm mt-6 md:mt-9',
          accessToken ? '' : 'hidden'
        )}
      >
        <div className="flex items-start gap-2">
          <Avatar className="size-10 border border-gray-300">
            <AvatarImage
              className="object-cover"
              src={profileData?.avatar || ''}
              alt="avatar"
            />
            <AvatarFallback className="bg-cyan-400 text-white font-semibold">
              {profileData?.name?.charAt(0) || ''}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Controller
              name="review"
              control={method.control}
              render={({ field: { onChange, value } }) => (
                <Textarea
                  onChange={onChange}
                  value={value}
                  placeholder="Write your review..."
                  className="w-full rounded-xl px-4 py-2 text-sm border border-gray-200 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                  rows={2}
                />
              )}
            />
            <div className="flex justify-end mt-2">
              <Button
                className="rounded-xl bg-black hover:bg-black/80 px-6 py-1 text-white cursor-pointer"
                size="sm"
                disabled={!method.watch('review') || createReviewLoading}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddReview;
