import { ROUTES } from '@/lib/constants';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const Register = () => {
  return (
    <div className="w-1/2 rounded-3xl p-8 bg-white flex-center flex-col gap-4">
      <p className="text-4xl font-black">SIGN IN</p>
      <div>
        <span className="text-xl font-medium">Already have an account?</span>
        <Link
          className="text-xl font-medium underline ml-2"
          href={ROUTES.LOGIN}
        >
          Login
        </Link>
      </div>
      <div className="w-full h-[50px] max-w-[300px] border-[1px] border-gray-200 rounded-2xl flex-center text-xl font-semibold">
        <div className="relative size-8">
          <Image fill src="/icons/google.svg" alt="google" />
        </div>
        <span className="ml-2 text-gray-600">Google</span>
      </div>
      <div className="w-full h-[50px] max-w-[300px] border-[1px] border-gray-200 rounded-2xl flex-center text-xl font-semibold">
        <div className="relative size-8">
          <Image fill src="/icons/github.svg" alt="github" />
        </div>
        <span className="ml-2 text-gray-600">GitHub</span>
      </div>
      <div className="w-full h-[50px] max-w-[300px] border-[1px] border-gray-200 rounded-2xl flex-center text-xl font-semibold">
        <div className="relative size-8">
          <Image fill src="/icons/facebook.svg" alt="facebook" />
        </div>
        <span className="ml-2 text-gray-600">Facebook</span>
      </div>
    </div>
  );
};

export default Register;
