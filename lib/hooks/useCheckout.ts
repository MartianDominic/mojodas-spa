"use client";

import { useState, useCallback, useMemo } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from "@/stores/cart";
import {
  checkoutSchema,
  type CheckoutFormData,
  type CustomerFormData,
  type DeliveryFormData,
  type PaymentFormData,
} from "@/lib/utils/validation";
import { generateLeasingOptions } from "@/lib/utils/price";

/**
 * Checkout step identifier
 */
export type CheckoutStep = "delivery" | "payment" | "review" | "confirmation";

/**
 * Checkout step configuration
 */
export interface CheckoutStepConfig {
  id: CheckoutStep;
  label: string;
  labelLt: string;
  description?: string;
}

/**
 * Checkout flow steps
 */
export const CHECKOUT_STEPS: CheckoutStepConfig[] = [
  {
    id: "delivery",
    label: "Delivery",
    labelLt: "Pristatymas",
    description: "Kontaktinė ir pristatymo informacija",
  },
  {
    id: "payment",
    label: "Payment",
    labelLt: "Apmokėjimas",
    description: "Mokėjimo būdo pasirinkimas",
  },
  {
    id: "review",
    label: "Review",
    labelLt: "Peržiūra",
    description: "Užsakymo patvirtinimas",
  },
  {
    id: "confirmation",
    label: "Confirmation",
    labelLt: "Patvirtinimas",
    description: "Užsakymas patvirtintas",
  },
];

/**
 * Checkout state
 */
export interface UseCheckoutState {
  /** Current checkout step */
  currentStep: CheckoutStep;
  /** Current step index (0-based) */
  currentStepIndex: number;
  /** All checkout steps configuration */
  steps: CheckoutStepConfig[];
  /** Step completion status */
  completedSteps: Set<CheckoutStep>;
  /** Is form being submitted */
  isSubmitting: boolean;
  /** Submission error */
  submitError: Error | null;
  /** Order ID after successful submission */
  orderId: string | null;
  /** Leasing options based on cart total */
  leasingOptions: Array<{
    months: number;
    monthlyPayment: number;
    label: string;
  }>;
}

/**
 * Checkout actions
 */
export interface UseCheckoutActions {
  /** Go to next step */
  nextStep: () => Promise<boolean>;
  /** Go to previous step */
  prevStep: () => void;
  /** Go to specific step (if allowed) */
  goToStep: (step: CheckoutStep) => void;
  /** Can navigate to step */
  canGoToStep: (step: CheckoutStep) => boolean;
  /** Submit checkout */
  submitCheckout: () => Promise<boolean>;
  /** Reset checkout */
  resetCheckout: () => void;
  /** Form instance */
  form: UseFormReturn<CheckoutFormData>;
}

/**
 * Custom hook for managing checkout flow
 *
 * @returns Checkout state and actions
 *
 * @example
 * ```tsx
 * const {
 *   currentStep,
 *   steps,
 *   form,
 *   nextStep,
 *   prevStep,
 *   submitCheckout,
 *   isSubmitting
 * } = useCheckout();
 * ```
 */
