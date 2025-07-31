"use client";

import { Button } from "@heroui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { CartDrawer } from "@/components/cart/cart-drawer";

interface CartButtonProps {
  cartItemsCount?: number;
}

export const CartButton = ({ cartItemsCount = 3 }: CartButtonProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Button
        variant="light"
        className="flex items-center gap-2 transition-colors hover:bg-default-100"
        onPress={() => setIsCartOpen(true)}
      >
        {cartItemsCount > 0 ? (
          <Badge content={cartItemsCount.toString()} color="primary">
            <ShoppingCart className="w-5 h-5" />
          </Badge>
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