"use client";

import { create } from "zustand";

interface ConfiguratorStore {
  productId: string | null;
  productName: string | null;
  basePrice: number;
  currentStep: number;
  totalSteps: number;
  selections: Record<string, string | string[]>;
  priceModifiers: Record<string, number>;
  selectionNames: Record<string, string | string[]>;

  // Actions
  setProduct: (productId: string, productName: string, basePrice: number) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setSelection: (groupId: string, value: string | string[], priceModifier: number, displayName?: string | string[]) => void;
  toggleMultiSelection: (groupId: string, optionId: string, priceModifier: number, displayName?: string) => void;
  reset: () => void;

  // Computed
  getTotalPrice: () => number;
  getSelectionSummary: () => string;
  canGoNext: () => boolean;
  canGoPrev: () => boolean;
}

export const useConfiguratorStore = create<ConfiguratorStore>()((set, get) => ({
  productId: null,
  productName: null,
  basePrice: 0,
  currentStep: 1,
  totalSteps: 5,
  selections: {},
  priceModifiers: {},
  selectionNames: {},

  setProduct: (productId, productName, basePrice) => {
    set({
      productId,
      productName,
      basePrice,
      currentStep: 1,
      selections: {},
      priceModifiers: {},
      selectionNames: {},
    });
  },

  setStep: (step) => {
    const state = get();
    if (step >= 1 && step <= state.totalSteps) {
      set({ currentStep: step });
    }
  },

  nextStep: () => {
    const state = get();
    if (state.currentStep < state.totalSteps) {
      set({ currentStep: state.currentStep + 1 });
    }
  },

  prevStep: () => {
    const state = get();
    if (state.currentStep > 1) {
      set({ currentStep: state.currentStep - 1 });
    }
  },

  setSelection: (groupId, value, priceModifier, displayName) => {
    set((state) => ({
      selections: {
        ...state.selections,
        [groupId]: value,
      },
      priceModifiers: {
        ...state.priceModifiers,
        [groupId]: priceModifier,
      },
      selectionNames: {
        ...state.selectionNames,
        [groupId]: displayName || value,
      },
    }));
  },

  toggleMultiSelection: (groupId, optionId, priceModifier, displayName) => {
    set((state) => {
      const current = (state.selections[groupId] as string[]) || [];
      const currentNames = (state.selectionNames[groupId] as string[]) || [];
      const currentModifier = state.priceModifiers[groupId] || 0;

      let newSelection: string[];
      let newNames: string[];
      let newModifier: number;

      if (current.includes(optionId)) {
        newSelection = current.filter((id) => id !== optionId);
        newNames = currentNames.filter((name) => name !== (displayName || optionId));
        newModifier = currentModifier - priceModifier;
      } else {
        newSelection = [...current, optionId];
        newNames = [...currentNames, displayName || optionId];
        newModifier = currentModifier + priceModifier;
      }

      return {
        selections: {
          ...state.selections,
          [groupId]: newSelection,
        },
        priceModifiers: {
          ...state.priceModifiers,
          [groupId]: newModifier,
        },
        selectionNames: {
          ...state.selectionNames,
          [groupId]: newNames,
        },
      };
    });
  },

  reset: () => {
    set({
      productId: null,
      productName: null,
      basePrice: 0,
      currentStep: 1,
      selections: {},
      priceModifiers: {},
      selectionNames: {},
    });
  },

  getTotalPrice: () => {
    const state = get();
    const modifiersTotal = Object.values(state.priceModifiers).reduce(
      (sum, mod) => sum + mod,
      0
    );
    return state.basePrice + modifiersTotal;
  },

  getSelectionSummary: () => {
    const state = get();
    const parts: string[] = [];

    Object.entries(state.selectionNames).forEach(([, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        parts.push(value.join(", "));
      } else if (typeof value === "string" && value) {
        parts.push(value);
      }
    });

    return parts.join(" | ");
  },

  canGoNext: () => {
    const state = get();
    return state.currentStep < state.totalSteps;
  },

  canGoPrev: () => {
    const state = get();
    return state.currentStep > 1;
  },
}));
