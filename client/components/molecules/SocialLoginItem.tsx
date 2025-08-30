'use client';

import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { ROUTES } from '@/lib/constants';

interface SocialLoginItemProps {
  icon: string;
  name: string;
}

const SocialLoginItem = ({ icon, name }: SocialLoginItemProps) => {
  return (
    <Button
      onClick={() => signIn(name.toLowerCase(), { callbackUrl: ROUTES.HOME })}
      className="cursor-pointer bg-transparent hover:bg-black/10 h-12.5 w-full max-w-82.5 border border-[#889397] rounded-2xl flex-center text-xl font-semibold"
    >
      <div className="relative size-8">
        <Image fill src={icon} alt={name} sizes="32px" />
      </div>
      <span className="ml-2 text-gray-600">{name}</span>
    </Button>
  );
};

export default SocialLoginItem;
