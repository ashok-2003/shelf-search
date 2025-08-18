"use client";

import { Button } from "@heroui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ShoppingCartIcon } from "lucide-react";
import { useState } from "react";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { IconShoppingCartFilled } from "@tabler/icons-react";
import { useCartItemCount } from "@/store/CartStore"; 

export const CartButton = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartItemsCount = useCartItemCount(); // Get count from store

    return (
        <>
            <Button
                size="lg"
                radius="sm"
                className="bg-[#176a43] text-white px-4 min-w-2 relative"
                onPress={() => setIsCartOpen(true)}
                isLoading={false}
            >
                {cartItemsCount > 0 ? (
                    <ShoppingCartIcon className="w-4 h-4" />
                ) : (
                    <ShoppingCart className="w-4 h-4" />
                )}
                <span className="hidden text-xs sm:inline">Cart</span>
                
                {/* Add badge for cart count */}
                {cartItemsCount > 0 && (
                    <Badge 
                        variant="destructive" 
                        className="absolute flex items-center justify-center w-5 h-5 p-0 text-xs -top-2 -right-2"
                    >
                        {cartItemsCount > 99 ? '99+' : cartItemsCount}
                    </Badge>
                )}
            </Button>

            {/* Cart Drawer */}
            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </>
    );
};