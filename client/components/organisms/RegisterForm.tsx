'use client';

import { registerFormSchema } from '@/lib/shemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

import axiosInstance, { setAccessTokenHeader } from '@/lib/axios';
import { ROUTES } from '@/lib/constants';
import { AxiosResponse, isAxiosError } from 'axios';
import { toast } from 'sonner';
import { z } from 'zod';
import { PasswordInput } from '../molecules/PasswordInput';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
// import { DatePicker } from './DatePicker';
import { UserProfile } from '@/actions/authenticate/type';
import useProfileStore from '@/store/useProfileStore';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

type FormData = z.infer<typeof registerFormSchema>;

const RegisterForm = () => {
  const { setAuth } = useProfileStore();
  const router = useRouter();
  const t = useTranslations('login');

  const [isLoading, setIsLoading] = React.useState(false);
  const methods = useForm<FormData>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = data;

    try {
      setIsLoading(true);

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rest),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw { isAxiosError: true, response: { data: errData } };
      }

      const resData: { accessToken: string } = await res.json();

      if (res.status === 200) {
        setAccessTokenHeader(resData.accessToken);
        const profileRes: AxiosResponse<UserProfile> = await axiosInstance.get(
          'profile'
        );

        if (profileRes.status === 200) {
          setAuth(profileRes.data, resData.accessToken);
        }

        router.replace(ROUTES.HOME);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const errData = error.response?.data;
        const field = errData?.field;
        const message = errData?.message ?? 'An error occurred';
        if (field === 'email') {
          methods.setError('email', {
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

  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-82.5"
      >
        <FormField
          control={methods.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">
                {t('name')}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="border-[#889397] h-12.5 rounded-2xl text-black text-base!"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t('name')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">
                {t('email')}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="border-[#889397] h-12.5 rounded-2xl text-black text-base!"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t('email')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={methods.control}
          name="birthday"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-base">
                {t('birthdate')}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <DatePicker
                  onChange={field.onChange}
                  value={field.value}
                  isError={!!fieldState.error?.message}
                  placeholder={t('birthdate')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={methods.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">
                {t('password')}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <PasswordInput
                  className="border-[#889397] h-12.5 rounded-2xl text-black text-base!"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t('password')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">
                {t('confirmPassword')}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <PasswordInput
                  className="border-[#889397] h-12.5 rounded-2xl text-black text-base!"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t('confirmPassword')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isLoading}
          type="submit"
          className="cursor-pointer main-button w-full mt-4 max-md:mt-4 max-md:mb-9 h-12.5"
        >
          {t('register')}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
