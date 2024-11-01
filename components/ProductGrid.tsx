"use client";

import { useAtom } from "jotai";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import { productsAtom, searchQueryAtom, selectedCategoryAtom } from "@/lib/store";
import { useEffect } from "react";
import { fetchProducts } from "@/lib/api";

export function ProductGrid() {
  const [products, setProducts] = useAtom(productsAtom);
  const [searchQuery] = useAtom(searchQueryAtom);
  const [selectedCategory] = useAtom(selectedCategoryAtom);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, [setProducts]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
      {filteredProducts.length === 0 && (
        <div className="col-span-full text-center py-12 text-muted-foreground">
          No products found
        </div>
      )}
    </div>
  );
}