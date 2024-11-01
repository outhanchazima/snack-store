"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { Heart, ShoppingCart, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cartAtom, isCartOpenAtom } from "@/lib/store";
import { fetchProductById } from "@/lib/api";
import { Product, ProductSize } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

// This function is required for static site generation with `output: export`
export async function generateStaticParams() {
  // In a real application, fetch all product IDs from your API
  const products = await fetch('https://api.example.com/products').then(res => res.json());
  
  return products.map((product: { id: string }) => ({
    id: product.id,
  }));
}

// Preload product data at build time
export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await fetchProductById(params.id);
  
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [{ url: product.images[0] }],
    },
  };
}

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [cart, setCart] = useAtom(cartAtom);
  const [, setIsCartOpen] = useAtom(isCartOpenAtom);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (typeof id === 'string') {
      fetchProductById(id).then((data) => {
        setProduct(data);
        if (data?.sizes.length) {
          setSelectedSize(data.sizes[0]);
        }
      });
    }
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-muted rounded-lg mb-8" />
          <div className="h-8 bg-muted rounded w-3/4 mb-4" />
          <div className="h-4 bg-muted rounded w-1/2" />
        </div>
      </div>
    );
  }

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
    // TODO: Implement wishlist functionality
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
            <Button
              size="lg"
              variant="outline"
              onClick={toggleWishlist}
            >
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
                <p className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                  {product.stock > 0 ? `${product.stock} units available` : "Out of stock"}
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