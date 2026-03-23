"use client";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils/cn";
import {
  useCheckoutStore,
  type PaymentMethod,
  type LeasingTerm,
} from "@/stores/checkout";
import { useCartStore } from "@/stores/cart";

interface PaymentMethodsProps {
  className?: string;
}

interface PaymentOption {
  id: PaymentMethod;
  title: string;
  description: string;
  icon: string;
  highlighted?: boolean;
}

const paymentOptions: PaymentOption[] = [
  {
    id: "banklink",
    title: "Lietuvos Bankai",
    description: "Pervedimas per saugią banklink sistemą",
    icon: "account_balance",
  },
  {
    id: "card",
    title: "Kreditinė Kortelė",
    description: "Visa, Mastercard, American Express",
    icon: "credit_card",
  },
  {
    id: "leasing",
    title: "Lizingas (Mokėjimas dalimis)",
    description: "Nuo 245 € / mėn. – Jūsų ramybė be pradinio įnašo",
    icon: "payments",
    highlighted: true,
  },
];

const leasingTerms: LeasingTerm[] = [12, 24, 36, 48];

export function PaymentMethods({ className }: PaymentMethodsProps) {
  const { paymentMethod, leasingTerm, setPayment, setLeasingTerm } =
    useCheckoutStore();
  const total = useCartStore((state) => state.getTotal());

  const calculateMonthlyPayment = (term: LeasingTerm): number => {
    // Simple calculation - in reality would include interest
    const interestRate = 0.0799; // 7.99% annual
    const monthlyRate = interestRate / 12;
    const payment =
      (total * (monthlyRate * Math.pow(1 + monthlyRate, term))) /
      (Math.pow(1 + monthlyRate, term) - 1);
    return Math.round(payment);
  };

  return (
    <section className={cn("space-y-10", className)}>
      <div className="flex items-center gap-4">
        <span className="w-8 h-8 rounded-full border border-primary text-primary flex items-center justify-center text-sm font-medium">
          2
        </span>
        <h2 className="text-2xl font-light tracking-wide font-headline">
          Apmokėjimo būdas
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {paymentOptions.map((option) => {
          const isSelected = paymentMethod === option.id;

          return (
            <div key={option.id}>
              <div
                onClick={() => setPayment(option.id)}
                className={cn(
                  "p-6 border flex items-center justify-between transition-colors cursor-pointer group",
                  option.highlighted
                    ? "border-primary/20 bg-surface-container-low"
                    : "border-outline-variant/20 bg-surface-container-lowest",
                  isSelected && "border-primary"
                )}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={isSelected}
                    onChange={() => setPayment(option.id)}
                    className="text-primary focus:ring-0 bg-transparent border-neutral-300 rounded-none w-4 h-4 accent-primary"
                  />
                  <div>
                    <span className="block font-medium">{option.title}</span>
                    <span className="text-xs text-on-surface-variant">
                      {option.id === "leasing" && total > 0
                        ? `Nuo ${calculateMonthlyPayment(48)} € / mėn. – Jūsų ramybė be pradinio įnašo`
                        : option.description}
                    </span>
                  </div>
                </div>
                <div
                  className={cn(
                    "flex gap-2 transition-opacity",
                    option.highlighted
                      ? "text-primary"
                      : "opacity-60 group-hover:opacity-100"
                  )}
                >
                  <Icon name={option.icon} size="lg" />
                </div>
              </div>

              {/* Leasing Term Selector - shown when leasing is selected */}
              {option.id === "leasing" && isSelected && (
                <div className="bg-surface-container-low p-6 border border-t-0 border-primary/20 space-y-4">
                  <p className="text-sm text-on-surface-variant">
                    Pasirinkite mokėjimo laikotarpį:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {leasingTerms.map((term) => {
                      const isTermSelected = leasingTerm === term;
                      const monthlyPayment = calculateMonthlyPayment(term);

                      return (
                        <button
                          key={term}
                          onClick={() => setLeasingTerm(term)}
                          className={cn(
                            "flex flex-col items-center px-5 py-3 border transition-all",
                            isTermSelected
                              ? "border-primary bg-primary/5"
                              : "border-outline-variant/30 hover:border-primary/50"
                          )}
                        >
                          <span
                            className={cn(
                              "text-sm font-medium",
                              isTermSelected && "text-primary"
                            )}
                          >
                            {term} mėn.
                          </span>
                          {total > 0 && (
                            <span className="text-xs text-on-surface-variant mt-1">
                              {monthlyPayment} €/mėn.
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {total > 0 && (
                    <p className="text-xs text-on-surface-variant">
                      Mėnesinis mokėjimas:{" "}
                      <span className="text-primary font-medium">
                        {calculateMonthlyPayment(leasingTerm)} €
                      </span>{" "}
                      / {leasingTerm} mėn.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
