import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

// Define the type for a single platform object
export interface Platform {
  platform: string;
  deliveryTime: string;
  image: string;
}

// Define the props for the FilterBar component
interface FilterBarProps {
  onPriceChange: (newPrice: number) => void;
  onPlatformsChange: (newPlatforms: string[]) => void;
  platformsData: Platform[];
  maxPrice: number;
  selectedPlatforms: string[];
}

export function FilterSideBar({  onPriceChange, onPlatformsChange, platformsData, maxPrice, selectedPlatforms }: FilterBarProps) {
  

  // Handler for slider changes, updates local state and calls parent's prop function
  const handlePriceChange = (newPrice: number[]) => {
    onPriceChange(newPrice[0]);
  };

  
  const handlePlatformsChange = (platform: string, checked: boolean | string) => {
    let updatedPlatforms;
    if (checked) {
      updatedPlatforms = [...selectedPlatforms, platform];
    } else {
      updatedPlatforms = selectedPlatforms.filter((p) => p !== platform);
    }
    onPlatformsChange(updatedPlatforms);
  };

  return (
    <div className="flex flex-col max-h-screen gap-2 mx-2">
      <div className='max-h-1/5'>
        <h2 className="font-bold text-md">Filter</h2>
        <h5 className="text-xs ">Price Range</h5>
        <div className="mt-2">
          <div className="text-sm font-light text-right">max - {maxPrice}</div>
          <Slider
            className="mt-2"
            value={[maxPrice]}
            onValueChange={handlePriceChange}
            min={30}
            max={100}
          />
        </div>
      </div>
      <div className='mt-4 max-h-2/5'>
        <h2 className="font-bold text-md">Platforms</h2>
        {platformsData.map((p) => (
          <div key={p.platform} className="flex items-center my-2 space-x-2">
            <Checkbox
              id={p.platform}
              
              checked={selectedPlatforms.includes(p.platform)}
              onCheckedChange={(checked) => handlePlatformsChange(p.platform, checked)}
            />
            <label htmlFor={p.platform} className="text-sm">
              {p.platform}
            </label>
          </div>
        ))}
      </div>
      <div className='mt-4 max-h-2/5'>
        <h2 className="font-bold text-md">Brands</h2>
        {platformsData.map((p) => (
          <div key={p.platform} className="flex items-center my-2 space-x-2">
            <Checkbox
              id={p.platform}
              // Use the prop value to determine if the checkbox is checked
              checked={selectedPlatforms.includes(p.platform)}
              onCheckedChange={(checked) => handlePlatformsChange(p.platform, checked)}
            />
            <label htmlFor={p.platform} className="text-sm">
              {p.platform}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}