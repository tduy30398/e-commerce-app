import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';

interface SocialLoginItemProps {
  icon: string;
  name: string;
}

const SocialLoginItem = ({ icon, name }: SocialLoginItemProps) => {
  return (
    <Button className="cursor-pointer bg-transparent hover:bg-black/10 h-[50px] w-full max-w-[330px] border-[1px] border-[#889397] rounded-2xl flex-center text-xl font-semibold">
      <div className="relative size-8">
        <Image
          fill
          src={icon}
          alt={name}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <span className="ml-2 text-gray-600">{name}</span>
    </Button>
  );
};

export default SocialLoginItem;
