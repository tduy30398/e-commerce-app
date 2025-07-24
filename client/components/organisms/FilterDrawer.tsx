import React from 'react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '@/components/ui/drawer';
import { X } from 'lucide-react';

interface FilterDrawerProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const FilterDrawer = ({
  trigger,
  title,
  description,
  children,
}: FilterDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="border-b-[1px] border-b-gray-200">
          <DrawerTitle className="text-xl font-bold text-left flex items-center justify-between">
            {title}
            <DrawerClose className="cursor-pointer">
              <X className="size-6" />
            </DrawerClose>
          </DrawerTitle>
          <DrawerDescription>{description || ''}</DrawerDescription>
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;
