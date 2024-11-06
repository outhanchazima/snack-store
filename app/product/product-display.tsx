// app/product/[id]/product-display.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cartAtom, isCartOpenAtom } from "@/lib/store";
import { Product, ProductSize } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { Check, Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDisplayProps {
  initialProduct: Product;
}

export default function ProductDisplay({ initialProduct }: ProductDisplayProps) {
  const [product] = useState<Product>(initialProduct);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    initialProduct.sizes[0]
  );
  const [cart, setCart] = useAtom(cartAtom);
  const [, setIsCartOpen] = useAtom(isCartOpenAtom);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const isInCart = cart.some(
    (item) => item.productId === product.id && item.sizeId === selectedSize?.id
  );

  const addToCart = () => {
    if (!selectedSize || isInCart) return;
    
    setCart((items) => [
      ...items,
      {
        productId: product.id,
        sizeId: selectedSize.id,
        quantity: 1,
        price: selectedSize.price,
      },
    ]);
    setIsCartOpen(true);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-square rounded-lg overflow-hidden"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="flex items-center space-x-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < product.rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-muted-foreground">
              ({product.reviews.length} reviews)
            </span>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Select Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size.id}
                  variant={selectedSize?.id === size.id ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                >
                  {size.name} ({size.weight}) - {formatCurrency(size.price)}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              size="lg"
              className="flex-1"
              onClick={addToCart}
              disabled={!selectedSize || isInCart}
            >
              {isInCart ? (
                <>
                  <Check className="mr-2 h-5 w-5" /> In Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </>
              )}
            </Button>
            <Button size="lg" variant="outline" onClick={toggleWishlist}>
              <Heart
                className={`h-5 w-5 ${
                  isWishlisted ? "fill-current text-red-500" : ""
                }`}
              />
            </Button>
          </div>

          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Health Benefits</h3>
                <ul className="list-disc list-inside space-y-1">
                  {product.healthBenefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Stock Status</h3>
                <p
                  className={product.stock > 0 ? "text-green-600" : "text-red-600"}
                >
                  {product.stock > 0
                    ? `${product.stock} units available`
                    : "Out of stock"}
                </p>
              </div>
            </TabsContent>
            <TabsContent value="ingredients">
              <ul className="list-disc list-inside space-y-1">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="space-y-4">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{review.userName}</span>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                  <span className="text-sm text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}