"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useConfiguratorStore } from "@/stores/configurator";
import {
  calculateConfigurationPrice,
  formatPriceBreakdown,
  calculateMonthlyPayment,
  type ConfigurationPriceResult,
  type PriceBreakdown,
} from "@/lib/utils/price";
import { validateConfiguration } from "@/lib/utils/validation";
import type {
  Product,
  ConfigOptionGroup,
  ConfigOption,
  SelectedConfiguration,
} from "@/types";

/**
 * Configurator hook state
 */
export interface UseConfiguratorState {
  /** Currently selected product */
  product: Product | null;
  /** All available option groups for this product */
  optionGroups: ConfigOptionGroup[];
  /** Current selections */
  selections: SelectedConfiguration;
  /** Current total price */
  totalPrice: number;
  /** Price breakdown with all line items */
  priceBreakdown: PriceBreakdown | null;
  /** Monthly payment for 36 months */
  monthlyPayment: number;
  /** Validation state */
  validation: {
    isValid: boolean;
    errors: Array<{ groupId: string; groupName: string; message: string }>;
    missingRequired: string[];
  };
  /** Configuration is ready to add to cart */
  isComplete: boolean;
}

/**
 * Configurator hook actions
 */
export interface UseConfiguratorActions {
  /** Initialize configurator with product */
  initProduct: (product: Product, configOptions: ConfigOptionGroup[]) => void;
  /** Select a single option */
  selectOption: (groupId: string, optionId: string) => void;
  /** Toggle a multi-select option */
  toggleOption: (groupId: string, optionId: string) => void;
  /** Check if an option is selected */
  isOptionSelected: (groupId: string, optionId: string) => boolean;
  /** Get selected option for a group */
  getSelectedOption: (groupId: string) => ConfigOption | null;
  /** Get all selected options for a multi-select group */
  getSelectedOptions: (groupId: string) => ConfigOption[];
  /** Reset to default selections */
  resetToDefaults: () => void;
  /** Reset configurator completely */
  reset: () => void;
  /** Generate configuration summary for cart */
  getConfigurationSummary: () => string;
  /** Get configuration for cart */
  getCartConfiguration: () => {
    configuration: SelectedConfiguration;
    price: number;
    summary: string;
  };
}

/**
 * Custom hook combining configurator store with price calculation and validation
 *
 * @param initialProduct - Optional initial product (for SSR)
 * @param initialConfigOptions - Optional initial config options (for SSR)
 * @returns Configurator state and actions
 *
 * @example
 * ```tsx
 * const {
 *   product,
 *   optionGroups,
 *   selections,
 *   totalPrice,
 *   priceBreakdown,
 *   validation,
 *   selectOption,
 *   toggleOption,
 *   isComplete
 * } = useConfigurator();
 *
 * useEffect(() => {
 *   if (product && configOptions) {
 *     initProduct(product, configOptions);
 *   }
 * }, [product, configOptions]);
 * ```
 */
