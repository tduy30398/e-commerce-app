'use client';

import { createProduct, updateProduct } from '@/actions/product';
import { ProductRequest, ProductTypes } from '@/actions/product/type';
import { ROUTES } from '@/lib/constants';
import { productFormSchema } from '@/lib/shemas';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Progress } from '../ui/progress';
import Uploader from '../organisms/Uploader';
import { Textarea } from '../ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';

type FormData = z.infer<typeof productFormSchema>;

interface ProductDashboardProps {
  id: string;
  data?: ProductTypes;
}

const defaultValues: FormData = {
  name: '',
  image: '',
  description: '',
  promotionalPrice: undefined,
  rating: 0,
  price: 0,
};

const ProductDashboard = ({ id, data }: ProductDashboardProps) => {
  const router = useRouter();

  const [uploadPct, setUploadPct] = React.useState<number | null>(null);
  const methods = useForm<FormData>({
    resolver: zodResolver(productFormSchema),
    mode: 'onChange',
    defaultValues: defaultValues,
  });

  const handleSuccess = () => {
    mutate('product');
    methods.reset();
    router.push(ROUTES.ADMINPRODUCT);
  };

  const { trigger: createProductTrigger, isMutating } = useSWRMutation(
    'product',
    createProduct,
    {
      onSuccess: () => {
        handleSuccess();
        toast.success('Product created');
      },
      onError: () => {
        toast.error('Create product failed');
      },
    }
  );

  const { trigger: updateProductTrigger, isMutating: updateLoading } =
    useSWRMutation('product', updateProduct, {
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

  React.useEffect(() => {
    if (data) {
      methods.reset(data);
    } else {
      methods.reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-2xl font-bold">Product Detail</h2>
          <Button
            type="submit"
            className="max-md:hidden main-button cursor-pointer md:w-auto max-md:mt-4"
            disabled={isMutating || updateLoading || uploadPct !== null}
          >
            {id !== 'create' ? 'Update' : 'Create'}
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <FormField
            control={methods.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Rating */}
          <FormField
            control={methods.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Rating (1-5)<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step={0.1}
                    min={1}
                    max={5}
                    value={field.value}
                    onChange={(val) => field.onChange(val.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price */}
          <FormField
            control={methods.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Price<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    value={field.value}
                    onChange={(val) => field.onChange(val.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Promotional Price */}
          <FormField
            control={methods.control}
            name="promotionalPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Promotional Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    value={field.value}
                    onChange={(val) => field.onChange(val.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload */}
          <FormField
            control={methods.control}
            name="image"
            render={({ field, formState }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>
                  Product Image (Max size: 2MB)
                  <span className="text-red-500">*</span>
                </FormLabel>
                {uploadPct && <Progress value={uploadPct} />}
                <FormControl>
                  <Uploader
                    value={field.value}
                    onChange={field.onChange}
                    error={formState.errors.image?.message}
                    handleSetPct={setUploadPct}
                    className="w-fit mx-auto"
                  />
                </FormControl>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={methods.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>
                Description<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="md:hidden cursor-pointer main-button w-full max-md:mt-4"
          disabled={isMutating || updateLoading || uploadPct !== null}
        >
          {id !== 'create' ? 'Update' : 'Create'}
        </Button>
      </form>
    </Form>
  );
};

export default ProductDashboard;
