'use client';

import Image from 'next/image';
import { Button } from '../ui/button';

interface SocialLoginItemProps {
  icon: string;
  name: string;
  handleClick?: () => void;
}

const SocialLoginItem = ({ icon, name, handleClick }: SocialLoginItemProps) => {

  return (
    <Button
      className="cursor-pointer bg-transparent hover:bg-black/10 h-12.5 w-full max-w-82.5 border border-[#889397] rounded-2xl flex-center text-xl font-semibold"
      onClick={handleClick}
    >
      <div className="relative size-8">
        <Image fill src={icon} alt={name} sizes="32px" />
      </div>
      <span className="ml-2 text-gray-600">{name}</span>
    </Button>
  );
};

export default SocialLoginItem;
