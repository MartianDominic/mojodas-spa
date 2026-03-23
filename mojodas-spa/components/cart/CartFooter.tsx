"use client";

import Link from "next/link";
import { Button, Icon } from "@/components/ui";
import { ROUTES } from "@/lib/constants/routes";
import { CartSummary } from "./CartSummary";

interface CartFooterProps {
  subtotal: number;
  onClose: () => void;
}

export function CartFooter({ subtotal, onClose }: CartFooterProps) {
  return (
    <footer className="p-8 bg-white border-t border-black/[0.03] space-y-6">
      <CartSummary subtotal={subtotal} />

      <Link href={ROUTES.CHECKOUT} onClick={onClose}>
        <Button variant="dark" size="lg" className="w-full rounded-xl group">
          SAUGUS ATSISKAITYMAS
          <Icon
            name="arrow_forward"
            size="sm"
            className="ml-4 group-hover:translate-x-1 transition-transform"
          />
        </Button>
      </Link>

      {/* Trust Badges */}
      <div className="flex justify-center items-center gap-6 pt-2">
        <div className="flex items-center gap-2 opacity-40">
          <Icon name="lock" size="sm" />
          <span className="text-[9px] uppercase font-bold tracking-widest">
            Saugus mokėjimas
          </span>
        </div>
        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
        <div className="flex items-center gap-2 opacity-40">
          <span className="text-[9px] uppercase font-bold tracking-widest">
            5 Metų Garantija
          </span>
        </div>
      </div>
    </footer>
  );
}
