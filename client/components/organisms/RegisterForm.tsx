'use client';

import { registerFormSchema } from '@/lib/shemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

import axiosInstance, { setAccessTokenHeader } from '@/lib/axios';
import { ROUTES } from '@/lib/constants';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
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
import { DatePicker } from './DatePicker';
import {
  AuthResponse,
  RegisterRequest,
  UserProfile,
} from '@/actions/authenticate/type';
import { useAuthStore } from '@/store/useAuthStore';
import useProfileStore from '@/store/useProfileStore';

type FormData = z.infer<typeof registerFormSchema>;

const RegisterForm = () => {
  const { setProfileData } = useProfileStore();
  const { setAccessToken } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
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
      const res: AxiosResponse<AuthResponse> = await axiosInstance.post(
        'auth/register',
        rest as RegisterRequest
      );

      if (res.status === 201) {
        setAccessToken(res.data.accessToken);
        setAccessTokenHeader(res.data.accessToken);
        const profileRes: AxiosResponse<UserProfile> = await axiosInstance.get(
          'profile'
        );
        if (profileRes.status === 200) {
          setProfileData(profileRes.data);
        }
        router.push(ROUTES.HOME);
      }
    } catch {
      toast.error('An error occurred');
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">
                Name<span className="text-red-500">*</span>
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
          name="birthday"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">
                Birthday<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <DatePicker
                  onChange={field.onChange}
                  value={field.value}
                  isError={!!fieldState.error?.message}
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
        <FormField
          control={methods.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">
                Confirm Password<span className="text-red-500">*</span>
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
          disabled={isLoading}
          type="submit"
          className="cursor-pointer main-button w-full mt-4 max-md:mt-4 max-md:mb-9 h-[50px]"
        >
          Register
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
