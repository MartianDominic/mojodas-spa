"use client";

import { Icon } from "@/components/ui";
import { formatPrice } from "@/lib/utils/format";

interface UpsellItem {
  id: string;
  name: string;
  price: number;
  icon: string;
}

interface UpsellEngineProps {
  onAddItem?: (item: UpsellItem) => void;
}

// Static upsell items (in a real app, these would come from an API based on cart contents)
const UPSELL_ITEMS: UpsellItem[] = [
  {
    id: "upsell-water-tester",
    name: "Išmanusis vandens testeris (WiFi)",
    price: 299,
    icon: "water_drop",
  },
  {
    id: "upsell-thermo-cover",
    name: "Užrakinamas termo-dangtis",
    price: 150,
    icon: "layers",
  },
];

export function UpsellEngine({ onAddItem }: UpsellEngineProps) {
  const handleAddItem = (item: UpsellItem) => {
    if (onAddItem) {
      onAddItem(item);
    }
    // In a real implementation, this would add the accessory to cart
    console.log("Add upsell item:", item);
  };

  return (
    <section className="pt-8 border-t border-black/[0.03]">
      <h4 className="text-xs tracking-widest font-bold uppercase text-gray-400 mb-6">
        IŠBAIGTAI PATIRTIAI
      </h4>
      <div className="space-y-4">
        {UPSELL_ITEMS.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-white rounded-xl border border-black/[0.03] hover:border-primary/20 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <Icon name={item.icon} className="text-primary/80" />
              <div>
                <p className="text-sm font-bold text-[#1A1A1A]">
                  {item.name}
                </p>
                <p className="text-sm text-primary font-bold">
                  + {formatPrice(item.price)}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleAddItem(item)}
              className="text-xs font-bold text-[#050505] tracking-tighter px-2 py-1 border border-black/5 hover:bg-black hover:text-white transition-all rounded"
            >
              [ + PRIDĖTI ]
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
