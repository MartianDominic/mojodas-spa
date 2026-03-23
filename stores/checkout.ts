"use client";

import { create } from "zustand";

export type CheckoutStep = 1 | 2;
export type PaymentMethod = "banklink" | "card" | "leasing";
export type LeasingTerm = 12 | 24 | 36 | 48;

interface CustomerInfo {
  fullName: string;
  email: string;
}

interface DeliveryInfo {
  address: string;
  city: string;
  postalCode: string;
  specialDelivery: boolean;
}

interface CheckoutState {
  step: CheckoutStep;
  customerInfo: CustomerInfo;
  deliveryInfo: DeliveryInfo;
  paymentMethod: PaymentMethod;
  leasingTerm: LeasingTerm;
  termsAccepted: boolean;

  // Actions
  setStep: (step: CheckoutStep) => void;
  updateCustomer: (info: Partial<CustomerInfo>) => void;
  updateDelivery: (info: Partial<DeliveryInfo>) => void;
  setPayment: (method: PaymentMethod) => void;
  setLeasingTerm: (term: LeasingTerm) => void;
  setTermsAccepted: (accepted: boolean) => void;
  reset: () => void;
}

const initialCustomerInfo: CustomerInfo = {
  fullName: "",
  email: "",
};

const initialDeliveryInfo: DeliveryInfo = {
  address: "",
  city: "",
  postalCode: "",
  specialDelivery: true,
};

export const useCheckoutStore = create<CheckoutState>()((set) => ({
  step: 1,
  customerInfo: initialCustomerInfo,
  deliveryInfo: initialDeliveryInfo,
  paymentMethod: "leasing",
  leasingTerm: 48,
  termsAccepted: false,

  setStep: (step) => set({ step }),

  updateCustomer: (info) =>
    set((state) => ({
      customerInfo: { ...state.customerInfo, ...info },
    })),

  updateDelivery: (info) =>
    set((state) => ({
      deliveryInfo: { ...state.deliveryInfo, ...info },
    })),

  setPayment: (method) => set({ paymentMethod: method }),

  setLeasingTerm: (term) => set({ leasingTerm: term }),

  setTermsAccepted: (accepted) => set({ termsAccepted: accepted }),

  reset: () =>
    set({
      step: 1,
      customerInfo: initialCustomerInfo,
      deliveryInfo: initialDeliveryInfo,
      paymentMethod: "leasing",
      leasingTerm: 48,
      termsAccepted: false,
    }),
}));
