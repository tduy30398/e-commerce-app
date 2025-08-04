'use client';

import { registerFormSchema } from '@/lib/shemas';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { PasswordInput } from '../molecules/PasswordInput';
import { Button } from '../ui/button';
import { DatePicker } from './DatePicker';
import { toast } from 'sonner';
import useSWRMutation from 'swr/mutation';
import { registerService } from '@/actions/authenticate';
import { setAccessTokenStorage } from '@/lib/storage';
import { ROUTES } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { NEXT_PUBLIC_API_BASE_URL } from '@/lib/axios';

type FormData = z.infer<typeof registerFormSchema>;

const RegisterForm = () => {
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

  const { trigger: registerTrigger, isMutating } = useSWRMutation(
    `${NEXT_PUBLIC_API_BASE_URL}auth/register`,
    registerService,
    {
      onSuccess: (data) => {
        setAccessTokenStorage(data.accessToken);
        router.push(ROUTES.HOME);
      },
      onError: () => {
        toast.error('Register failed');
      },
    }
  );

  const onSubmit = (data: FormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = data;

    registerTrigger(rest);
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
          disabled={isMutating}
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
