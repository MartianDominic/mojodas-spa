"use client";

import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils/cn";
import { useCartStore } from "@/stores/cart";

interface OrderSummaryProps {
  className?: string;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("lt-LT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function OrderSummary({ className }: OrderSummaryProps) {
  const items = useCartStore((state) => state.items);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const getTax = useCartStore((state) => state.getTax);
  const getTotal = useCartStore((state) => state.getTotal);

  const subtotal = getSubtotal();
  const tax = getTax();
  const total = getTotal();
  const netPrice = subtotal - tax;

  return (
    <div className={cn("space-y-8", className)}>
      <div className="bg-surface-container-low p-10 space-y-8">
        <h3 className="text-xl tracking-wide font-light font-headline">
          Jūsų Pasirinkimas
        </h3>

        {/* Cart Items */}
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="flex gap-6 items-center">
              <div className="w-32 aspect-[3/4] bg-neutral-200 overflow-hidden relative">
                {item.product.images?.[0] ? (
                  <Image
                    src={item.product.images[0].url}
                    alt={item.product.images[0].alt || item.product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                    <Icon
                      name="spa"
                      size="xl"
                      className="text-on-surface-variant"
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/10" />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-medium text-on-surface tracking-tight">
                  Kolekcija: {item.product.name}
                </h4>
                <p className="text-xs text-on-surface-variant font-light leading-relaxed uppercase tracking-tighter">
                  {item.configurationSummary}
                </p>
                <p className="text-sm font-medium mt-2">
                  {formatPrice(item.unitPrice)} €
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex gap-6 items-center">
            <div className="w-32 aspect-[3/4] bg-neutral-200 overflow-hidden relative">
              <img
                src="/images/products/order-placeholder.jpg"
                alt="High-end minimalist spa tub"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="font-medium text-on-surface tracking-tight">
                Kolekcija: Eteris S1
              </h4>
              <p className="text-xs text-on-surface-variant font-light leading-relaxed uppercase tracking-tighter">
                Obsidian Black apdaila / 8 purkštukų sistema / Ozoninis valymas
              </p>
              <p className="text-sm font-medium mt-2">12 400 €</p>
            </div>
          </div>
        )}

        {/* Price Breakdown */}
        <div className="space-y-4 pt-8 border-t border-outline-variant/30">
          <div className="flex justify-between text-sm text-on-surface-variant">
            <span>Tarpinė suma</span>
            <span>
              {items.length > 0 ? formatPrice(netPrice) : "10 247,93"} €
            </span>
          </div>
          <div className="flex justify-between text-sm text-on-surface-variant">
            <span>PVM (21%)</span>
            <span>{items.length > 0 ? formatPrice(tax) : "2 152,07"} €</span>
          </div>
          <div className="flex justify-between text-sm text-on-surface-variant">
            <span>Pristatymas ir montavimas</span>
            <span className="text-primary">NEMOKAMAI</span>
          </div>
          <div className="flex justify-between items-end pt-4">
            <span className="text-lg font-light tracking-wide">Viso</span>
            <span className="text-2xl font-light font-headline">
              {items.length > 0 ? formatPrice(total) : "12 400,00"} €
            </span>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="pt-8 space-y-6">
          <div className="flex gap-4 items-start">
            <Icon name="verified" filled className="text-primary" />
            <div>
              <span className="block text-xs font-bold uppercase tracking-widest text-on-surface mb-1">
                Garantuota Kokybė
              </span>
              <p className="text-xs text-on-surface-variant font-light leading-relaxed">
                5 metų garantija korpusui ir 2 metų elektronikai. MojoDas
                premium servisas 24/7.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <Icon name="security" className="text-primary" />
            <div>
              <span className="block text-xs font-bold uppercase tracking-widest text-on-surface mb-1">
                Saugi transakcija
              </span>
              <p className="text-xs text-on-surface-variant font-light leading-relaxed">
                Visi mokėjimai yra užšifruoti naudojant SSL sertifikatą bei
                atitinka PCI-DSS standartus.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="px-4 text-center">
        <p className="text-xs text-on-surface-variant italic">
          „Ramybė yra ne prabanga, o būtinybė. Mes ją suprojektavome Jums."
        </p>
      </div>
    </div>
  );
}
