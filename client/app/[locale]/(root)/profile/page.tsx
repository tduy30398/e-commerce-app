'use client';

// import { DatePicker } from '@/components/organisms/DatePicker';
import Uploader from '@/components/organisms/Uploader';
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
import { profileFormSchema } from '@/lib/schemas';
import useProfileStore from '@/store/useProfileStore';
import { zodResolver } from '@hookform/resolvers/zod';
// import { parseISO } from 'date-fns';
import { useRouter } from '@/i18n/navigation';
import { ROUTES } from '@/lib/constants';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

type FormData = z.infer<typeof profileFormSchema>;

const Profile = () => {
  const router = useRouter();
  const t = useTranslations('profile');
  const { profileData, accessToken, isLoggingOut, hydrated } =
    useProfileStore();
  const [uploadPct, setUploadPct] = React.useState<number | null>(null);

  const defaultValues = {
    name: '',
    email: '',
  };

  const method = useForm<FormData>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
    defaultValues,
  });

  React.useEffect(() => {
    if (profileData) {
      method.reset({
        name: profileData.name,
        email: profileData.email,
        // birthday: parseISO(profileData.birthday),
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
      <form>
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
                      value={field.value}
                      onChange={field.onChange}
                      error={formState.errors.avatar?.message}
                      handleSetPct={setUploadPct}
                      roundedFull
                      className="w-fit mx-auto"
                      disabled
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
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
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
            /> */}
          </div>
          {/* <div className="flex justify-end">
            <Button
              type="submit"
              className="cursor-pointer main-button h-12 mt-8 max-md:mt-8 max-md:w-full"
              disabled={isLoading || uploadPct !== null}
            >
              {t('save')}
            </Button>
          </div> */}
        </div>
      </form>
    </Form>
  );
};

export default Profile;
