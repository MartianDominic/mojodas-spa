import type { ConfigOption, ConfigOptionGroup, SelectedConfiguration } from "@/types";

/**
 * Price breakdown item for display
 */
export interface PriceBreakdownItem {
  label: string;
  amount: number;
  isBase?: boolean;
  isSubtotal?: boolean;
  isTotal?: boolean;
}

/**
 * Complete price breakdown structure
 */
export interface PriceBreakdown {
  basePrice: number;
  optionsTotal: number;
  items: PriceBreakdownItem[];
  subtotal: number;
  tax: number;
  taxRate: number;
  total: number;
}

/**
 * Configuration price calculation result
 */
export interface ConfigurationPriceResult {
  basePrice: number;
  optionsTotal: number;
  totalPrice: number;
  breakdown: PriceBreakdownItem[];
}

/**
 * Monthly payment calculation options
 */
export interface MonthlyPaymentOptions {
  interestRate?: number; // Annual interest rate (e.g., 0.12 for 12%)
  downPayment?: number; // Initial down payment amount
}

const DEFAULT_TAX_RATE = 0.21; // 21% PVM (Lithuanian VAT)
const DEFAULT_INTEREST_RATE = 0; // 0% for promotional leasing

/**
 * Calculate the total price for a product configuration
 *
 * @param basePrice - The base price of the product
 * @param selectedOptions - Map of groupId to selected option(s)
 * @param configOptions - All available configuration option groups
 * @returns Configuration price calculation result with breakdown
 */
export function calculateConfigurationPrice(
  basePrice: number,
  selectedOptions: SelectedConfiguration,
  configOptions: ConfigOptionGroup[]
): ConfigurationPriceResult {
  const breakdown: PriceBreakdownItem[] = [
    { label: "Bazinė kaina", amount: basePrice, isBase: true },
  ];

  let optionsTotal = 0;

  for (const group of configOptions) {
    const selection = selectedOptions[group.id];

    if (!selection) continue;

    const selectedIds = Array.isArray(selection) ? selection : [selection];

    for (const optionId of selectedIds) {
      const option = group.options.find((opt) => opt.id === optionId);

      if (option && option.priceModifier > 0) {
        breakdown.push({
          label: `${group.name}: ${option.name}`,
          amount: option.priceModifier,
        });
        optionsTotal += option.priceModifier;
      }
    }
  }

  return {
    basePrice,
    optionsTotal,
    totalPrice: basePrice + optionsTotal,
    breakdown,
  };
}

/**
 * Calculate monthly payment for leasing/installments
 *
 * @param total - Total amount to finance
 * @param months - Number of monthly payments (12, 24, 36, 48)
 * @param options - Optional interest rate and down payment
 * @returns Monthly payment amount (rounded up to nearest euro)
 */
export function calculateMonthlyPayment(
  total: number,
  months: number = 36,
  options: MonthlyPaymentOptions = {}
): number {
  const { interestRate = DEFAULT_INTEREST_RATE, downPayment = 0 } = options;

  const principal = total - downPayment;

  if (principal <= 0) return 0;
  if (months <= 0) return principal;

  if (interestRate === 0) {
    // Simple division for 0% interest
    return Math.ceil(principal / months);
  }

  // Monthly interest rate
  const monthlyRate = interestRate / 12;

  // PMT formula: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
  const numerator = monthlyRate * Math.pow(1 + monthlyRate, months);
  const denominator = Math.pow(1 + monthlyRate, months) - 1;

  return Math.ceil(principal * (numerator / denominator));
}

/**
 * Generate available leasing terms with monthly payments
 *
 * @param total - Total amount to finance
 * @returns Array of leasing options with term and monthly payment
 */
export function generateLeasingOptions(total: number): Array<{
  months: number;
  monthlyPayment: number;
  label: string;
}> {
  const terms = [12, 24, 36, 48] as const;

  return terms.map((months) => ({
    months,
    monthlyPayment: calculateMonthlyPayment(total, months),
    label: `${months} mėn.`,
  }));
}

/**
 * Format a price breakdown for display
 *
 * @param breakdown - Price calculation result
 * @param includeTax - Whether to include tax in the breakdown
 * @returns Formatted price breakdown with all line items
 */
export function formatPriceBreakdown(
  breakdown: ConfigurationPriceResult,
  includeTax: boolean = false
): PriceBreakdown {
  const subtotal = breakdown.totalPrice;
  const taxRate = includeTax ? DEFAULT_TAX_RATE : 0;
  const tax = includeTax ? Math.round(subtotal * taxRate) : 0;
  const total = subtotal + tax;

  const items: PriceBreakdownItem[] = [
    ...breakdown.breakdown,
  ];

  // Add subtotal if there are options
  if (breakdown.optionsTotal > 0) {
    items.push({
      label: "Tarpinė suma",
      amount: subtotal,
      isSubtotal: true,
    });
  }

  // Add tax line if applicable
  if (includeTax && tax > 0) {
    items.push({
      label: `PVM (${Math.round(taxRate * 100)}%)`,
      amount: tax,
    });
  }

  return {
    basePrice: breakdown.basePrice,
    optionsTotal: breakdown.optionsTotal,
    items,
    subtotal,
    tax,
    taxRate,
    total,
  };
}

/**
 * Calculate price difference between two configurations
 *
 * @param oldTotal - Previous total price
 * @param newTotal - New total price
 * @returns Object with difference amount and direction
 */
export function calculatePriceDifference(
  oldTotal: number,
  newTotal: number
): { amount: number; direction: "increase" | "decrease" | "same" } {
  const amount = newTotal - oldTotal;

  return {
    amount: Math.abs(amount),
    direction: amount > 0 ? "increase" : amount < 0 ? "decrease" : "same",
  };
}

/**
 * Find the cheapest/most expensive option in a group
 */
export function findOptionPriceRange(group: ConfigOptionGroup): {
  min: ConfigOption | null;
  max: ConfigOption | null;
  range: number;
} {
  if (group.options.length === 0) {
    return { min: null, max: null, range: 0 };
  }

  const sorted = [...group.options].sort(
    (a, b) => a.priceModifier - b.priceModifier
  );

  const min = sorted[0];
  const max = sorted[sorted.length - 1];

  return {
    min,
    max,
    range: max.priceModifier - min.priceModifier,
  };
}

/**
 * Calculate savings compared to buying options separately (for bundles)
 */
export function calculateBundleSavings(
  bundlePrice: number,
  individualPrices: number[]
): { totalIndividual: number; savings: number; savingsPercent: number } {
  const totalIndividual = individualPrices.reduce((sum, price) => sum + price, 0);
  const savings = totalIndividual - bundlePrice;
  const savingsPercent = totalIndividual > 0
    ? Math.round((savings / totalIndividual) * 100)
    : 0;

  return {
    totalIndividual,
    savings: Math.max(0, savings),
    savingsPercent: Math.max(0, savingsPercent),
  };
}
