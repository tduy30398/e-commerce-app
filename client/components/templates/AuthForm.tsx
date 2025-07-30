import { ROUTES } from '@/lib/constants';
import Link from 'next/link';
import React from 'react';
import SocialLoginItem from '@/components/molecules/SocialLoginItem';
import { socialData } from '@/public/dummy/general';

interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForm = ({ type }: AuthFormProps) => {
  return (
    <div className="max-md:h-screen w-full md:w-2/3 lg:w-1/2 md:rounded-3xl p-4 md:p-8 bg-white max-md:!justify-start flex-center flex-col gap-6">
      <p className="text-4xl font-black max-md:mt-12">
        {type === 'login' ? 'SIGN IN' : 'SIGN UP'}
      </p>
      <div>
        <span className="text-xl font-medium">
          {type === 'login' ? 'Don\'t have an account?' : 'Already have an account?'}
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
    </div>
  );
};

export default AuthForm;
