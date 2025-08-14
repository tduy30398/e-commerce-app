'use client';

import { logoutUserService } from '@/actions/authenticate';
import { ROUTES } from '@/lib/constants';
import useProfileStore from '@/store/useProfileStore';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { signOut, useSession } from 'next-auth/react';

const RightHeader = () => {
  const { profileData, accessToken } = useProfileStore();
  const router = useRouter();
  const { data: session } = useSession();

  const logoutService = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (res.status === 200) {
        logoutUserService();
        toast.success('Logout successfully');
        router.push(ROUTES.HOME);
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
      {accessToken || session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                className="object-contain"
                src={profileData?.avatar || session?.user?.image || ''}
                alt="avatar"
              />
              <AvatarFallback className="bg-[#00ffff]">
                {profileData?.name?.charAt(0) ||
                  session?.user?.name?.charAt(0) ||
                  ''}
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
                onClick={() =>
                  session
                    ? signOut({ callbackUrl: ROUTES.HOME })
                    : logoutService()
                }
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
