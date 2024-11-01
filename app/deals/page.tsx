"use client";

import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { productsAtom } from "@/lib/store";
import { useEffect } from "react";
import { fetchProducts } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

export default function DealsPage() {
  const [products, setProducts] = useAtom(productsAtom);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, [setProducts]);

  // Simulate deals (in a real app, this would come from the backend)
  const deals = [
    {
      id: "deal1",
      title: "Bundle & Save",
      description: "Get 20% off when you buy any 3 items",
      image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=800",
      expires: "2024-04-01",
    },
    {
      id: "deal2",
      title: "First Order Discount",
      description: "15% off on your first order",
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&q=80&w=800",
      expires: "2024-04-15",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Special Deals & Offers
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {deals.map((deal, index) => (
          <motion.div
            key={deal.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative rounded-lg overflow-hidden"
          >
            <div className="absolute inset-0">
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
            <div className="relative p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">{deal.title}</h2>
              <p className="text-lg mb-6">{deal.description}</p>
              <div className="flex justify-between items-center">
                <Button size="lg" variant="secondary">
                  Shop Now
                </Button>
                <span className="text-sm">
                  Expires: {new Date(deal.expires).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Deals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}