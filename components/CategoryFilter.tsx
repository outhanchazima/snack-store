"use client";

import { useAtom } from "jotai";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { selectedCategoryAtom } from "@/lib/store";

const categories = [
  { id: "all", name: "All" },
  { id: "chips", name: "Chips" },
  { id: "nuts", name: "Nuts" },
  { id: "chocolates", name: "Chocolates" },
  { id: "candies", name: "Candies" },
  { id: "drinks", name: "Drinks" },
  { id: "healthy", name: "Healthy" },
];

export function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

  return (
    <div className="mb-8 overflow-x-auto">
      <motion.div 
        className="flex space-x-2 min-w-max p-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="rounded-full"
          >
            {category.name}
          </Button>
        ))}
      </motion.div>
    </div>
  );
}