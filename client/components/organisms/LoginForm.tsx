'use client';

import axiosInstance, { setAccessTokenHeader } from '@/lib/axios';
import { ROUTES } from '@/lib/constants';
import { loginFormSchema } from '@/lib/shemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod';
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
import { AxiosResponse, isAxiosError } from 'axios';
import { toast } from 'sonner';
import React from 'react';
import { UserProfile } from '@/actions/authenticate/type';
import useProfileStore from '@/store/useProfileStore';

type FormData = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const { setAuth } = useProfileStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const methods = useForm<FormData>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const resData: { accessToken: string } = await res.json();

      if (res.status === 200) {
        setAccessTokenHeader(resData.accessToken);
        const profileRes: AxiosResponse<UserProfile> = await axiosInstance.get(
          'profile'
        );

        if (profileRes.status === 200) {
          setAuth(profileRes.data, resData.accessToken);
        }

        router.push(ROUTES.HOME);
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
        } else if (field === 'password') {
          methods.setError('password', {
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
        className="flex flex-col gap-4 w-full max-w-[330px]"
      >
        <FormField
          control={methods.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">
                Email<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="border-[#889397] h-[50px] rounded-2xl text-black text-base!"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">
                Password<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <PasswordInput
                  className="border-[#889397] h-[50px] rounded-2xl text-black text-base!"
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
          disabled={isLoading}
          className="cursor-pointer main-button w-full mt-4 max-md:mt-4 h-[50px]"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
