"use client"
import { useState, useEffect } from 'react';
import { Image } from '@heroui/image';
import { Button } from '@heroui/button';
import { SlidersHorizontal, ChevronDown, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/store/CartStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Individual Product Card Component
export const ProductCard = ({ item }: { item: any }) => {
  const { addItem, removeItem, getItemQuantity } = useCartStore();
  const [selectedPlatform, setSelectedPlatform] = useState(item.platformPrices[0]); // Default to first platform

  const quantity = getItemQuantity(item.id, selectedPlatform.platform);

  const handleAddToCart = () => {
    addItem(
      item.id,
      selectedPlatform.platform,
      selectedPlatform.image,
      1
    );
  };

  const handleRemoveFromCart = () => {
    removeItem(item.id, selectedPlatform.platform, 1);
  };

  const calculateDiscountedPrice = (price: number, discount: number = 0) => {
    return discount > 0 ? price - (price * discount / 100) : price;
  };

  return (
    <div className="pb-2 mb-2 bg-white border rounded-sm shadow-md cursor-pointer border-default-100 hover:shadow-lg">
      <div className="flex items-center justify-center p-2">
        <Image
          src={item.imageUrl}
          alt={item.name}
          className="object-contain w-full h-32 rounded-sm"
        />
      </div>
      
      <div className="px-2 space-y-2">
        {/* Product Name */}
        <p className="text-sm font-medium text-left line-clamp-2">{item.name}</p>
        
        {/* Brand */}
        {item.brand && (
          <p className="text-xs text-gray-600">{item.brand}</p>
        )}

        {/* Platform Selection Dropdown */}
        <div className="w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="bordered"
                size="sm"
                className="justify-between w-full h-8"
              >
                <div className="flex items-center gap-2">
                  <img 
                    src={selectedPlatform.image} 
                    alt={selectedPlatform.platform}
                    className="w-4 h-4"
                  />
                  <span className="text-xs">{selectedPlatform.platform}</span>
                </div>
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              {item.platformPrices.map((platform: any) => (
                <DropdownMenuItem
                  key={platform.platform}
                  onClick={() => setSelectedPlatform(platform)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <img 
                      src={platform.image} 
                      alt={platform.platform}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{platform.platform}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      ₹{calculateDiscountedPrice(platform.price, platform.discount).toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {platform.deliveryTime}
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Price Display */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-green-600">
              ₹{calculateDiscountedPrice(selectedPlatform.price, selectedPlatform.discount).toFixed(2)}
            </span>
            {selectedPlatform.discount > 0 && (
              <>
                <span className="text-xs text-gray-500 line-through">
                  ₹{selectedPlatform.price}
                </span>
                <span className="px-1 text-xs text-green-600 bg-green-100 rounded">
                  {selectedPlatform.discount.toFixed(1)}% OFF
                </span>
              </>
            )}
          </div>
          <div className="text-xs text-gray-500">
            🚚 {selectedPlatform.deliveryTime}
          </div>
        </div>

        {/* Cart Controls */}
        <div className="mt-2">
          {quantity > 0 ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  isIconOnly
                  size="sm"
                  variant="bordered"
                  onPress={handleRemoveFromCart}
                  className="h-7 w-7"
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="text-sm font-medium min-w-[20px] text-center">
                  {quantity}
                </span>
                <Button
                  isIconOnly
                  size="sm"
                  variant="bordered"
                  onPress={handleAddToCart}
                  className="h-7 w-7"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
              <span className="text-xs font-medium text-green-600">In Cart</span>
            </div>
          ) : (
            <Button
              size="sm"
              className="w-full bg-[#176a43] text-white h-8"
              onPress={handleAddToCart}
            >
              Add to Cart
            </Button>
          )}
        </div>

        {/* Stock Status */}
        <div className="text-xs text-center">
          <span className={item.stock === 'In Stock' ? 'text-green-600' : 'text-red-600'}>
            {item.stock}
          </span>
        </div>
      </div>
    </div>
  );
};