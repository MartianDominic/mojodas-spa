import { cn } from "@/lib/utils/cn";
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
      <div className="text-center py-20">
        <p className="text-on-surface-variant text-lg">
          Produktu nerasta pagal pasirinktus filtrus.
        </p>
      </div>
    );
  }

  return (
    <section
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12",
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
