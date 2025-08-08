'use client';

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
import { ROUTES } from '@/lib/constants';
import { Button } from '../ui/button';
import axiosInstance, { setAccessTokenHeader } from '@/lib/axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

const HamburgerMenu = () => {
  const router = useRouter();
  const { accessToken, clearAccessToken } = useAuthStore();

  const logoutService = async () => {
    try {
      const res = await axiosInstance.post('/auth/logout');
      if (res?.status === 200) {
        clearAccessToken();
        setAccessTokenHeader(null);
        router.push(ROUTES.HOME);
        toast.success('Logout successfully');
      }
    } catch {
      toast.error('Logout failed');
    }
  };

  return (
    <Sheet>
      <SheetTrigger aria-label="Open menu">
        <Menu className="size-6 cursor-pointer" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-full p-6 flex flex-col justify-between"
        hideCloseIcon
      >
        <div>
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
            <SheetClose asChild aria-label="Close menu">
              <X className="size-6 cursor-pointer" />
            </SheetClose>
          </div>
          <nav className="mt-8">
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
        </div>
        <SheetClose asChild>
          {accessToken ? (
            <Button
              onClick={logoutService}
              className="w-full cursor-pointer text-center bg-black text-white text-base font-medium rounded-4xl py-3 h-12 hover:bg-black/80"
            >
              Log out
            </Button>
          ) : (
            <Link
              href={ROUTES.LOGIN}
              className="w-full cursor-pointer text-center bg-black text-white text-base font-medium rounded-4xl py-3 hover:bg-black/80"
            >
              Login
            </Link>
          )}
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;
