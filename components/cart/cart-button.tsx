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
                size="lg"
                radius="sm"
                className="bg-[#176a43] text-white px-4 min-w-2"
                onPress={() => setIsCartOpen(true)}
                isLoading={false}
            >
                {cartItemsCount > 0 ? (
                    <ShoppingCartIcon className="w-4 h-4" />
                ) : (
                    <ShoppingCart className="w-4 h-4" />
                )}
                <span className="hidden text-xs sm:inline">Cart</span>
            </Button>

            {/* Cart Drawer */}
            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </>
    );
};