"use client";

import { FilterSideBar, Platform } from './FilterSideBar';
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
  // New props to make FilterBar a controlled component
  selectedPlatforms: string[];
  maxPrice: number;
}

export function FilterDrawer({ isOpen, onClose, onPriceChange, onPlatformsChange, platformsData, selectedPlatforms, maxPrice }: FilterDrawerProps) {
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
            // Pass the state down as props
            selectedPlatforms={selectedPlatforms}
            maxPrice={maxPrice}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}