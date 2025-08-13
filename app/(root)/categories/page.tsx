"use client"
import { useState, useEffect } from 'react';
import { FilterSideBar, Platform } from './FilterSideBar';
import { FilterDrawer } from './FilterDrawer';
import { SimpleSearchComponent } from '@/components/simpleSearch';
import { CartButton } from '@/components/cart/cart-button';
import { Card } from '@/components/ui/card';
import { SlidersHorizontal } from 'lucide-react';
import { CategoryCard } from './CategoryCard';
import { Products } from '@/lib/DemoData/CategoryDefault';
import { Image } from '@heroui/image';
import { Button } from '@heroui/button';

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
    "name": "Clothing",
    "image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop&crop=center"
  }
];

const result = Products

// Product interface
interface Product {
  name: string;
  price: number;
  platform: string;
}

export default function CategoryPage() {
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
    <div className="flex min-h-screen gap-2">
      {/* Filter Sidebar */}
      <div className="hidden w-1/5 h-full overflow-y-auto md:block">
        <FilterSideBar
          onPriceChange={setMaxPrice}
          onPlatformsChange={setSelectedPlatforms}
          platformsData={availablePlatforms}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full h-full md:w-4/5">
        {/* Fixed Header Section */}
        <div className="flex-shrink-0 p-2 space-y-4">
          {/* Search and Cart Row */}
          <div className="grid items-center w-full grid-cols-12 gap-1 sm:gap-2">
            <div className="col-span-2 md:hidden">
              <Button
                isIconOnly
                onPress={openFilterDrawer}
                variant="flat"
                className="items-center"
                size="lg"
                radius='sm'
              >
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
            </div>

            <div className="col-span-8 md:col-span-10">
              <SimpleSearchComponent className='w-full' />
            </div>

            
            <div className="col-span-2 justify-self-end">
              <CartButton />
            </div>
          </div>

          {/* Categories Row */}
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
        </div>

        {/* Scrollable Products Section */}
        <div className="flex-1 max-h-screen overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 p-2 rounded-sm md:grid-cols-5 lg:grid-cols-6 bg-default-50">
            {result.data.map((item, index) => (
              <div key={item.id} className="pb-1 mb-2 bg-white border rounded-sm shadow-md cursor-pointer border-default-100 hover:shadow-lg">
                <div className="flex items-center justify-center">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    className="object-contain rounded-sm"
                  />
                </div>
                <div className="mt-2 ml-1 text-left">
                  <p className="text-sm font-medium">{item.name}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Debug Info */}
          <div className="p-2">
            <p>Products will be filtered based on:</p>
            <p>Max Price: {maxPrice}</p>
            <p>Selected Platforms: {selectedPlatforms.join(', ')}</p>
            <p>Selected Category: {selectedCategory}</p>
            <p>result length: {result.data.length}</p>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
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