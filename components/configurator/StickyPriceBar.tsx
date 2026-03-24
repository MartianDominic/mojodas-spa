"use client";

import { useConfiguratorStore } from "@/stores/configurator";
import { useCartStore } from "@/stores/cart";
import { formatPrice } from "@/lib/utils/format";
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
    <div className="fixed bottom-0 left-0 w-full px-4 py-4 md:px-8 md:py-4 bg-surface/90 backdrop-blur-xl z-50 border-t border-on-surface/10 flex flex-col md:flex-row justify-between items-center gap-3 transition-transform translate-y-0 shadow-2xl">
      <div className="w-full md:w-auto flex justify-between md:justify-start items-center md:gap-12">
        <div className="flex flex-col">
          <span className="text-[10px] text-secondary font-semibold uppercase tracking-widest mb-0.5">
            Investicija
          </span>
          <span className="text-2xl md:text-3xl font-medium font-headline tracking-tight text-on-surface leading-none">
            {formatPrice(totalPrice)}
          </span>
        </div>
        <div className="hidden sm:flex flex-col items-start border-l border-on-surface/10 pl-6">
          <span className="text-[10px] text-secondary font-medium uppercase tracking-widest mb-0.5">
            Gamybos Statusas
          </span>
          <span className="text-xs font-semibold text-on-surface flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Priimame Užsakymus
          </span>
        </div>
      </div>
      
      <div className="w-full md:w-auto flex items-center gap-4">
        <div className="hidden lg:flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-widest text-secondary mb-0.5">
            Galimas Finansavimas
          </span>
          <span className="text-xs font-medium text-on-surface tracking-wide">
            {monthlyPayment} € / month
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full md:w-auto bg-primary text-white px-8 py-3.5 md:px-10 md:py-4 font-body font-bold tracking-[0.15em] uppercase text-[11px] hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all flex justify-center items-center group relative overflow-hidden rounded-sm shadow-md"
        >
          <span className="relative z-10 flex items-center">
            Rezervuoti Vietą
            <span className="material-symbols-outlined ml-3 text-[14px] group-hover:translate-x-1 group-hover:opacity-100 opacity-80 transition-all">
              arrow_forward
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
