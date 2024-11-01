"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAtom } from "jotai";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isCartOpenAtom, cartItemCountAtom, userAtom } from "@/lib/store";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [, setIsCartOpen] = useAtom(isCartOpenAtom);
  const [cartItemCount] = useAtom(cartItemCountAtom);
  const [user] = useAtom(userAtom);

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold">
            SnackBox
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/categories" className="hover:text-primary">
              Categories
            </Link>
            <Link href="/deals" className="hover:text-primary">
              Special Deals
            </Link>
            <Link href="/about" className="hover:text-primary">
              About Us
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              asChild
            >
              <Link href={user ? "/profile" : "/auth"}>
                <User className="h-5 w-5" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link
                href="/categories"
                className="block hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/deals"
                className="block hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Special Deals
              </Link>
              <Link
                href="/about"
                className="block hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}