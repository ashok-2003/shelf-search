import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

export function FilterBar(){
    const [price, setPrice] = useState([100]);
    return(
        <div className="flex flex-col mx-2">
          <div className="h-1/5">
            <h2 className="font-bold text-md">Filter</h2>
            <h5 className="text-xs ">Price Range</h5>
            <div className="mt-2">
              <div className="text-sm font-light text-right">max - {price[0]}</div>
              <Slider
                className="mt-2"
                value={price}
                onValueChange={setPrice}
                min={30}
                max={100}
              />
            </div>
          </div>
          <div className="overflow-y-auto h-2/5">
            platforms
          </div>
          <div className="overflow-y-auto h-2/5">
            Brands
          </div>
        </div>
    )
}