"use client";

import { useMemo } from "react";
import { FilterBar, useProductFilters, type FilterState } from "./FilterBar";
import { ProductGrid } from "./ProductGrid";
import type { ProductListItem } from "@/types";

interface CatalogContentProps {
  products: ProductListItem[];
}

export function CatalogContent({ products }: CatalogContentProps) {
  const { activeFilters, onFilterChange, onClearFilters } = useProductFilters();

  const filteredProducts = useMemo(() => {
    return filterProducts(products, activeFilters);
  }, [products, activeFilters]);

  return (
    <>
      <FilterBar 
        activeFilters={activeFilters} 
        onFilterChange={onFilterChange} 
        onClearFilters={onClearFilters}
        productCount={filteredProducts.length}
      />

      <section className="px-6 md:px-8 w-full">
        <div className="max-w-screen-2xl mx-auto">
          <ProductGrid products={filteredProducts} />

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-24 flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl text-outline-variant mb-6">
                filter_list_off
              </span>
              <p className="font-headline text-2xl text-on-surface mb-2">
                Nerasta atitikmenų
              </p>
              <p className="text-secondary mb-8 max-w-md">
                Pagal Jūsų pasirinktus techninius parametrus modelių neradome. Pabandytumėte sušvelninti filtrus.
              </p>
              <button
                onClick={onClearFilters}
                className="bg-on-surface text-surface px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-on-surface/90 transition-colors rounded-sm"
              >
                Išvalyti visus filtrus
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function filterProducts(
  products: ProductListItem[],
  state: FilterState
): ProductListItem[] {
  return products.filter((p) => {
    // 1. Shape Filter
    if (state.shape.length > 0) {
      if (!state.shape.includes(p.shape)) return false;
    }

    // 2. Capacity Filter
    if (state.capacity.length > 0) {
      const isSmall = p.capacity.max <= 4;
      const isLarge = p.capacity.min >= 5 || p.capacity.max >= 5;
      
      const smallMatch = state.capacity.includes("small") && isSmall;
      const largeMatch = state.capacity.includes("large") && isLarge;
      
      if (!smallMatch && !largeMatch) return false;
    }

    // 3. Heater Type Filter
    if (state.heaterType.length > 0) {
      if (!state.heaterType.includes(p.heaterType)) return false;
    }

    // 4. Features Filter (logical AND for features - if they select 2 features, product must have both)
    if (state.features.length > 0) {
      for (const feature of state.features) {
        // We safely cast feature string to the boolean key in filterableSpecs
        if (p.filterableSpecs && (p.filterableSpecs as any)[feature] !== true) {
          return false;
        }
      }
    }

    return true; // Passed all filters
  });
}
