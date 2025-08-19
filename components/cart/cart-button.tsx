"use client";

import { Button } from "@heroui/button";
import { ShoppingCart, ShoppingCartIcon } from "lucide-react";
import { useState } from "react";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { useCartItemCount } from "@/store/CartStore"; 

export const CartButton = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartItemsCount = useCartItemCount();

    return (
        <>
            <div className="relative inline-block">
                <Button
                    size="lg"
                    radius="sm"
                    className="bg-[#176a43] text-white px-4 min-w-2 lg:w-39"
                    onPress={() => setIsCartOpen(true)}
                    isLoading={false}
                >
                    {cartItemsCount > 0 ? (
                        <ShoppingCartIcon className="w-4 h-4 lg:w-6 lg:h-6" />
                    ) : (
                        <ShoppingCart className="w-4 h-4 lg:w-6 lg:h-6" />
                    )}
                    <span className="hidden text-md sm:inline">Cart</span>
                </Button>
                
                {/* Custom badge with more specific positioning */}
                {cartItemsCount > 0 && (
                    <span 
                        className="absolute z-20 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2"
                        style={{
                            fontSize: '10px',
                            lineHeight: '1'
                        }}
                    >
                        {cartItemsCount > 99 ? '99+' : cartItemsCount}
                    </span>
                )}
            </div>

            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </>
    );
};