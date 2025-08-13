"use client";

import { FilterSideBar, Platform } from './FilterSideBar';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onPriceChange: (newPrice: number) => void;
  onPlatformsChange: (newPlatforms: string[]) => void;
  platformsData: Platform[];
}

export function FilterDrawer({ isOpen, onClose, onPriceChange, onPlatformsChange, platformsData }: FilterDrawerProps) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom" size="2xl">
      <DrawerContent className="w-full">
        <DrawerHeader>
          <h2 className="text-xl font-bold">Filters</h2>
        </DrawerHeader>
        <DrawerBody className="p-4">
          <FilterSideBar
            onPriceChange={onPriceChange}
            onPlatformsChange={onPlatformsChange}
            platformsData={platformsData}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}