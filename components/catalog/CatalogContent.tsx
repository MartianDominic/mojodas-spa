"use client";

import { useMemo } from "react";
import { FilterBar, useProductFilters, type FilterType } from "./FilterBar";
import { ProductGrid } from "./ProductGrid";
import type { ProductListItem } from "@/types";

interface CatalogContentProps {
  products: ProductListItem[];
}

/**
 * Client component that handles filtering and displays products
 * Receives products from server component, handles client-side filtering
 */
export function CatalogContent({ products }: CatalogContentProps) {
  const { activeFilter, onFilterChange } = useProductFilters("all");

  const filteredProducts = useMemo(() => {
    return filterProducts(products, activeFilter);
  }, [products, activeFilter]);

  return (
    <>
      <FilterBar activeFilter={activeFilter} onFilterChange={onFilterChange} />

      <section className="px-8 md:px-16 max-w-screen-2xl mx-auto">
        <ProductGrid products={filteredProducts} />

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-on-surface-variant text-lg">
              Pagal pasirinktus filtrus produktų nerasta.
            </p>
            <button
              onClick={() => onFilterChange("all")}
              className="mt-4 text-primary underline hover:no-underline"
            >
              Rodyti visus produktus
            </button>
          </div>
        )}
      </section>
    </>
  );
}

/**
 * Filter products based on selected filter type
 */
function filterProducts(
  products: ProductListItem[],
  filter: FilterType
): ProductListItem[] {
  switch (filter) {
    case "all":
      return products;

    case "small":
      // 2-4 person capacity
      return products.filter((p) => p.capacity.max <= 4);

    case "large":
      // 5+ person capacity
      return products.filter((p) => p.capacity.min >= 5 || p.capacity.max >= 5);

    case "round":
      return products.filter((p) => p.shape === "round");

    case "square":
      return products.filter((p) => p.shape === "square");

    case "therapeutic":
      return products.filter((p) => p.shape === "therapeutic");

    case "internal":
      // Internal heater
      return products.filter((p) => p.heaterType === "internal");

    case "external":
      // External heater (including regular external)
      return products.filter((p) => p.heaterType === "external");

    case "horizon":
      // Horizon variant
      return products.filter((p) => p.variant === "horizon");

    default:
      return products;
  }
}
