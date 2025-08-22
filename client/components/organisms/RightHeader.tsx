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
import { useIsMobile } from '@/hooks/use-mobile';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const RightHeader = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { profileData, accessToken } = useProfileStore();
  const router = useRouter();
  const { data: session } = useSession();
  const isMobile = useIsMobile();

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
      <HoverCard
        openDelay={200}
        closeDelay={200}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <HoverCardTrigger asChild>
          <Link href="/">
            <ShoppingCart className="size-6 cursor-pointer" />
          </Link>
        </HoverCardTrigger>
        <AnimatePresence>
          {isOpen && (
            <HoverCardContent asChild className="border-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 20,
                  duration: 0.25,
                }}
                className="w-25 max-md:mr-2 md:w-100 rounded-2xl border bg-popover py-8 md:py-15 shadow-md"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="relative size-25 overflow-hidden">
                    <Image
                      src="/images/empty.png"
                      alt='empty'
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <p className="text-base">
                    No products yet
                  </p>
                </div>
              </motion.div>
            </HoverCardContent>
          )}
        </AnimatePresence>
      </HoverCard>
      {accessToken || session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer border border-gray-300 size-9">
              <AvatarImage
                className="object-cover"
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
          <DropdownMenuContent
            className={isMobile ? 'w-20 mr-2' : 'w-40'}
            align="center"
          >
            <DropdownMenuGroup>
              <DropdownMenuItem
                asChild
                className="text-md font-medium cursor-pointer"
              >
                <Link href={session ? ROUTES.PROFILE_OAUTH : ROUTES.PROFILE}>
                  Profile
                </Link>
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
