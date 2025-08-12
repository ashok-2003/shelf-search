"use client"
import { useState, useEffect } from 'react';
import { FilterBar, Platform } from './filter';

// Assuming this data would be fetched from an API in a real-world scenario
const availablePlatforms: Platform[] = [
  { platform: "Instamart", deliveryTime: "7 minutes", image: "https://tkrtxmjovnssevackzas.supabase.co/storage/v1/object/public/shelf-search//instamart.png" },
  { platform: "Amazon", deliveryTime: "2 days", image: "https://tkrtxmjovnssevackzas.supabase.co/storage/v1/object/public/shelf-search//amazon.jpg" },
  { platform: "Flipkart", deliveryTime: "1 day", image: "https://tkrtxmjovnssevackzas.supabase.co/storage/v1/object/public/shelf-search//flipcart.jpeg" },
  { platform: "Croma", deliveryTime: "2 days", image: "https://tkrtxmjovnssevackzas.supabase.co/storage/v1/object/public/shelf-search//croma.jpeg" },
  { platform: "Zepto", deliveryTime: "7 mins", image: "https://tkrtxmjovnssevackzas.supabase.co/storage/v1/object/public/shelf-search//zepto.png" },
  { platform: "Blinkit", deliveryTime: "6 minutes", image: "https://tkrtxmjovnssevackzas.supabase.co/storage/v1/object/public/shelf-search//Blinkit-yellow-app-icon.svg.png" }
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
  // State for the products
  const [products, setProducts] = useState<Product[]>([]);

  // useEffect to fetch products whenever filters change
  useEffect(() => {
    const fetchProducts = async () => {
      // In a real app, you would make an API call here with the filter parameters
      console.log('Fetching products with filters:', { maxPrice, selectedPlatforms });
      
      // Simulate an API call
      // const params = new URLSearchParams({
      //   maxPrice: maxPrice.toString(),
      //   platforms: selectedPlatforms.join(','),
      // }).toString();
      //
      // const response = await fetch(`your-api-endpoint/products?${params}`);
      // const data = await response.json();
      // setProducts(data);
      
      // For this example, we'll just log the changes
    };

    fetchProducts();
    
  }, [maxPrice, selectedPlatforms]);

  return (
    <div className="flex flex-row gap-2">
      <div className="w-1/5 gap-4 border border-red-500">
        <FilterBar
          onPriceChange={setMaxPrice}
          onPlatformsChange={setSelectedPlatforms}
          platformsData={availablePlatforms}
        />
      </div>
      <div className="w-4/5 border border-red-500">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div>search</div>
            <div>cart</div>
          </div>
          <div>categorries</div>
          <div>
            {/* You would render your products here */}
            <p>Products will be filtered based on:</p>
            <p>Max Price: {maxPrice}</p>
            <p>Selected Platforms: {selectedPlatforms.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}