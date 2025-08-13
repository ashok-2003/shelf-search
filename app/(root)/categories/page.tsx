"use client"
import { useState, useEffect } from 'react';
import { FilterSideBar, Platform } from './FilterSideBar';
import { FilterDrawer } from './FilterDrawer';
import { SimpleSearchComponent } from '@/components/simpleSearch';
import { CartButton } from '@/components/cart/cart-button';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SlidersHorizontal } from 'lucide-react';
import { CategoryCard } from './CategoryCard';


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
  {
    "name": "All",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center"
  },
  {
    "name": "Dairy Products", 
    "image": "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop&crop=center"
  },
  {
    "name": "Electronics",
    "image": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop&crop=center"
  },
  {
    "name": "Vegetables",
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop&crop=center"
  },
  {
    "name": "Grocery",
    "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center"
  },
  {
    "name": "Headphones",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center"
  },
  {
    "name": "Washing Machines",
    "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center"
  },
  {
    "name": "Medical",
    "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=center"
  },
  {
    "name": "Beauty",
    "image": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&crop=center"
  },
  {
    "name": "Sports",
    "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center"
  },
  {
    "name": "Books",
    "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center"
  },
  {
    "name": "Clothing",
    "image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop&crop=center"
  }
];



// Product interface
interface Product {
  name: string;
  price: number;
  platform: string;
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

          {/* Category Section with consistent spacing */}
          <div className="flex gap-4 px-1 pb-2 overflow-x-auto">
            {categories.map((category) => (
              <CategoryCard
                key={category.name}
                category={category}
                isSelected={selectedCategory === category.name}
                onClick={() => handleCategorySelect(category.name)}
              />
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