export function useConfigurator(
  initialProduct?: Product | null,
  initialConfigOptions?: ConfigOptionGroup[]
): UseConfiguratorState & UseConfiguratorActions {
  const store = useConfiguratorStore();

  // Local state to hold product and config options
  const productRef = useMemo(() => initialProduct || null, [initialProduct]);
  const configOptionsRef = useMemo(
    () => initialConfigOptions || [],
    [initialConfigOptions]
  );

  /**
   * Get option groups applicable to current product
   */
  const applicableOptionGroups = useMemo((): ConfigOptionGroup[] => {
    if (!productRef) return [];

    return configOptionsRef.filter((group) =>
      productRef.configurableOptions.includes(group.id)
    );
  }, [productRef, configOptionsRef]);

  /**
   * Calculate price breakdown
   */
  const priceCalculation = useMemo((): ConfigurationPriceResult | null => {
    if (!productRef || !store.basePrice) return null;

    return calculateConfigurationPrice(
      store.basePrice,
      store.selections,
      applicableOptionGroups
    );
  }, [productRef, store.basePrice, store.selections, applicableOptionGroups]);

  /**
   * Format price breakdown
   */
  const priceBreakdown = useMemo((): PriceBreakdown | null => {
    if (!priceCalculation) return null;
    return formatPriceBreakdown(priceCalculation);
  }, [priceCalculation]);

  /**
   * Calculate monthly payment
   */
  const monthlyPayment = useMemo((): number => {
    return calculateMonthlyPayment(priceCalculation?.totalPrice || 0, 36);
  }, [priceCalculation?.totalPrice]);

  /**
   * Validation state
   */
  const validation = useMemo(() => {
    if (!productRef) {
      return { isValid: true, errors: [], missingRequired: [] };
    }

    return validateConfiguration(
      productRef,
      store.selections,
      applicableOptionGroups
    );
  }, [productRef, store.selections, applicableOptionGroups]);

  /**
   * Initialize product in store
   */
  const initProduct = useCallback(
    (product: Product, configOptions: ConfigOptionGroup[]) => {
      store.setProduct(product.id, product.name, product.basePrice);

      // Set default selections
      const applicableGroups = configOptions.filter((group) =>
        product.configurableOptions.includes(group.id)
      );

      for (const group of applicableGroups) {
        const defaultOption = group.options.find((opt) => opt.isDefault);

        if (defaultOption) {
          if (group.type === "multiple") {
            store.toggleMultiSelection(
              group.id,
              defaultOption.id,
              defaultOption.priceModifier
            );
          } else {
            store.setSelection(
              group.id,
              defaultOption.id,
              defaultOption.priceModifier
            );
          }
        }
      }
    },
    [store]
  );

  /**
   * Select a single option (for single-select groups)
   */
  const selectOption = useCallback(
    (groupId: string, optionId: string) => {
      const group = applicableOptionGroups.find((g) => g.id === groupId);
      if (!group) return;

      const option = group.options.find((o) => o.id === optionId);
      if (!option) return;

      store.setSelection(groupId, optionId, option.priceModifier);
    },
    [applicableOptionGroups, store]
  );

  /**
   * Toggle a multi-select option
   */
  const toggleOption = useCallback(
    (groupId: string, optionId: string) => {
      const group = applicableOptionGroups.find((g) => g.id === groupId);
      if (!group) return;

      const option = group.options.find((o) => o.id === optionId);
      if (!option) return;

      store.toggleMultiSelection(groupId, optionId, option.priceModifier);
    },
    [applicableOptionGroups, store]
  );

  /**
   * Check if option is selected
   */
  const isOptionSelected = useCallback(
    (groupId: string, optionId: string): boolean => {
      const selection = store.selections[groupId];

      if (Array.isArray(selection)) {
        return selection.includes(optionId);
      }

      return selection === optionId;
    },
    [store.selections]
  );

  /**
   * Get selected option for a group
   */
  const getSelectedOption = useCallback(
    (groupId: string): ConfigOption | null => {
      const group = applicableOptionGroups.find((g) => g.id === groupId);
      if (!group) return null;

      const selection = store.selections[groupId];
      if (!selection || Array.isArray(selection)) return null;

      return group.options.find((o) => o.id === selection) || null;
    },
    [applicableOptionGroups, store.selections]
  );

  /**
   * Get all selected options for a multi-select group
   */
  const getSelectedOptions = useCallback(
    (groupId: string): ConfigOption[] => {
      const group = applicableOptionGroups.find((g) => g.id === groupId);
      if (!group) return [];

      const selection = store.selections[groupId];
      if (!selection) return [];

      const selectedIds = Array.isArray(selection) ? selection : [selection];
      return group.options.filter((o) => selectedIds.includes(o.id));
    },
    [applicableOptionGroups, store.selections]
  );

  /**
   * Reset to default selections
   */
  const resetToDefaults = useCallback(() => {
    if (!productRef) return;

    store.setProduct(productRef.id, productRef.name, productRef.basePrice);

    for (const group of applicableOptionGroups) {
      const defaultOption = group.options.find((opt) => opt.isDefault);

      if (defaultOption) {
        if (group.type === "multiple") {
          store.toggleMultiSelection(
            group.id,
            defaultOption.id,
            defaultOption.priceModifier
          );
        } else {
          store.setSelection(
            group.id,
            defaultOption.id,
            defaultOption.priceModifier
          );
        }
      }
    }
  }, [productRef, applicableOptionGroups, store]);

  /**
   * Generate human-readable configuration summary
   */
  const getConfigurationSummary = useCallback((): string => {
    const parts: string[] = [];

    for (const group of applicableOptionGroups) {
      const selectedOptions = getSelectedOptions(group.id);

      if (selectedOptions.length > 0) {
        const optionNames = selectedOptions.map((o) => o.name).join(", ");
        parts.push(`${group.name}: ${optionNames}`);
      }
    }

    return parts.join(" | ") || "Standartinė konfigūracija";
  }, [applicableOptionGroups, getSelectedOptions]);

  /**
   * Get configuration ready for cart
   */
  const getCartConfiguration = useCallback(() => {
    return {
      configuration: store.selections,
      price: priceCalculation?.totalPrice || store.basePrice,
      summary: getConfigurationSummary(),
    };
  }, [store.selections, store.basePrice, priceCalculation?.totalPrice, getConfigurationSummary]);

  // Initialize with provided product
  useEffect(() => {
    if (initialProduct && initialConfigOptions && !store.productId) {
      initProduct(initialProduct, initialConfigOptions);
    }
  }, [initialProduct, initialConfigOptions, store.productId, initProduct]);

  return {
    // State
    product: productRef,
    optionGroups: applicableOptionGroups,
    selections: store.selections,
    totalPrice: priceCalculation?.totalPrice || store.basePrice,
    priceBreakdown,
    monthlyPayment,
    validation,
    isComplete: validation.isValid && Object.keys(store.selections).length > 0,

    // Actions
    initProduct,
    selectOption,
    toggleOption,
    isOptionSelected,
    getSelectedOption,
    getSelectedOptions,
    resetToDefaults,
    reset: store.reset,
    getConfigurationSummary,
    getCartConfiguration,
  };
}
