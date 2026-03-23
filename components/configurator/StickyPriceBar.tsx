"use client";

import { useConfiguratorStore } from "@/stores/configurator";
import { useCartStore } from "@/stores/cart";
import { formatPrice, formatMonthlyPayment } from "@/lib/utils/format";
import type { Product } from "@/types";

interface StickyPriceBarProps {
  product: Product;
}

export function StickyPriceBar({ product }: StickyPriceBarProps) {
  const { getTotalPrice, selections, getSelectionSummary } = useConfiguratorStore();
  const { addItem } = useCartStore();

  const totalPrice = getTotalPrice();
  const monthlyPayment = Math.ceil(totalPrice / 36);

  const handleAddToCart = () => {
    const summary = getSelectionSummary();
    addItem(product, selections, totalPrice, summary);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-between items-center px-12 py-6 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-2xl z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.06)] border-t border-neutral-200/20">
      <div className="flex flex-col">
        <span className="text-[10px] text-secondary font-semibold uppercase tracking-widest mb-1">
          Dabartinė kaina
        </span>
        <span className="text-2xl font-light font-headline tracking-tight text-neutral-900 dark:text-neutral-100">
          {formatPrice(totalPrice)}
        </span>
      </div>
      <div className="flex items-center space-x-8">
        <button className="hidden md:flex flex-col items-center group">
          <span className="material-symbols-outlined text-on-surface group-hover:text-primary transition-colors">
            payments
          </span>
          <span className="font-body font-semibold tracking-widest uppercase text-xs text-neutral-900 dark:text-neutral-100 mt-1">
            Lizingas nuo {monthlyPayment}€/mėn
          </span>
        </button>
        <button
          onClick={handleAddToCart}
          className="bg-[#AF8F55] text-white px-10 py-5 font-body font-bold tracking-[0.2em] uppercase text-xs hover:brightness-110 active:translate-y-0.5 transition-all flex items-center group"
        >
          Pridėti į krepšelį
          <span className="material-symbols-outlined ml-4 group-hover:translate-x-1 transition-transform">
            double_arrow
          </span>
        </button>
      </div>
    </div>
  );
}
