"use client";

import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Button, Icon } from "@/components/ui";
import { CartItem } from "@/components/cart/CartItem";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { UpsellEngine } from "@/components/cart/UpsellEngine";
import { useCartStore } from "@/stores/cart";
import { formatPrice } from "@/lib/utils/format";
import { ROUTES } from "@/lib/constants/routes";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    getSubtotal,
    getTax,
    getTotal,
    getItemCount,
  } = useCartStore();

  const subtotal = getSubtotal();
  const tax = getTax();
  const total = getTotal();
  const itemCount = getItemCount();

  // Empty cart state
  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center pt-32">
          <div className="max-w-md w-full px-6">
            <EmptyCart onClose={() => {}} />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#FAFAFA] py-12 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="font-headline text-4xl md:text-5xl text-[#1A1A1A] mb-2">
            Jūsų krepšelis
          </h1>
          <p className="text-sm text-gray-500">
            {itemCount} {itemCount === 1 ? "prekė" : itemCount < 10 ? "prekės" : "prekių"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items List */}
            <div className="bg-white rounded-2xl shadow-sm border border-black/[0.03] p-6 sm:p-8 space-y-8">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeItem}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>

            {/* Upsell Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-black/[0.03] p-6 sm:p-8">
              <UpsellEngine />
            </div>
          </div>

          {/* Order Summary Section - Sticky */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-black/[0.03] p-6 sm:p-8 sticky top-8">
              <h2 className="font-headline text-2xl text-[#1A1A1A] mb-6">
                Užsakymo suvestinė
              </h2>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6 pb-6 border-b border-black/[0.05]">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Tarpinė suma
                  </span>
                  <span className="text-sm font-medium text-[#1A1A1A]">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    PVM (21%)
                  </span>
                  <span className="text-sm font-medium text-[#1A1A1A]">
                    {formatPrice(tax)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Pristatymas
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    Nemokamas
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-black/[0.05]">
                <span className="text-base font-medium text-gray-600 uppercase tracking-wider">
                  Viso mokėti
                </span>
                <span className="text-3xl font-headline text-[#1A1A1A]">
                  {formatPrice(total)}
                </span>
              </div>

              {/* Payment Info */}
              <div className="flex items-start gap-3 p-4 bg-[#F8F8F8] rounded-lg mb-6">
                <span className="text-xl">💳</span>
                <div>
                  <p className="text-xs font-bold text-[#1A1A1A] mb-1">
                    Mokėjimas dalimis
                  </p>
                  <p className="text-xs text-gray-500">
                    Skirstykite mokėjimą iki 36 mėnesių be papildomų mokesčių
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link href={ROUTES.CHECKOUT} className="block">
                  <Button
                    variant="dark"
                    size="lg"
                    className="w-full rounded-lg font-bold tracking-wider"
                  >
                    <Icon name="lock" size="sm" className="mr-2" />
                    PIRKTI DABAR
                  </Button>
                </Link>

                <Link href={ROUTES.CATALOG} className="block">
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full rounded-lg font-medium"
                  >
                    Tęsti apsipirkimą
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-black/[0.05] space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Icon name="verified" size="sm" className="text-green-600" />
                  <span>Saugus mokėjimas SSL</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Icon name="local_shipping" size="sm" className="text-blue-600" />
                  <span>Nemokamas pristatymas</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Icon name="verified_user" size="sm" className="text-purple-600" />
                  <span>5 metų garantija</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA - Mobile Only */}
        <div className="lg:hidden mt-8 sticky bottom-4 px-4">
          <Link href={ROUTES.CHECKOUT} className="block">
            <Button
              variant="dark"
              size="lg"
              className="w-full rounded-lg font-bold tracking-wider shadow-xl"
            >
              <Icon name="lock" size="sm" className="mr-2" />
              PIRKTI DABAR · {formatPrice(total)}
            </Button>
          </Link>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}