export function useCheckout(): UseCheckoutState & UseCheckoutActions {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<CheckoutStep>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<Error | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const cart = useCartStore();

  // React Hook Form with Zod validation
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customer: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
      delivery: {
        address: "",
        city: "",
        postalCode: "",
        notes: "",
      },
      payment: {
        method: "banklink",
        leasingTerm: undefined,
      },
      acceptTerms: false,
      acceptPrivacy: false,
    },
    mode: "onBlur",
  });

  /**
   * Current step
   */
  const currentStep = CHECKOUT_STEPS[currentStepIndex].id;

  /**
   * Leasing options based on cart total
   */
  const leasingOptions = useMemo(() => {
    return generateLeasingOptions(cart.getTotal());
  }, [cart]);

  /**
   * Validate specific step fields
   */
  const validateStep = useCallback(
    async (step: CheckoutStep): Promise<boolean> => {
      switch (step) {
        case "delivery": {
          const customerValid = await form.trigger([
            "customer.firstName",
            "customer.lastName",
            "customer.email",
            "customer.phone",
          ]);
          const deliveryValid = await form.trigger([
            "delivery.address",
            "delivery.city",
            "delivery.postalCode",
          ]);
          return customerValid && deliveryValid;
        }

        case "payment": {
          const paymentMethod = form.getValues("payment.method");
          const paymentValid = await form.trigger("payment.method");

          // If leasing, also validate leasing term
          if (paymentMethod === "leasing") {
            const termValid = await form.trigger("payment.leasingTerm");
            return paymentValid && termValid;
          }

          return paymentValid;
        }

        case "review": {
          const termsValid = await form.trigger("acceptTerms");
          const privacyValid = await form.trigger("acceptPrivacy");
          return termsValid && privacyValid;
        }

        default:
          return true;
      }
    },
    [form]
  );

  /**
   * Go to next step
   */
  const nextStep = useCallback(async (): Promise<boolean> => {
    const isValid = await validateStep(currentStep);

    if (!isValid) {
      return false;
    }

    // Mark current step as completed
    setCompletedSteps((prev) => new Set(prev).add(currentStep));

    // Move to next step if not at the end
    if (currentStepIndex < CHECKOUT_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }

    return true;
  }, [currentStep, currentStepIndex, validateStep]);

  /**
   * Go to previous step
   */
  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  }, [currentStepIndex]);

  /**
   * Check if can navigate to a step
   */
  const canGoToStep = useCallback(
    (step: CheckoutStep): boolean => {
      const targetIndex = CHECKOUT_STEPS.findIndex((s) => s.id === step);

      // Can always go backwards
      if (targetIndex < currentStepIndex) {
        return true;
      }

      // Can only go forward if all previous steps are completed
      for (let i = 0; i < targetIndex; i++) {
        if (!completedSteps.has(CHECKOUT_STEPS[i].id)) {
          return false;
        }
      }

      return true;
    },
    [currentStepIndex, completedSteps]
  );

  /**
   * Go to specific step
   */
  const goToStep = useCallback(
    (step: CheckoutStep) => {
      if (!canGoToStep(step)) {
        return;
      }

      const targetIndex = CHECKOUT_STEPS.findIndex((s) => s.id === step);
      setCurrentStepIndex(targetIndex);
    },
    [canGoToStep]
  );

  /**
   * Submit checkout
   */
  const submitCheckout = useCallback(async (): Promise<boolean> => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Validate entire form
      const isValid = await form.trigger();
      if (!isValid) {
        setIsSubmitting(false);
        return false;
      }

      const formData = form.getValues();

      // Prepare checkout payload
      const payload = {
        customer: formData.customer,
        delivery: formData.delivery,
        payment: formData.payment,
        cart: {
          items: cart.items.map((item) => ({
            productId: item.product.id,
            productName: item.product.name,
            quantity: item.quantity,
            configuration: item.configuration,
            configurationSummary: item.configurationSummary,
            unitPrice: item.unitPrice,
          })),
          subtotal: cart.getSubtotal(),
          tax: cart.getTax(),
          total: cart.getTotal(),
        },
      };

      // Submit to API
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Nepavyko pateikti užsakymo");
      }

      const result = await response.json();

      // Handle payment redirect if needed
      if (result.redirectUrl) {
        window.location.href = result.redirectUrl;
        return true;
      }

      // Store order ID and move to confirmation
      setOrderId(result.orderId);
      setCompletedSteps((prev) => new Set(prev).add("review"));
      setCurrentStepIndex(CHECKOUT_STEPS.length - 1);

      // Clear cart after successful order
      cart.clearCart();

      return true;
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error : new Error("Nežinoma klaida")
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [form, cart]);

  /**
   * Reset checkout
   */
  const resetCheckout = useCallback(() => {
    setCurrentStepIndex(0);
    setCompletedSteps(new Set());
    setSubmitError(null);
    setOrderId(null);
    form.reset();
  }, [form]);

  return {
    // State
    currentStep,
    currentStepIndex,
    steps: CHECKOUT_STEPS,
    completedSteps,
    isSubmitting,
    submitError,
    orderId,
    leasingOptions,

    // Actions
    nextStep,
    prevStep,
    goToStep,
    canGoToStep,
    submitCheckout,
    resetCheckout,
    form,
  };
}

/**
 * Hook for managing individual form sections
 */
export function useCheckoutSection<T extends keyof CheckoutFormData>(
  section: T,
  form: UseFormReturn<CheckoutFormData>
) {
  const values = form.watch(section);
  const errors = form.formState.errors[section];

  const isValid = useMemo(() => {
    return !errors || Object.keys(errors).length === 0;
  }, [errors]);

  const isTouched = useMemo(() => {
    const touchedFields = form.formState.touchedFields[section];
    return touchedFields && Object.keys(touchedFields).length > 0;
  }, [form.formState.touchedFields, section]);

  return {
    values,
    errors,
    isValid,
    isTouched,
    isDirty: form.formState.dirtyFields[section] !== undefined,
  };
}
