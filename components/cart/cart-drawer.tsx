"use client";

import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { Button } from "@heroui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import clsx from "clsx";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Image } from "@heroui/image";
import { useCartStore, useCartItemCount } from "@/store/CartStore";
import { Separator } from "@/components/ui/separator";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ 
  isOpen, 
  onClose,
}: CartDrawerProps) => {
  const { cart, addItem, removeItem, clearCart } = useCartStore();
  const totalItems = useCartItemCount();
  
  // Get all platforms that have items
  const platforms = Object.keys(cart).filter(platform => cart[platform]?.length > 0);
  
  // Calculate platform-wise totals and grand total
  const calculatePlatformTotals = () => {
    const platformTotals: { [key: string]: { subtotal: number, discount: number, total: number, itemCount: number } } = {};
    let grandSubtotal = 0;
    let grandDiscount = 0;
    
    platforms.forEach(platform => {
      let platformSubtotal = 0;
      let platformDiscount = 0;
      let itemCount = 0;
      
      cart[platform]?.forEach(item => {
        if (item.price) {
          const itemPrice = item.price * item.quantity;
          platformSubtotal += itemPrice;
          itemCount += item.quantity;
          
          if (item.discount) {
            const discountAmount = (itemPrice * item.discount) / 100;
            platformDiscount += discountAmount;
          }
        }
      });
      
      platformTotals[platform] = {
        subtotal: platformSubtotal,
        discount: platformDiscount,
        total: platformSubtotal - platformDiscount,
        itemCount
      };
      
      grandSubtotal += platformSubtotal;
      grandDiscount += platformDiscount;
    });
    
    return {
      platformTotals,
      grandTotal: {
        subtotal: grandSubtotal,
        discount: grandDiscount,
        total: grandSubtotal - grandDiscount
      }
    };
  };

  const { platformTotals, grandTotal } = calculatePlatformTotals();

  
  const handleIncreaseQuantity = (item: any, platform: string) => {
    const productData = {
      productName: item.productName,
      price: item.price,
      discount: item.discount,
      imageUrl: item.imageUrl,
      brand: item.brand,
      category: item.category,
      stock: item.stock,
      deliveryTime: item.deliveryTime,
    };

    addItem(item.productId, platform, item.platformLogo, 1, productData);
  };

  const handleDecreaseQuantity = (productId: string, platform: string) => {
    removeItem(productId, platform, 1);
  };

  const handleRemoveItem = (productId: string, platform: string) => {
    removeItem(productId, platform);
  };

  const handlePlatformCheckout = (platform: string) => {
    console.log(`Proceeding to checkout for ${platform}:`, cart[platform]);
    // Implement platform-specific checkout logic
    // In real implementation, this would redirect to platform's checkout flow
  };

  // Platform color mapping
  const getPlatformColor = (platform: string) => {
    const colors = {
      'Zepto': 'bg-purple-100 text-purple-800 border-purple-200',
      'Blinkit': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Instamart': 'bg-green-100 text-green-800 border-green-200',
      'Amazon': 'bg-orange-100 text-orange-800 border-orange-200',
      'Flipkart': 'bg-blue-100 text-blue-800 border-blue-200',
      'Croma': 'bg-red-100 text-red-800 border-red-200',
      'default': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[platform as keyof typeof colors] || colors.default;
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      size="md"
      classNames={{
        base: "sm:max-w-md max-w-xs",
        wrapper: "overflow-hidden",
      }}
    >
      <DrawerContent>
        <DrawerHeader className="flex items-center gap-4 p-4 border-b">
          {totalItems > 0 && (
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-600"
            >
              <span className="text-sm font-bold text-center">Clear All</span>
              
            </button>
          )}
        </DrawerHeader>

        <DrawerBody className="flex-1 p-0">
          {totalItems > 0 ? (
            <ScrollArea className="h-full">
              <div className="pt-1 pl-2 pr-4 space-y-4">
                {/* Platform-wise Cart Items */}
                {platforms.map((platform, platformIndex) => (
                  <div key={platform} className="overflow-y-auto border rounded-lg border-default-200">
                    {/* Platform Header with Total */}
                    <div className="p-3 bg-default-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {cart[platform][0]?.platformLogo && (
                            <Image
                              src={cart[platform][0].platformLogo}
                              alt={platform}
                              width={20}
                              height={20}
                              className="rounded-sm"
                            />
                          )}
                          <h4 className="font-semibold text-gray-900">{platform}</h4>
                          <Badge variant="secondary" className="ml-2">
                            {platformTotals[platform]?.itemCount} items
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-default-700">
                            ₹{platformTotals[platform]?.total.toFixed(2)}
                          </p>
                          {platformTotals[platform]?.discount > 0 && (
                            <p className="text-xs text-green-500">
                              Saved ₹{platformTotals[platform]?.discount.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Platform Items*/}
                    <div className="p-3 space-y-2 ">
                      {cart[platform].map((item: any) => (
                        <div
                          key={item.productId}
                          className="flex items-center gap-3 py-2 border-b border-default-100"
                        >
                          
                          <div className="flex-shrink-0">
                            <Image
                              src={item.imageUrl}
                              alt={item.productName}
                              width={40}
                              height={40}
                              className="object-cover rounded-md"
                            />
                          </div>

                          {/* Item Details - Compact */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-default-800 line-clamp-1">
                              {item.productName}
                            </p>
                            {item.brand && (
                              <p className="text-xs text-default-400">{item.brand}</p>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="bordered"
                              onPress={() => handleDecreaseQuantity(item.productId, platform)}
                              className="w-6 h-6 min-w-6"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-medium min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              isIconOnly
                              size="sm"
                              variant="bordered"
                              onPress={() => handleIncreaseQuantity(item, platform)}
                              className="w-6 h-6 min-w-6"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          {/* Total Price */}
                          <div className="text-right min-w-[50px]">
                            <p className="text-sm font-semibold text-gray-900">
                              ₹{item.discount 
                                ? ((item.price * (1 - item.discount / 100)) * item.quantity).toFixed(2)
                                : (item.price * item.quantity).toFixed(2)
                              }
                            </p>
                          </div>

                          {/* Remove Button */}
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="danger"
                            onPress={() => handleRemoveItem(item.productId, platform)}
                            className="w-6 h-6 min-w-6"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    {/* Platform Checkout Button */}
                    <div className="w-full">
                      <Button
                        radius="none"
                        className="w-full bg-[#176a43] text-white"
                        onPress={() => handlePlatformCheckout(platform)}
                      >
                        Checkout {platform}  ₹{platformTotals[platform]?.total.toFixed(2)}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex items-center justify-center flex-1 p-8">
              <div className="text-center text-gray-500">
                <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="mb-2 text-lg font-medium">Your cart is empty</p>
                <p className="text-sm">Add some items to get started!</p>
                <Button 
                  variant="bordered" 
                  className="mt-4"
                  onPress={onClose}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </DrawerBody>

        {/* Grand Total Footer */}
        {/* {totalItems > 0 && (
          <DrawerFooter className="border-t bg-default-50">
            
              <div className="w-full space-y-2 text-sm">
                <div className="flex justify-between text-sm font-light">
                  <span className="text-default-600">Total Items</span>
                  <span>{totalItems} items</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-default-800">Total Amount</span>
                  <span>₹{grandTotal.subtotal.toFixed(2)}</span>
                </div>
                {grandTotal.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-green-600">Total Savings</span>
                    <span className="text-green-600">-₹{grandTotal.discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold text-md">
                  <span>Grand Total</span>
                  <span>₹{grandTotal.total.toFixed(2)}</span>
                </div>
              </div>
            
          </DrawerFooter>
        )} */}
      </DrawerContent>
    </Drawer>
  );
};