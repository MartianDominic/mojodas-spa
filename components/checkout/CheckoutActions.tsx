"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { useCheckoutStore } from "@/stores/checkout";

interface CheckoutActionsProps {
  className?: string;
  onSubmit?: () => void;
}

export function CheckoutActions({ className, onSubmit }: CheckoutActionsProps) {
  const { termsAccepted, setTermsAccepted } = useCheckoutStore();

  const handleSubmit = () => {
    if (!termsAccepted) {
      return;
    }
    onSubmit?.();
  };

  return (
    <div className={cn("pt-6 border-t border-outline-variant/20", className)}>
      {/* Terms Checkbox */}
      <label className="flex items-start gap-3 mb-6 cursor-pointer">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="mt-0.5 text-primary focus:ring-0 bg-transparent border-neutral-300 rounded-none w-4 h-4 accent-primary"
        />
        <span className="text-sm text-on-surface-variant font-light leading-relaxed">
          Sutinku su{" "}
          <a href="#" className="text-primary underline hover:no-underline">
            paslaugų teikimo taisyklėmis
          </a>{" "}
          ir{" "}
          <a href="#" className="text-primary underline hover:no-underline">
            privatumo politika
          </a>
          .
        </span>
      </label>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!termsAccepted}
        className={cn(
          "w-full md:w-auto px-12 py-5 font-medium text-xs tracking-[0.2em] uppercase transition-all",
          "bg-gradient-to-r from-primary to-primary-container text-white",
          termsAccepted
            ? "hover:scale-[1.02] active:opacity-70"
            : "opacity-50 cursor-not-allowed"
        )}
      >
        Patvirtinti ir Sumokėti
      </button>

      <p className="mt-4 text-[10px] text-on-surface-variant uppercase tracking-widest text-center md:text-left">
        Paspausdami patvirtinate paslaugų teikimo taisykles.
      </p>
    </div>
  );
}
