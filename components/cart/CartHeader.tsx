"use client";

import { Icon } from "@/components/ui";

interface CartHeaderProps {
  itemCount: number;
  onClose: () => void;
}

export function CartHeader({ itemCount, onClose }: CartHeaderProps) {
  return (
    <header className="px-8 pt-10 pb-6 flex flex-col gap-1 border-b border-black/[0.03]">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[#050505] font-bold text-xs tracking-[0.15em] uppercase">
          JŪSŲ UŽSAKYMAS
          {itemCount > 0 && (
            <span className="ml-2 text-gray-400">({itemCount})</span>
          )}
        </h2>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center hover:opacity-50 transition-opacity"
          aria-label="Uždaryti krepšelį"
        >
          <Icon name="close" size="md" />
        </button>
      </div>
      <p className="text-xs text-gray-500 font-medium tracking-wide">
        Pristatymas visoje Lietuvoje per 2–4 savaites.
      </p>
    </header>
  );
}
