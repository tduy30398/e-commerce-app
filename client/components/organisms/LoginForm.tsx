'use client';

import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@/lib/shemas';
import z from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { PasswordInput } from '../molecules/PasswordInput';

type FormData = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const methods = useForm<FormData>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
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
          className="cursor-pointer main-button w-full mt-4 max-md:mt-4 h-[50px]"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
