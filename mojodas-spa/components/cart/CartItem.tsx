"use client";

import Image from "next/image";
import { Icon } from "@/components/ui";
import { formatPrice } from "@/lib/utils/format";
import type { Product, SelectedConfiguration } from "@/types";

interface CartItemData {
  id: string;
  product: Product;
  quantity: number;
  configuration: SelectedConfiguration;
  configurationSummary: string;
  unitPrice: number;
}

interface CartItemProps {
  item: CartItemData;
  onRemove: (itemId: string) => void;
  onUpdateQuantity?: (itemId: string, quantity: number) => void;
}

export function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  const handleDecrement = () => {
    if (onUpdateQuantity && item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    } else if (item.quantity === 1) {
      onRemove(item.id);
    }
  };

  const handleIncrement = () => {
    if (onUpdateQuantity) {
      onUpdateQuantity(item.id, item.quantity + 1);
    }
  };

  return (
    <div className="flex gap-6 group">
      {/* Product Image */}
      <div className="w-24 h-24 shrink-0 overflow-hidden rounded-xl bg-surface-container-low">
        {item.product.images?.[0] ? (
          <Image
            src={item.product.images[0].url}
            alt={item.product.images[0].alt || item.product.name}
            width={96}
            height={96}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
            <Icon name="spa" className="text-gray-300" />
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-between py-1 flex-1">
        <div>
          <h3 className="font-headline text-lg leading-tight mb-1 text-[#1A1A1A]">
            {item.product.name}
          </h3>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">
            {item.configurationSummary || "Standartinė konfigūracija"}
          </p>
        </div>

        <div className="flex justify-between items-end w-full">
          <div className="flex items-center gap-3">
            <span className="font-bold text-sm tracking-tight text-[#050505]">
              {formatPrice(item.unitPrice * item.quantity)}
            </span>

            {/* Quantity Controls */}
            {onUpdateQuantity && item.quantity > 1 && (
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <button
                  onClick={handleDecrement}
                  className="w-5 h-5 flex items-center justify-center border border-black/10 rounded hover:bg-black hover:text-white transition-all"
                  aria-label="Sumažinti kiekį"
                >
                  -
                </button>
                <span className="min-w-[1rem] text-center font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="w-5 h-5 flex items-center justify-center border border-black/10 rounded hover:bg-black hover:text-white transition-all"
                  aria-label="Padidinti kiekį"
                >
                  +
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="text-xs text-gray-400 uppercase tracking-widest font-bold border-b border-transparent hover:border-gray-400 transition-all"
          >
            Pašalinti
          </button>
        </div>
      </div>
    </div>
  );
}
