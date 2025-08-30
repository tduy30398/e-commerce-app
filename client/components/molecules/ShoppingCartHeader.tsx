'use client';

import React from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Cart } from '../organisms/RightHeader';
import { cn, formattedCapitalize } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import { Button } from '../ui/button';

interface ShoppingCartHeaderProps {
  cart: Cart | null;
}

const ShoppingCartHeader = ({ cart }: ShoppingCartHeaderProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <HoverCard
      openDelay={200}
      closeDelay={200}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <HoverCardTrigger asChild>
        <Link href={ROUTES.CART} className="relative">
          <ShoppingCart className="size-6 cursor-pointer" />
          {cart?.items?.length ? (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-md">
              {cart.items.length}
            </span>
          ) : null}
        </Link>
      </HoverCardTrigger>
      <AnimatePresence>
        {isOpen && (
          <HoverCardContent align="end" asChild className="border-none px-0">
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
              className={cn(
                'w-25 max-md:mr-2 md:w-100 rounded-2xl border bg-popover shadow-md',
                cart?.items?.length ? 'py-4' : 'py-8 md:py-15'
              )}
            >
              {cart?.items?.length ? (
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    {cart.items.slice(0, 5).map((item) => (
                      <Link
                        onClick={() => setIsOpen(false)}
                        href={`${ROUTES.PRODUCT}/${item.productId._id}`}
                        key={item._id}
                        className="flex justify-between gap-4 items-center hover:bg-[#f5f5f5] p-2.5"
                      >
                        <div className="flex min-w-0">
                          <Image
                            className="mr-2 border border-[#d4d4d4] bg-white aspect-square object-contain rounded-sm shrink-0"
                            src={item.productId.image}
                            alt={item.productId.name}
                            width={42}
                            height={42}
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <p className="text-base font-medium truncate max-w-37.5 sm:max-w-50">
                            {formattedCapitalize(item.productId.name)}
                          </p>
                        </div>
                        <p className="text-base font-medium text-[#ee4d2d] shrink-0">
                          {`$${
                            item.productId.promotionalPrice ||
                            item.productId.price
                          }`}
                        </p>
                      </Link>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mr-2.5 mt-3">
                    {cart.items.length > 5 ? (
                      <p className="text-sm font-medium ml-2.5">
                        {`${cart.items.length - 5} more products in cart`}
                      </p>
                    ) : (
                      <span />
                    )}
                    <Button asChild>
                      <Link className="h-10" href={ROUTES.CART}>
                        View my shopping cart
                      </Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="relative size-25 overflow-hidden">
                    <Image
                      src="/images/empty.png"
                      alt="empty"
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <p className="text-base">No products yet</p>
                </div>
              )}
            </motion.div>
          </HoverCardContent>
        )}
      </AnimatePresence>
    </HoverCard>
  );
};

export default ShoppingCartHeader;
