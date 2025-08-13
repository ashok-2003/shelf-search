"use client"
import { useState, useEffect } from 'react';
import { FilterSideBar, Platform } from './FilterSideBar';
import { FilterDrawer } from './FilterDrawer';
import { SimpleSearchComponent } from '@/components/simpleSearch';
import { CartButton } from '@/components/cart/cart-button';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';

// Assuming this data would be fetched from an API in a real-world scenario
const availablePlatforms: Platform[] = [
  { platform: "Instamart", deliveryTime: "7 minutes", image: "https://tkrtxmjovnssevackzas.supabase.co/storage/v1/object/public/shelf-search//instamart.png" },
  { platform: "Amazon", deliveryTime: "2 days", image: "https://tkrtxmjovnssevackzas.supabase.co/storage/v1/object/public/shelf-search//amazon.jpg" },
  { platform: "Flipkart", deliveryTime: "1 day", image: "https://tkrtxmjovnssevackzas.supabase.co/storage/v1/object/public/shelf-search//flipcart.jpeg" },
  { platform: "Croma", deliveryTime: "2 days", image: "https://tkrtxmjovnssevackzas.supabase.co/storage/v1/object/public/shelf-search//croma.jpeg" },
  { platform: "Zepto", deliveryTime: "7 mins", image: "https://tkrtxmjovnssevackzas.supabase.co/storage/v1/object/public/shelf-search//zepto.png" },
  { platform: "Blinkit", deliveryTime: "6 minutes", image: "https://tkrtxmjovnssevackzas.supabase.co/storage/v1/object/public/shelf-search//Blinkit-yellow-app-icon.svg.png" }
];

// Mock category data
const categories = [
  "All",
  "Kitchen",
  "Electronics",
  "Grocery",
  "Clothes",
  "Home",
  "Beauty",
  "Toys",
  "Sports"
];

// Assuming a Product type exists
interface Product {
  // Define your product properties here
  name: string;
  price: number;
  platform: string;
  // ... other properties
}

export default function DocsPage() {
  // State for the filter values
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [products, setProducts] = useState<Product[]>([]);
  // New state for the mobile filter drawer visibility
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Function to handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // Handlers for the drawer
  const openFilterDrawer = () => setIsFilterDrawerOpen(true);
  const closeFilterDrawer = () => setIsFilterDrawerOpen(false);

  // useEffect to fetch products whenever filters or category change
  useEffect(() => {
    const fetchProducts = async () => {
      console.log('Fetching products with filters:', {
        maxPrice,
        selectedPlatforms,
        selectedCategory,
      });
      // Your backend API call would go here
    };
    fetchProducts();
  }, [maxPrice, selectedPlatforms, selectedCategory]);

  return (
    <div className="flex flex-row min-h-screen gap-2">
      {/* Desktop Filter Bar (visible on md screens and up) */}
      <div className="hidden w-1/5 min-h-screen border border-red-500 md:block">
        <FilterSideBar
          onPriceChange={setMaxPrice}
          onPlatformsChange={setSelectedPlatforms}
          platformsData={availablePlatforms}
        />
      </div>

      <div className="w-full border border-red-500 md:w-4/5">
        <div className="flex flex-col gap-4 m-2">
          <div className="grid w-full grid-cols-12 gap-1 sm:gap-2">
            {/* Filter Button for mobile screens */}
            <div className="col-span-2 md:hidden">
              <Button
                onClick={openFilterDrawer}
                variant="outline"
                className="flex items-center justify-center w-full gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
            </div>
            {/* Search Bar */}
            <div className="col-span-7 md:col-span-10">
              <SimpleSearchComponent className='w-full' />
            </div>

            <div className='col-span-1 md:hidden' />

            {/* Cart Button - aligned to the right */}
            <div className="col-span-2 justify-self-end">
              <CartButton />
            </div>
          </div>
          {/* Category section */}
          <div className="flex flex-row gap-4 p-2 overflow-x-auto border-b">
            {categories.map((category) => (
              <div
                key={category}
                className={`cursor-pointer px-4 py-2 rounded-full ${selectedCategory === category ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'
                  }`}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </div>
            ))}
          </div>
          <div>
            <p>Products will be filtered based on:</p>
            <p>Max Price: {maxPrice}</p>
            <p>Selected Platforms: {selectedPlatforms.join(', ')}</p>
            <p>Selected Category: {selectedCategory}</p>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer (conditionally rendered) */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={closeFilterDrawer}
        onPriceChange={setMaxPrice}
        onPlatformsChange={setSelectedPlatforms}
        platformsData={availablePlatforms}
      />
    </div>
  );
}