"use client";

import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { productsAtom } from "@/lib/store";
import { useEffect } from "react";
import { fetchProducts } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";

const categories = [
  {
    id: "chips",
    name: "Chips & Crisps",
    description: "Crunchy and flavorful potato chips and crisps",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "nuts",
    name: "Premium Nuts",
    description: "High-quality nuts and trail mixes",
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "chocolates",
    name: "Chocolates",
    description: "Delicious chocolate treats and confections",
    image: "https://images.unsplash.com/photo-1548907040-4d2be3f515b2?auto=format&fit=crop&q=80&w=800",
  },
  // Add more categories as needed
];

export default function CategoriesPage() {
  const [products, setProducts] = useAtom(productsAtom);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, [setProducts]);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Browse Categories
      </motion.h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
              <div className="absolute inset-0 bg-black/40 z-10" />
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-6">
                <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                <p className="text-center text-sm opacity-90">
                  {category.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-12">
        {categories.map((category) => {
          const categoryProducts = products.filter(
            (product) => product.category === category.id
          );

          return (
            categoryProducts.length > 0 && (
              <section key={category.id}>
                <h2 className="text-2xl font-bold mb-6">{category.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )
          );
        })}
      </div>
    </div>
  );
}