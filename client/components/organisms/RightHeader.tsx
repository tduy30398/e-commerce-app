'use client';

import { ROUTES } from '@/lib/constants';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import MobileSearchHeader from './MobileSearchHeader';
import axiosInstance from '@/lib/axios';
import { useAuthStore } from '@/store/useAuthStore';
import useProfileStore from '@/store/useProfileStore';
import { logoutUserService } from '@/actions/authenticate';

const RightHeader = () => {
  const { accessToken } = useAuthStore();
  const { profileData } = useProfileStore();

  const logoutService = async () => {
    try {
      const res = await axiosInstance.post('auth/logout');
      if (res?.status === 200) {
        logoutUserService();
        toast.success('Logout successfully');
      }
    } catch {
      toast.error('Logout failed');
    }
  };

  return (
    <div className="flex items-center sm:ml-10 gap-4 shrink-0">
      <div className="sm:hidden size-6">
        <MobileSearchHeader />
      </div>
      <Link href="/">
        <ShoppingCart className="size-6 cursor-pointer" />
      </Link>
      {accessToken ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                className="object-contain"
                src={profileData?.avatar || ''}
                alt="avatar"
              />
              <AvatarFallback className="bg-[#00ffff]">
                {profileData?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="center">
            <DropdownMenuGroup>
              <DropdownMenuItem
                asChild
                className="text-md font-medium cursor-pointer"
              >
                <Link href={ROUTES.PROFILE}>Profile</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button
                onClick={() => logoutService()}
                className="text-md cursor-pointer font-medium bg-transparent w-full text-black justify-start outline-none hover:bg-transparent"
              >
                Log out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href={ROUTES.LOGIN}
          className="text-black font-medium text-base hover:underline max-md:hidden"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default RightHeader;
