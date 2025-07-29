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
    <div className="w-1/2 rounded-3xl p-8 bg-white flex-center flex-col gap-6">
      <p className="text-4xl font-black">SIGN IN</p>
      <div>
        <span className="text-xl font-medium">Don&apos;t have an account?</span>
        <Link
          className="text-xl font-medium underline ml-2"
          href={ROUTES.REGISTER}
        >
          Register
        </Link>
      </div>
      {socialData.map((item) => (
        <SocialLoginItem key={item.name} {...item} />
      ))}
    </div>
  );
};

export default Login;
