/**
 * Format price in EUR for Lithuanian locale
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("lt-LT", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price) + " €";
}

/**
 * Format price with monthly payment
 */
export function formatMonthlyPayment(price: number, months: number = 36): string {
  const monthly = Math.ceil(price / months);
  return `${monthly} €/mėn.`;
}

/**
 * Calculate total price from base + config options
 */
export function calculateConfigPrice(
  basePrice: number,
  selectedOptions: Record<string, number>
): number {
  const optionsTotal = Object.values(selectedOptions).reduce((sum, price) => sum + price, 0);
  return basePrice + optionsTotal;
}
