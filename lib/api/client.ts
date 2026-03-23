/**
 * Type-safe API client for MojoDas Spa
 *
 * Provides convenient functions for interacting with the API endpoints
 * with full TypeScript support and consistent error handling.
 */

import type {
  ApiResponse,
  ProductsResponse,
  ProductDetailResponse,
  ConfiguratorRequest,
  ConfiguratorResponse,
  AddToCartRequest,
  AddToCartResponseData,
  CartValidationRequest,
  CartValidationResponse,
  LeadFormRequest,
  LeadFormResponse,
  ProductsQueryParams,
} from "@/types/api";
import type { ConfigOptionGroup } from "@/types/config";

// Base URL for API - uses relative path for same-origin requests
const API_BASE = "/api";

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public field?: string,
    public details?: Record<string, string>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Generic fetch wrapper with error handling
 */
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const data = (await response.json()) as ApiResponse<T>;

  if (!data.success || data.error) {
    throw new ApiError(
      data.error?.code ?? "UNKNOWN_ERROR",
      data.error?.message ?? "An unknown error occurred",
      data.error?.field,
      data.error?.details
    );
  }

  return data.data as T;
}

// ============================================
// Products API
// ============================================

/**
 * Get all products with optional filtering
 *
 * @param params - Query parameters for filtering
 * @returns Promise with products data
 *
 * @example
 * // Get all featured products
 * const data = await getProducts({ featured: "true" });
 *
 * @example
 * // Get round products with capacity 4-6
 * const data = await getProducts({ category: "round", capacity: "4-6" });
 */
export async function getProducts(
  params?: ProductsQueryParams
): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.set(key, value);
      }
    });
  }

  const queryString = searchParams.toString();
  const endpoint = `/products${queryString ? `?${queryString}` : ""}`;

  return apiFetch<ProductsResponse>(endpoint);
}

/**
 * Get a single product by slug
 *
 * @param slug - Product slug
 * @returns Promise with product details and related products
 *
 * @example
 * const data = await getProduct("monaco-horizon");
 * console.log(data.product.name); // "Monaco Horizon"
 * console.log(data.relatedProducts); // Array of related products
 */
export async function getProduct(slug: string): Promise<ProductDetailResponse> {
  if (!slug) {
    throw new ApiError("INVALID_SLUG", "Product slug is required");
  }

  return apiFetch<ProductDetailResponse>(`/products/${encodeURIComponent(slug)}`);
}

/**
 * Get featured products
 *
 * @param limit - Maximum number of products to return
 * @returns Promise with featured products
 */
export async function getFeaturedProducts(limit = 4): Promise<ProductsResponse> {
  return getProducts({ featured: "true", limit: String(limit) });
}

/**
 * Get products by category (shape)
 *
 * @param category - Product category (round, square, therapeutic)
 * @param limit - Maximum number of products to return
 * @returns Promise with products in category
 */
export async function getProductsByCategory(
  category: "round" | "square" | "therapeutic",
  limit?: number
): Promise<ProductsResponse> {
  return getProducts({
    category,
    limit: limit ? String(limit) : undefined,
  });
}

// ============================================
// Configurator API
// ============================================

/**
 * Calculate configuration price for a product
 *
 * @param productSlug - Product slug
 * @param selectedOptions - Selected configuration options
 * @returns Promise with price breakdown
 *
 * @example
 * const result = await calculateConfig("monaco-horizon", {
 *   acrylicColors: "white-marble",
 *   woodFinishes: "thermo-ash",
 *   massage: ["water-jets-8", "led-stars-6"],
 * });
 * console.log(result.totalPrice); // e.g., 5850
 */
export async function calculateConfig(
  productSlug: string,
  selectedOptions: Record<string, string | string[]>
): Promise<ConfiguratorResponse> {
  const body: ConfiguratorRequest = {
    productSlug,
    selectedOptions,
  };

  return apiFetch<ConfiguratorResponse>("/configurator", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/**
 * Get all available configuration options
 *
 * @returns Promise with all config option groups
 *
 * @example
 * const options = await getConfigOptions();
 * console.log(options.acrylicColors.options); // Array of acrylic color options
 */
export async function getConfigOptions(): Promise<Record<string, ConfigOptionGroup>> {
  return apiFetch<Record<string, ConfigOptionGroup>>("/configurator");
}

// ============================================
// Cart API
// ============================================

/**
 * Validate cart items - check if products exist and prices are current
 *
 * @param items - Array of cart items to validate
 * @returns Promise with validation results
 *
 * @example
 * const result = await validateCart([
 *   {
 *     productSlug: "monaco-horizon",
 *     configuration: { acrylicColors: "white-marble" },
 *     quantity: 1,
 *   },
 * ]);
 * if (result.hasPriceChanges) {
 *   // Notify user about price changes
 * }
 */
export async function validateCart(
  items: CartValidationRequest["items"]
): Promise<CartValidationResponse> {
  const encodedItems = encodeURIComponent(JSON.stringify(items));
  return apiFetch<CartValidationResponse>(`/cart?items=${encodedItems}`);
}

/**
 * Add item to cart (server-side validation)
 *
 * @param item - Item to add
 * @returns Promise with added item details and calculated price
 *
 * @example
 * const result = await addToCart({
 *   productSlug: "monaco-horizon",
 *   configuration: { acrylicColors: "white-marble" },
 *   quantity: 1,
 * });
 * console.log(result.item.unitPrice); // Calculated price
 */
export async function addToCart(
  item: AddToCartRequest
): Promise<AddToCartResponseData> {
  return apiFetch<AddToCartResponseData>("/cart", {
    method: "POST",
    body: JSON.stringify(item),
  });
}

/**
 * Remove item from cart
 *
 * @param itemId - ID of item to remove
 */
export async function removeFromCart(itemId: string): Promise<{ cleared: boolean }> {
  return apiFetch<{ cleared: boolean }>(`/cart?itemId=${encodeURIComponent(itemId)}`, {
    method: "DELETE",
  });
}

/**
 * Clear entire cart
 */
export async function clearCart(): Promise<{ cleared: boolean }> {
  return apiFetch<{ cleared: boolean }>("/cart", {
    method: "DELETE",
  });
}

// ============================================
// Leads API
// ============================================

/**
 * Submit B2B lead form
 *
 * @param leadData - Lead form data
 * @returns Promise with submission result
 *
 * @example
 * const result = await submitLead({
 *   companyName: "Luxury Hotels",
 *   contactName: "Jonas Jonaitis",
 *   email: "jonas@luxuryhotels.lt",
 *   phone: "+37060012345",
 *   message: "Ieškome 5 kubilų viešbučiui...",
 *   businessType: "hotel",
 *   estimatedQuantity: "5-10",
 * });
 * console.log(result.leadId); // e.g., "LEAD-ABC123"
 */
export async function submitLead(leadData: LeadFormRequest): Promise<LeadFormResponse> {
  return apiFetch<LeadFormResponse>("/leads", {
    method: "POST",
    body: JSON.stringify(leadData),
  });
}

// ============================================
// Utility exports
// ============================================

export { API_BASE };

/**
 * Re-export types for convenience
 */
export type {
  ApiResponse,
  ProductsResponse,
  ProductDetailResponse,
  ConfiguratorRequest,
  ConfiguratorResponse,
  AddToCartRequest,
  AddToCartResponseData,
  CartValidationRequest,
  CartValidationResponse,
  LeadFormRequest,
  LeadFormResponse,
  ProductsQueryParams,
};
