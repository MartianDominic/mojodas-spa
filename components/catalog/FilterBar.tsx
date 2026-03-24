"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

export interface FilterState {
  shape: string[];
  capacity: string[];
  heaterType: string[];
  features: string[];
}

export const INITIAL_FILTER_STATE: FilterState = {
  shape: [],
  capacity: [],
  heaterType: [],
  features: [],
};

interface FilterBarProps {
  activeFilters: FilterState;
  onFilterChange: (category: keyof FilterState, value: string) => void;
  onClearFilters: () => void;
  productCount: number;
  className?: string;
}

const FILTER_CONFIG = [
  {
    id: "shape" as keyof FilterState,
    label: "Forma",
    options: [
      { value: "round", label: "Apvalus" },
      { value: "square", label: "Kvadratinis" },
    ],
  },
  {
    id: "capacity" as keyof FilterState,
    label: "Talpa",
    options: [
      { value: "small", label: "2-4 asmenys" },
      { value: "large", label: "5-9 asmenys" },
    ],
  },
  {
    id: "heaterType" as keyof FilterState,
    label: "Krosnelė",
    options: [
      { value: "internal", label: "Integruota" },
      { value: "external", label: "Išorinė" },
    ],
  },
  {
    id: "features" as keyof FilterState,
    label: "Savybės",
    options: [
      { value: "hasWaterJets", label: "Vandens Masąžas" },
      { value: "hasAirJets", label: "Oro Masažas" },
      { value: "hasLED", label: "LED Apšvietimas" },
      { value: "isColdTherapy", label: "Šalčio Terapija" },
    ],
  },
];

export function FilterBar({
  activeFilters,
  onFilterChange,
  onClearFilters,
  productCount,
  className,
}: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Count total active filters
  const activeCount = Object.values(activeFilters).reduce(
    (acc, arr) => acc + arr.length,
    0
  );

  return (
    <div className={cn("w-full relative z-40 mb-12 md:mb-20", className)}>
      <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-on-surface py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-full border border-on-surface flex items-center justify-center group-hover:bg-on-surface group-hover:text-surface transition-colors">
                <span className="material-symbols-outlined text-sm">
                  {isOpen ? "close" : "tune"}
                </span>
              </div>
              <span className="font-headline text-lg uppercase tracking-widest mt-0.5">
                Filtravimo Parametrai
              </span>
              {activeCount > 0 && (
                <span className="w-5 h-5 bg-primary text-white rounded-full text-[10px] font-bold flex items-center justify-center mt-0.5">
                  {activeCount}
                </span>
              )}
            </button>
          </div>
          <span className="font-body text-xs uppercase tracking-[0.2em] font-medium text-secondary">
            {productCount} {productCount === 1 ? "Modelis" : "Modeliai"}
          </span>
        </div>

        {/* Expandable Parameters Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-b border-outline-variant bg-surface"
            >
              <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                {FILTER_CONFIG.map((group) => (
                  <div key={group.id} className="flex flex-col">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-medium text-secondary mb-6">
                      {group.label}
                    </h4>
                    <div className="flex flex-col gap-3">
                      {group.options.map((option) => {
                        const isSelected = activeFilters[group.id].includes(
                          option.value
                        );
                        return (
                          <label
                            key={option.value}
                            className="flex items-center cursor-pointer group"
                          >
                            <div
                              className={cn(
                                "w-4 h-4 border flex items-center justify-center mr-4 transition-colors rounded-sm",
                                isSelected
                                  ? "bg-on-surface border-on-surface"
                                  : "border-outline-variant group-hover:border-on-surface"
                              )}
                            >
                              {isSelected && (
                                <span className="material-symbols-outlined text-[10px] font-bold text-surface">
                                  check
                                </span>
                              )}
                            </div>
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={isSelected}
                              onChange={() =>
                                onFilterChange(group.id, option.value)
                              }
                            />
                            <span
                              className={cn(
                                "text-sm tracking-wide transition-colors",
                                isSelected
                                  ? "text-on-surface font-medium"
                                  : "text-secondary group-hover:text-on-surface"
                              )}
                            >
                              {option.label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              {/* Drawer Footer Actions */}
              <div className="flex justify-end pb-8">
                {activeCount > 0 && (
                  <button
                    onClick={onClearFilters}
                    className="text-xs uppercase tracking-widest text-primary font-semibold hover:opacity-80 transition-opacity"
                  >
                    Išvalyti visus
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function useProductFilters() {
  const [activeFilters, setActiveFilters] = useState<FilterState>(
    INITIAL_FILTER_STATE
  );

  const handleFilterChange = useCallback(
    (category: keyof FilterState, value: string) => {
      setActiveFilters((prev) => {
        const currentArr = prev[category];
        const isSelected = currentArr.includes(value);

        return {
          ...prev,
          [category]: isSelected
            ? currentArr.filter((item) => item !== value)
            : [...currentArr, value],
        };
      });
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setActiveFilters(INITIAL_FILTER_STATE);
  }, []);

  return {
    activeFilters,
    onFilterChange: handleFilterChange,
    onClearFilters: handleClearFilters,
  };
}
