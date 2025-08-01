import { ROUTES } from '@/lib/constants';
import Link from 'next/link';
import React from 'react';
import SocialLoginItem from '@/components/molecules/SocialLoginItem';
import { socialData } from '@/public/dummy/general';
import RegisterForm from '../organisms/RegisterForm';
import LoginForm from '../organisms/LoginForm';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForm = ({ type }: AuthFormProps) => {
  return (
    <div className={cn('flex', type === 'login' ? '' : 'flex-row-reverse')}>
      <div className="max-md:h-screen w-full md:w-3/5 lg:w-2/5 md:rounded-3xl p-4 md:p-8 max-md:!justify-start flex-center flex-col gap-6">
        <p className="text-4xl font-black max-md:mt-12">
          {type === 'login' ? 'SIGN IN' : 'SIGN UP'}
        </p>
        <div>
          <span className="text-xl font-medium">
            {type === 'login'
              ? "Don't have an account?"
              : 'Already have an account?'}
          </span>
          <Link
            className="text-xl font-medium underline ml-2"
            href={type === 'login' ? ROUTES.REGISTER : ROUTES.LOGIN}
          >
            {type === 'login' ? 'Sign Up' : 'Sign In'}
          </Link>
        </div>
        {socialData.map((item) => (
          <SocialLoginItem key={item.name} {...item} />
        ))}
        <div className="max-w-[330px] w-full flex items-center">
          <div className="border-b-[1px] border-gray-300 flex-1"></div>
          <p className="text-md font-medium text-[#5c6c75] mx-2">
            Or with email and password
          </p>
          <div className="border-b-[1px] border-gray-300 flex-1"></div>
        </div>
        {type === 'login' ? <LoginForm /> : <RegisterForm />}
      </div>
      <div className="hidden h-screen md:block md:w-2/5 lg:w-3/5 relative">
        <Image
          src="/icons/login-bg.svg"
          alt="background"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default AuthForm;
