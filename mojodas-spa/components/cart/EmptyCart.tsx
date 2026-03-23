"use client";

import Link from "next/link";
import { Button, Icon } from "@/components/ui";
import { ROUTES } from "@/lib/constants/routes";

interface EmptyCartProps {
  onClose: () => void;
}

export function EmptyCart({ onClose }: EmptyCartProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      {/* Empty State Icon */}
      <div className="w-24 h-24 rounded-full bg-surface-container-low flex items-center justify-center mb-6">
        <Icon name="shopping_bag" size="xl" className="text-gray-300" />
      </div>

      {/* Message */}
      <h3 className="font-headline text-xl text-[#1A1A1A] mb-2">
        Jūsų krepšelis tuščias
      </h3>
      <p className="text-sm text-gray-500 mb-8 max-w-[280px]">
        Atrodo, kad dar nepridėjote jokių produktų. Atraskite mūsų premium SPA kolekcijas.
      </p>

      {/* CTA Buttons */}
      <div className="space-y-3 w-full max-w-[240px]">
        <Link href={ROUTES.CATALOG} onClick={onClose} className="block">
          <Button variant="dark" size="md" className="w-full rounded-lg">
            PERŽIŪRĖTI KATALOGĄ
          </Button>
        </Link>
        <button
          onClick={onClose}
          className="text-[10px] text-gray-400 uppercase tracking-widest font-bold border-b border-transparent hover:border-gray-400 transition-all w-full py-2"
        >
          Tęsti naršymą
        </button>
      </div>
    </div>
  );
}
