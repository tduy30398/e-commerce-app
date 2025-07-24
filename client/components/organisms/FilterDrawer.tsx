import React from 'react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const FilterDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="lg:hidden relative size-8 ml-4 cursor-pointer">
          <Image fill src="/icons/filter.svg" alt="filter" />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>
            This is a description inside the drawer.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4">
          {/* Add your custom content here */}
          <p>Some drawer content here...</p>
        </div>

        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;
