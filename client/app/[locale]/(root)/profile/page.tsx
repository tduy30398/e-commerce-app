'use client';

import { UpdateUserProfile, UserProfile } from '@/actions/authenticate/type';
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
import { ROUTES } from '@/lib/constants';
import { toast } from 'sonner';
// import { useSession } from 'next-auth/react';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

type FormData = z.infer<typeof profileFormSchema>;

const Profile = () => {
  const router = useRouter();
  // const { data: session } = useSession();
  const t = useTranslations('profile');
  const { profileData, accessToken, isLoggingOut, hydrated, setProfileData } =
    useProfileStore();
  const [uploadPct, setUploadPct] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const defaultValues = {
    name: '',
    email: '',
  };

  const method = useForm<FormData>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
    defaultValues,
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);

      const submitData: UpdateUserProfile = {
        name: data.name,
        avatar: data.avatar || null,
        birthday: data.birthday.toISOString(),
      };

      const res: AxiosResponse<UserProfile> = await axiosInstance.patch(
        'profile',
        submitData
      );

      if (res.status === 200) {
        setProfileData(res.data);
        toast.success(t('updateSuccess'));
        router.replace(ROUTES.HOME);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || t('updateFailed'));
      } else {
        toast.error(t('updateFailed'));
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
    } else {
      method.reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData]);

  React.useEffect(() => {
    if (!hydrated) return;

    if (!accessToken && !isLoggingOut) {
      router.replace(ROUTES.LOGIN);
    }
  }, [accessToken, router, isLoggingOut, hydrated]);

  return (
    <Form {...method}>
      <form onSubmit={method.handleSubmit(onSubmit)}>
        <div className="section-container mb-36">
          <h1 className="text-4xl font-black mt-6">
            {t('information', { name: profileData?.name || '' })}
          </h1>
          <div className="mt-6">
            <FormField
              control={method.control}
              name="avatar"
              render={({ field, formState }) => (
                <FormItem className="md:col-span-2">
                  {uploadPct && <Progress value={uploadPct} />}
                  <FormLabel>{`${t('avatar')} (Max: 2MB)`}</FormLabel>
                  <FormControl>
                    <Uploader
                      // disabled={!!session}
                      value={field.value}
                      onChange={field.onChange}
                      error={formState.errors.avatar?.message}
                      handleSetPct={setUploadPct}
                      roundedFull
                      className="w-fit mx-auto"
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
                  <FormLabel>{t('email')}</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 text-lg! border-[#889397]"
                      value={field.value}
                      onChange={field.onChange}
                      disabled
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
                  <FormLabel>{t('name')}</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 text-lg! border-[#889397]"
                      value={field.value}
                      onChange={field.onChange}
                      // disabled={!!session}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* {!session && (
              <FormField
                control={method.control}
                name="birthday"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>{t('birthdate')}</FormLabel>
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
            )} */}
            <FormField
              control={method.control}
              name="birthday"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t('birthdate')}</FormLabel>
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
          {/* {!session && (
            <div className="flex justify-end">
              <Button
                type="submit"
                className="cursor-pointer main-button h-12 mt-8 max-md:mt-8 max-md:w-full"
                disabled={isLoading || uploadPct !== null}
              >
                {t('save')}
              </Button>
            </div>
          )} */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="cursor-pointer main-button h-12 mt-8 max-md:mt-8 max-md:w-full"
              disabled={isLoading || uploadPct !== null}
            >
              {t('save')}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default Profile;
