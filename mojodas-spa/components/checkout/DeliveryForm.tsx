"use client";

import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils/cn";
import { useCheckoutStore } from "@/stores/checkout";

interface DeliveryFormProps {
  className?: string;
}

export function DeliveryForm({ className }: DeliveryFormProps) {
  const { customerInfo, deliveryInfo, updateCustomer, updateDelivery } =
    useCheckoutStore();

  return (
    <section className={cn("space-y-10", className)}>
      <div className="flex items-center gap-4">
        <span className="w-8 h-8 rounded-full border border-primary text-primary flex items-center justify-center text-sm font-medium">
          1
        </span>
        <h2 className="text-2xl font-light tracking-wide font-headline">
          Pristatymo Informacija
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
        {/* Full Name */}
        <Input
          id="fullName"
          type="text"
          label="Vardas ir Pavardė"
          value={customerInfo.fullName}
          onChange={(e) => updateCustomer({ fullName: e.target.value })}
        />

        {/* Email */}
        <Input
          id="email"
          type="email"
          label="El. Paštas"
          value={customerInfo.email}
          onChange={(e) => updateCustomer({ email: e.target.value })}
        />

        {/* Address - Full Width */}
        <div className="md:col-span-2">
          <Input
            id="address"
            type="text"
            label="Adresas (Gatvė, namo nr.)"
            value={deliveryInfo.address}
            onChange={(e) => updateDelivery({ address: e.target.value })}
          />
        </div>

        {/* City */}
        <Input
          id="city"
          type="text"
          label="Miestas"
          value={deliveryInfo.city}
          onChange={(e) => updateDelivery({ city: e.target.value })}
        />

        {/* Postal Code */}
        <Input
          id="postalCode"
          type="text"
          label="Pašto kodas"
          value={deliveryInfo.postalCode}
          onChange={(e) => updateDelivery({ postalCode: e.target.value })}
        />
      </div>

      {/* Special Delivery Option */}
      <div className="bg-surface-container-low p-8 border-l-4 border-primary">
        <label className="flex items-start gap-4 cursor-pointer">
          <input
            type="radio"
            checked={deliveryInfo.specialDelivery}
            onChange={() => updateDelivery({ specialDelivery: true })}
            className="mt-1 text-primary focus:ring-0 bg-transparent border-neutral-300 rounded-none w-5 h-5 accent-primary"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium tracking-wide">
                Specialus Pristatymas: Vilnius/Kaunas
              </span>
              <span className="text-primary font-bold">+0 €</span>
            </div>
            <p className="text-sm text-on-surface-variant font-light leading-relaxed">
              Privatus Lux Spa Nature logistikos servisas. Mūsų inžinieriai pristatys
              ir paruoš jūsų SPA naudojimui nemokamai šiuose regionuose.
            </p>
          </div>
        </label>
      </div>
    </section>
  );
}
