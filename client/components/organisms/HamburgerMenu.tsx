import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { navigateList } from '@/public/dummy/general';
import Image from 'next/image';
import { Separator } from '../ui/separator';

const HamburgerMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="size-6 cursor-pointer" />
      </SheetTrigger>
      <SheetContent side={'left'} className="w-full p-6" hideCloseIcon>
        <div className="flex justify-between items-center">
          <SheetHeader className="p-0">
            <SheetTitle className="text-left">
              <div className="relative w-[126px] h-[18px]">
                <Image
                  src="/icons/main-logo.svg"
                  alt="logo"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </SheetTitle>
          </SheetHeader>
          <SheetClose>
            <X className="size-6 cursor-pointer" />
          </SheetClose>
        </div>
        <nav className="mt-6">
          {navigateList.map((item, index) => (
            <SheetClose asChild key={index}>
              <Link href={item.link} className="hover:underline block">
                <SheetDescription className="text-black font-bold text-xl">
                  {item.title}
                </SheetDescription>
                {navigateList.length - 1 !== index && (
                  <Separator className="my-4" />
                )}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;
