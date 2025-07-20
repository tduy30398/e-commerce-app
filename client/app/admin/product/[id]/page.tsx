'use client';

import {
  createProduct,
  getProductDetail,
  updateProduct,
} from '@/actions/product';
import { ProductRequest, ProductTypes } from '@/actions/product/type';
import TableSkeleton from '@/components/molecules/TableSkeleton';
import Uploader from '@/components/organisms/Uploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ROUTES } from '@/lib/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { z } from 'zod';

const formSchema = z
  .object({
    name: z.string().nonempty('Name is required'),
    image: z.string().url('Image must be a valid URL'),
    rating: z
      .number({ error: 'Rating must be a number' })
      .min(1, 'Rating must be greater than or equal to 1')
      .max(5, 'Rating must be less than or equal to 5'),
    price: z
      .number({ error: 'Price must be a number' })
      .min(1, 'Rating must be greater than or equal to 1'),
    description: z.string().nonempty('Description is required'),
    promotionalPrice: z
      .number({ error: 'Promotional Price must be a number' })
      .optional(),
  })
  .refine(
    (data) => !data.promotionalPrice || data.promotionalPrice < data.price,
    {
      message: 'Promotional price must be less than price',
      path: ['promotionalPrice'],
    }
  );

type FormData = z.infer<typeof formSchema>;

const ProductDetail = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      image: '',
      description: '',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const handleSuccess = () => {
    mutate('/api/product');
    methods.reset();
    router.push(ROUTES.ADMINPRODUCT);
  };

  const { error, isLoading } = useSWR(
    id !== 'create' ? id : null,
    getProductDetail,
    {
      onSuccess: (data: ProductTypes) => {
        methods.reset({
          name: data.name,
          image: data.image,
          description: data.description,
          rating: data.rating,
          price: data.price,
          promotionalPrice: data.promotionalPrice,
        });
      },
      onError: () => {
        toast.error('Get product failed');
      },
    }
  );

  const {
    trigger: createProductTrigger,
    isMutating,
    error: createError,
  } = useSWRMutation('/api/product', createProduct, {
    onSuccess: () => {
      handleSuccess();
      toast.success('Product created');
    },
    onError: () => {
      toast.error('Create product failed');
    },
  });

  const {
    trigger: updateProductTrigger,
    isMutating: updateLoading,
    error: updateError,
  } = useSWRMutation('/api/product', updateProduct, {
    onSuccess: () => {
      handleSuccess();
      toast.success('Product updated');
    },
    onError: () => {
      toast.error('Update product failed');
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const isValid = await methods.trigger();
      if (!isValid) return;

      const submitData: ProductRequest = {
        price: data.price,
        rating: data.rating,
        description: data.description,
        image: data.image,
        name: data.name,
        promotionalPrice: data.promotionalPrice,
      };

      if (id !== 'create') {
        updateProductTrigger({ id: id!, data: submitData });
      } else {
        await createProductTrigger(submitData);
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  if (isLoading || isMutating || updateLoading) return <TableSkeleton />;
  if (error || createError || updateError)
    return <div>Failed to load data. Error: {error.message}</div>;

  console.log(methods.watch('price'));

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Product Detail</h2>
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={isMutating || updateLoading}
          >
            {id !== 'create' ? 'Update' : 'Create'}
          </Button>
        </div>
        <div className="flex gap-x-4">
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <div className="w-1/2">
                <Uploader value={field.value} onChange={field.onChange} />
                {errors.image && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <div className="w-1/2">
                <Label htmlFor="description">
                  Description<span className="text-red-500">*</span>
                </Label>
                <Textarea
                  className="mt-2 min-h-[80px]"
                  id="description"
                  value={field.value}
                  onChange={field.onChange}
                />
                {errors.description && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
        <div className="flex gap-x-4">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <div className="w-4/12">
                <Label htmlFor="name">
                  Name<span className="text-red-500">*</span>
                </Label>
                <Input
                  className="mt-2"
                  id="name"
                  value={field.value}
                  onChange={field.onChange}
                />
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <div className="w-2/12">
                <Label htmlFor="rating">
                  Rating<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="number"
                  step={0.1}
                  className="mt-2"
                  id="rating"
                  value={field.value}
                  onChange={(val) => field.onChange(val.target.valueAsNumber)}
                />
                {errors.rating && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.rating.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <div className="w-3/12">
                <Label htmlFor="price">
                  Price<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="number"
                  className="mt-2"
                  id="price"
                  value={field.value}
                  onChange={(val) => field.onChange(val.target.valueAsNumber)}
                />
                {errors.price && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="promotionalPrice"
            control={control}
            render={({ field }) => (
              <div className="w-3/12">
                <Label htmlFor="promotionalPrice">Promotional Price</Label>
                <Input
                  type="number"
                  className="mt-2"
                  id="promotionalPrice"
                  value={field.value}
                  onChange={(val) => field.onChange(val.target.valueAsNumber)}
                />
                {errors.promotionalPrice && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.promotionalPrice.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default ProductDetail;
