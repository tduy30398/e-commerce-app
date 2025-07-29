'use client';

import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';

interface SocialLoginItemProps {
  icon: string;
  name: string;
  onClick?: () => void;
}

const SocialLoginItem = ({ icon, name, onClick }: SocialLoginItemProps) => {
  return (
    <Button
      className="cursor-pointer bg-transparent hover:bg-black/10 h-[50px] w-full max-w-[300px] border-[1px] border-gray-200 rounded-2xl flex-center text-xl font-semibold"
      onClick={onClick}
    >
      <div className="relative size-8">
        <Image fill src={icon} alt={name} />
      </div>
      <span className="ml-2 text-gray-600">{name}</span>
    </Button>
  );
};

export default SocialLoginItem;
