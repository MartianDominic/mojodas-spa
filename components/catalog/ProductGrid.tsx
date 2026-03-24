"use client";

import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "./ProductCard";
import type { ProductListItem } from "@/types";

interface ProductGridProps {
  products: ProductListItem[];
  className?: string;
}

/**
 * 3-column responsive product grid
 * Matches stitch: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12
 */
export function ProductGrid({ products, className }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 md:py-16 lg:py-20">
        <p className="text-on-surface-variant text-lg">
          Produktu nerasta pagal pasirinktus filtrus.
        </p>
      </div>
    );
  }

  return (
    <motion.section
      layout
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16",
        className
      )}
    >
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            key={product.id}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.section>
  );
}
