"use client";

import { useAtom } from "jotai";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import { isCartOpenAtom, cartAtom, cartTotalAtom } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export function Cart() {
  const [isOpen, setIsOpen] = useAtom(isCartOpenAtom);
  const [cart, setCart] = useAtom(cartAtom);
  const [total] = useAtom(cartTotalAtom);

  const updateQuantity = (productId: string, sizeId: string, delta: number) => {
    setCart((items) =>
      items.map((item) => {
        if (item.productId === productId && item.sizeId === sizeId) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean) as typeof cart
    );
  };

  const removeItem = (productId: string, sizeId: string) => {
    setCart((items) =>
      items.filter(
        (item) => !(item.productId === productId && item.sizeId === sizeId)
      )
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="left" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={`${item.productId}-${item.sizeId}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center justify-between py-4 border-b"
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{item.productId}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item.productId, item.sizeId, -1)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item.productId, item.sizeId, 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.productId, item.sizeId)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {cart.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Your cart is empty
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>

              <Button className="w-full" asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}