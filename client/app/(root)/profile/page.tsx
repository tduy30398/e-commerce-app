'use client';

import { UserProfile } from '@/actions/authenticate/type';
import { DatePicker } from '@/components/organisms/DatePicker';
import Uploader from '@/components/organisms/Uploader';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import axiosInstance from '@/lib/axios';
import { profileFormSchema } from '@/lib/shemas';
import useProfileStore from '@/store/useProfileStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosResponse, isAxiosError } from 'axios';
import { parseISO } from 'date-fns';
import React from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/constants';
import { toast } from 'sonner';

type FormData = z.infer<typeof profileFormSchema>;

const Profile = () => {
  const router = useRouter();
  const { profileData, setProfileData } = useProfileStore();
  const [uploadPct, setUploadPct] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const method = useForm<FormData>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const submitData = {
        ...data,
        birthday: data.birthday.toISOString(),
      };
      const res: AxiosResponse<UserProfile> = await axiosInstance.patch(
        'profile',
        submitData
      );

      if (res.status === 200) {
        setProfileData(res.data);
        toast.success('Profile updated successfully');
        router.push(ROUTES.HOME);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const errData = error.response?.data;
        const field = errData?.field;
        const message = errData?.message ?? 'An error occurred';
        if (field === 'email') {
          method.setError('email', {
            message: message,
          });
        } else {
          toast.error(message);
        }
      } else {
        toast.error('Unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (profileData) {
      method.reset({
        name: profileData.name,
        email: profileData.email,
        birthday: parseISO(profileData.birthday),
        avatar: profileData.avatar,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData]);

  return (
    <Form {...method}>
      <form onSubmit={method.handleSubmit(onSubmit)}>
        <div className="section-container mb-36">
          <div className="mt-8">
            <FormField
              control={method.control}
              name="avatar"
              render={({ field, formState }) => (
                <FormItem className="md:col-span-2">
                  {uploadPct && <Progress value={uploadPct} />}
                  <FormControl>
                    <Uploader
                      value={field.value}
                      onChange={field.onChange}
                      error={formState.errors.avatar?.message}
                      handleSetPct={setUploadPct}
                      roundedFull
                    />
                  </FormControl>
                  <FormMessage className="text-center" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <FormField
              control={method.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 text-lg! border-[#889397]"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={method.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 text-lg! border-[#889397]"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={method.control}
              name="birthday"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Birthday</FormLabel>
                  <FormControl>
                    <DatePicker
                      onChange={field.onChange}
                      value={field.value}
                      isError={!!fieldState.error?.message}
                      className="rounded-md h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="cursor-pointer main-button h-12 mt-8 max-md:mt-8 max-md:w-full"
              disabled={isLoading}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default Profile;
