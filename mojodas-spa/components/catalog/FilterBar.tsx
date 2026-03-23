"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils/cn";

export type FilterType =
  | "all"
  | "small"
  | "large"
  | "round"
  | "square"
  | "therapeutic"
  | "internal"
  | "external"
  | "horizon";

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  className?: string;
}

interface FilterButton {
  id: FilterType;
  label: string;
}

const FILTERS: FilterButton[] = [
  { id: "all", label: "Visi" },
  { id: "small", label: "2-4 Asmenims" },
  { id: "large", label: "5-9 Asmenims" },
  { id: "round", label: "Apvalus" },
  { id: "square", label: "Kvadratiniai" },
  { id: "therapeutic", label: "Šalčio terapija" },
  { id: "internal", label: "Integruota krosnelė" },
  { id: "external", label: "Išorinė krosnelė" },
  { id: "horizon", label: "Horizon" },
];

/**
 * Sticky filter bar matching stitch design
 * Horizontally scrollable on mobile, sticky below header
 */
export function FilterBar({
  activeFilter,
  onFilterChange,
  className,
}: FilterBarProps) {
  return (
    <section
      className={cn(
        "sticky top-[96px] z-40 w-full",
        "py-6 mb-20",
        "overflow-x-auto scrollbar-hide",
        "bg-surface/80 backdrop-blur-md",
        className
      )}
    >
      <div className="flex items-center gap-3 whitespace-nowrap px-8 md:px-16 max-w-screen-2xl mx-auto">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={cn(
              "px-8 py-3 font-label text-sm uppercase tracking-widest rounded-full transition-all",
              activeFilter === filter.id
                ? "bg-[#1A1A1A] text-white"
                : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </section>
  );
}

/**
 * Hook to manage filter state with URL sync capability
 */
export function useProductFilters(initialFilter: FilterType = "all") {
  const [activeFilter, setActiveFilter] = useState<FilterType>(initialFilter);

  const handleFilterChange = useCallback((filter: FilterType) => {
    setActiveFilter(filter);
    // Could sync to URL params here if needed
  }, []);

  return {
    activeFilter,
    onFilterChange: handleFilterChange,
  };
}
