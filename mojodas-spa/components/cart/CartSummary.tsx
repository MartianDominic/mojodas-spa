"use client";

import { formatPrice, formatMonthlyPayment } from "@/lib/utils/format";

interface CartSummaryProps {
  subtotal: number;
}

export function CartSummary({ subtotal }: CartSummaryProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
          Suma viso
        </span>
        <span className="text-2xl font-headline text-[#1A1A1A]">
          {formatPrice(subtotal)}
        </span>
      </div>
      <div className="flex items-center gap-2 py-2 px-3 bg-[#F8F8F8] rounded-lg">
        <span className="text-base">&#128179;</span>
        <p className="text-[11px] text-gray-500 font-medium">
          Išmanus mokėjimas dalimis:{" "}
          <span className="text-[#050505] font-bold italic">
            nuo {formatMonthlyPayment(subtotal)}
          </span>
        </p>
      </div>
    </div>
  );
}
