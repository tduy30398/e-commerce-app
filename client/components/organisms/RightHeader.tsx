'use client';

import { ROUTES } from '@/lib/constants';
import { getAccessTokenStorage, removeAccessTokenStorage } from '@/lib/storage';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import axiosInstance, { setAccessToken } from '@/lib/axios';

const RightHeader = () => {
  const router = useRouter();
  const [token, setToken] = React.useState<string | null>(null);

  const logoutService = async () => {
    try {
      const res = await axiosInstance.post('/auth/logout');
      if (res?.statusText === 'OK' && res?.status === 200) {
        removeAccessTokenStorage();
        setToken(null);
        setAccessToken(null);
        router.push(ROUTES.HOME);
        toast.success('Logout successfully');
      }
    } catch {
      toast.error('Logout failed');
    }
  };

  React.useEffect(() => {
    const accessToken = getAccessTokenStorage();
    setToken(accessToken);
  }, []);

  return (
    <div className="flex items-center sm:ml-10 gap-4 shrink-0">
      <div className="sm:hidden size-6">
        <MobileSearchHeader />
      </div>
      <Link href={ROUTES.CART}>
        <ShoppingCart className="size-6 cursor-pointer" />
      </Link>
      {token ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
              <AvatarFallback>FB</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="center">
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-md font-medium">
                Profile
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
