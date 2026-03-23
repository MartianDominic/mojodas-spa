"use client";

import { cn } from "@/lib/utils/cn";
import type { CheckoutStep } from "@/stores/checkout";

interface StepIndicatorProps {
  currentStep: CheckoutStep;
  className?: string;
}

interface Step {
  number: CheckoutStep;
  label: string;
}

const steps: Step[] = [
  { number: 1, label: "Pristatymas" },
  { number: 2, label: "Apmokėjimas" },
];

export function StepIndicator({ currentStep, className }: StepIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-8", className)}>
      {steps.map((step, index) => {
        const isActive = currentStep === step.number;
        const isCompleted = currentStep > step.number;

        return (
          <div key={step.number} className="flex items-center gap-3">
            <span
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                isActive
                  ? "border border-primary text-primary"
                  : isCompleted
                  ? "bg-primary text-on-primary"
                  : "border border-outline-variant/30 text-on-surface-variant"
              )}
            >
              {isCompleted ? (
                <span className="material-symbols-outlined text-sm">check</span>
              ) : (
                step.number
              )}
            </span>
            <span
              className={cn(
                "text-sm tracking-wide",
                isActive
                  ? "text-primary font-medium"
                  : isCompleted
                  ? "text-on-surface"
                  : "text-on-surface-variant"
              )}
            >
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <span className="w-8 h-px bg-outline-variant/30 mx-2" />
            )}
          </div>
        );
      })}
    </div>
  );
}
