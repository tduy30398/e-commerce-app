import { formatNumberWithCommas } from '@/lib/utils';
import React from 'react';
import { Separator } from '../ui/separator';
import { ArrowRight, Tag } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface SummaryOrderProps {
  total: number;
}

const SummaryOrder = ({ total }: SummaryOrderProps) => {
  const discountRate = 0.2;
  const deliveryFee = 15;
  const discount = total * discountRate;
  const finalTotal = total - discount + deliveryFee;

  return (
    <div className="col-span-1 lg:col-span-4 border border-black/10 rounded-2xl flex flex-col p-4 md:p-6 h-fit">
      <h2 className="text-2xl font-bold">Order Summary</h2>
      <div className="flex flex-col gap-3 md:gap-5 mt-4 md:mt-6">
        <div className="flex justify-between">
          <span className="text-xl font-medium text-gray-400">
            Subtotal
          </span>
          <span className="text-xl font-medium">
            ${formatNumberWithCommas(total)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-xl font-medium text-gray-400">
            Discount (-20%)
          </span>
          <span className="text-xl font-medium text-[#FF3333]">
            -${formatNumberWithCommas(discount)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-xl font-medium text-gray-400">
            Delivery Fee
          </span>
          <span className="text-xl font-medium">
            ${formatNumberWithCommas(deliveryFee)}
          </span>
        </div>

        <Separator />

        <div className="flex justify-between">
          <span className="text-xl font-medium">Total</span>
          <span className="text-xl font-medium">
            ${formatNumberWithCommas(finalTotal)}
          </span>
        </div>
        <div className="flex justify-between items-center relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer">
            <Tag className="text-muted-foreground size-5" />
          </div>
          <Input
            name="query"
            type="search"
            placeholder="Add promo code"
            className="pl-10 bg-flash-white rounded-3xl h-[48px]"
          />
          <Button className="ml-2 md:ml-3 main-button h-12 cursor-pointer px-9!">
            Apply
          </Button>
        </div>
        <Button
          onClick={() => console.log('Final:', finalTotal)}
          className="main-button h-12 cursor-pointer mt-2"
        >
          Go to Checkout <ArrowRight className="size-5" />
        </Button>
      </div>
    </div>
  );
};

export default SummaryOrder;
