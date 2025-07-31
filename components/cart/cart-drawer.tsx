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
import Image from "next/image";
import { useState } from "react";

// Mock cart data - replace with your actual data
const mockCartItems = [
  {
    id: 1,
    name: "Diet Coke",
    size: "355ml",
    price: 300,
    quantity: 1,
    image: "/api/placeholder/50/50", // Replace with actual image
    platform: "blinkit"
  },
  {
    id: 2,
    name: "Fresh Apples",
    size: "1kg",
    price: 150,
    quantity: 2,
    image: "/api/placeholder/50/50", // Replace with actual image
    platform: "blinkit"
  },
  {
    id: 3,
    name: "Whole Milk",
    size: "1L",
    price: 80,
    quantity: 1,
    image: "/api/placeholder/50/50", // Replace with actual image
    platform: "blinkit"
  },
];

interface CartItem {
  id: number;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
  platform: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ 
  isOpen, 
  onClose,
}: CartDrawerProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = 80; // Mock discount
  const saved = 467; // Mock savings
  const total = subtotal - discount;

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout with items:", cartItems);
    // Implement checkout logic
    onClose();
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
        <DrawerHeader className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">My Cart</h3>
          {cartItems.length > 0 && (
            <Badge content={cartItems.length.toString()} color="primary">
              <ShoppingCart className="w-5 h-5" />
            </Badge>
          )}
        </DrawerHeader>

        <DrawerBody className="flex-1 p-0">
          {cartItems.length > 0 ? (
            <ScrollArea className="h-full">
              <div className="p-4 space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 border rounded-lg bg-default-50 border-default-200"
                    >
                      <div className="flex items-start gap-3">
                        {/* Item Image */}
                        <div className="flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="object-cover rounded-md"
                          />
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </h4>
                          <p className="mb-1 text-xs text-gray-500">{item.size}</p>
                          
                          {/* Platform Badge */}
                          <div className="inline-flex items-center px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
                            {item.platform}
                          </div>
                        </div>

                        {/* Remove Button */}
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          color="danger"
                          onPress={() => removeItem(item.id)}
                          className="flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Quantity Controls and Price */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="bordered"
                            onPress={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="min-w-[2rem] text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="bordered"
                            onPress={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="pt-4 border-t border-default-200">
                  <h4 className="mb-3 text-sm font-semibold">Order Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-red-600">-₹{discount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saved</span>
                      <span className="text-green-600">₹{saved}</span>
                    </div>
                    <div className="flex justify-between pt-2 text-base font-semibold border-t border-default-200">
                      <span>Total</span>
                      <span className="text-green-600">₹{total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          ) : (
            <div className="flex items-center justify-center flex-1 p-8">
              <div className="text-center text-gray-500">
                <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="mb-2 text-lg font-medium">Your cart is empty</p>
                <p className="text-sm">Add some items to get started!</p>
              </div>
            </div>
          )}
        </DrawerBody>

        {cartItems.length > 0 && (
          <DrawerFooter className="p-4 border-t">
            <Button 
              color="success"
              className="w-full font-semibold"
              size="lg"
              onPress={handleCheckout}
            >
              Pay ₹{total}
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};