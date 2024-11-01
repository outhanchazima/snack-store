"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cartAtom, isCartOpenAtom } from "@/lib/store";
import { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [cart, setCart] = useAtom(cartAtom);
  const [, setIsCartOpen] = useAtom(isCartOpenAtom);

  const isInCart = cart.some((item) => item.productId === product.id);

  const addToCart = () => {
    if (!isInCart) {
      const defaultSize = product.sizes[0];
      setCart((items) => [
        ...items,
        {
          productId: product.id,
          sizeId: defaultSize.id,
          quantity: 1,
          price: defaultSize.price,
        },
      ]);
      setIsCartOpen(true);
    }
  };

  return (
    <Card className="group overflow-hidden">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/product/${product.id}`} className="flex-1">
            <h3 className="font-semibold hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          <Button variant="ghost" size="icon" className="shrink-0">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          {product.description.length > 100
            ? `${product.description.slice(0, 100)}...`
            : product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-semibold">
            {formatCurrency(product.sizes[0].price)}
          </span>
          <div className="text-sm text-muted-foreground">
            {product.rating} ★ ({product.reviews.length})
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={addToCart}
          disabled={isInCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isInCart ? "In Cart" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}