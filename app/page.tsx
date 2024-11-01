"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryFilter } from "@/components/CategoryFilter";
import { SearchBar } from "@/components/SearchBar";
import { ShoppingBag } from "lucide-react";

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Premium Snacks Delivered
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Discover our curated selection of delicious snacks
        </p>
        <SearchBar />
      </motion.div>

      <CategoryFilter />

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ProductGrid />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-4 right-4 md:hidden"
      >
        <button
          className="bg-primary text-primary-foreground p-4 rounded-full shadow-lg"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ShoppingBag className="w-6 h-6" />
        </button>
      </motion.div>
    </div>
  );
}