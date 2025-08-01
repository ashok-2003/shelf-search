"use client";

import { Button } from "@heroui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ShoppingCartIcon } from "lucide-react";
import { useState } from "react";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { IconShoppingCartFilled } from "@tabler/icons-react";

interface CartButtonProps {
    cartItemsCount?: number;
}

export const CartButton = ({ cartItemsCount = 3 }: CartButtonProps) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <>
            <Button
                className="flex items-center gap-2 bg-[#176a43] text-white"
                onPress={() => setIsCartOpen(true)}
                isLoading={false}
            >
                {cartItemsCount > 0 ? (
                    <ShoppingCartIcon className="w-5 h-5" />
                ) : (
                    <ShoppingCart className="w-5 h-5" />
                )}
                <span className="hidden sm:inline">Cart</span>
            </Button>

            {/* Cart Drawer */}
            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </>
    );
};