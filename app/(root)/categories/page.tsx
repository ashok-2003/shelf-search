"use client"
import { useState, useEffect } from 'react';
import { FilterSideBar, Platform } from './FilterSideBar';
import { SimpleSearchComponent } from '@/components/simpleSearch';
import { CartButton } from '@/components/cart/cart-button';

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
  // New state for the selected category
  const [selectedCategory, setSelectedCategory] = useState<string>("All"); 
  // State for the products
  const [products, setProducts] = useState<Product[]>([]);

  // Function to handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // useEffect to fetch products whenever filters or category change
  useEffect(() => {
    const fetchProducts = async () => {
      console.log('Fetching products with filters:', {
        maxPrice,
        selectedPlatforms,
        selectedCategory,
      });

      // Your backend API call would go here
      // const params = new URLSearchParams({
      //   maxPrice: maxPrice.toString(),
      //   platforms: selectedPlatforms.join(','),
      //   category: selectedCategory, // Add the category to your query parameters
      // }).toString();
      //
      // const response = await fetch(`your-api-endpoint/products?${params}`);
      // const data = await response.json();
      // setProducts(data);
    };

    fetchProducts();
  }, [maxPrice, selectedPlatforms, selectedCategory]); // Add selectedCategory to the dependency array

  return (
    <div className="flex flex-row gap-2">
      <div className="w-1/5 border border-red-500">
        <FilterSideBar
          onPriceChange={setMaxPrice}
          onPlatformsChange={setSelectedPlatforms}
          platformsData={availablePlatforms}
        />
      </div>
      <div className="w-4/5 border border-red-500">
        <div className="flex flex-col gap-4 m-2">
          <div className="flex flex-row justify-between">
            <div>
              <SimpleSearchComponent 
                className='w-32'
              />
            </div>
            <div>
              <CartButton />
            </div>
          </div>
          {/* Category section */}
          <div className="flex flex-row gap-4 p-2 overflow-x-auto border-b">
            {categories.map((category) => (
              <div
                key={category}
                className={`cursor-pointer px-4 py-2 rounded-full ${
                  selectedCategory === category ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'
                }`}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </div>
            ))}
          </div>
          <div>
            {/* You would render your products here */}
            <p>Products will be filtered based on:</p>
            <p>Max Price: {maxPrice}</p>
            <p>Selected Platforms: {selectedPlatforms.join(', ')}</p>
            <p>Selected Category: {selectedCategory}</p>
          </div>
        </div>
      </div>
    </div>
  );
}