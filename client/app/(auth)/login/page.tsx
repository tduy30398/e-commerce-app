import { ROUTES } from '@/lib/constants';
import Link from 'next/link';
import React from 'react';
import SocialLoginItem from '@/components/molecules/SocialLoginItem';

const Login = () => {
  const socialData = [
    {
      name: 'Google',
      icon: '/icons/google.svg',
    },
    {
      name: 'Facebook',
      icon: '/icons/facebook.svg',
    },
    {
      name: 'GitHub',
      icon: '/icons/github.svg',
    },
  ];

  return (
    <div className="max-md:h-screen w-full md:w-2/3 lg:w-1/2 md:rounded-3xl p-4 md:p-8 bg-white flex-center flex-col gap-6">
      <p className="text-4xl font-black">SIGN IN</p>
      <div>
        <span className="text-xl font-medium">Don&apos;t have an account?</span>
        <Link
          className="text-xl font-medium underline ml-2"
          href={ROUTES.REGISTER}
        >
          Sign Up
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

export default Login;
