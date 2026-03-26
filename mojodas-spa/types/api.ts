/**
 * API Response Types for Lux Spa Nature
 * Consistent envelope format for all API responses
 */

import type { Product, ProductListItem, ProductFilters, ProductSort } from "./product";
import type { ConfigOptionGroup, PriceCalculation, SelectedConfiguration } from "./config";
import type { Cart, Order, CheckoutData } from "./cart";

// ============================================
// Base API Types
// ============================================

// Generic API response envelope
export interface ApiResponse<T> {
  readonly success: boolean;
  readonly data: T | null;
  readonly error: ApiError | null;
  readonly meta?: ApiMeta;
}

export interface ApiError {
  readonly code: string;
  readonly message: string;
  readonly field?: string;
  readonly details?: Readonly<Record<string, string>>;
}

export interface ApiMeta {
  readonly timestamp: string;
  readonly requestId?: string;
}

// Pagination metadata
export interface PaginationMeta {
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
  readonly hasNextPage: boolean;
  readonly hasPrevPage: boolean;
}

// Paginated response
export interface PaginatedResponse<T> extends ApiResponse<T> {
  readonly pagination: PaginationMeta;
}

// Validation error
export interface ValidationError {
  readonly field: string;
  readonly message: string;
}

// ============================================
// Product API Types
// ============================================

// GET /api/products query params
export interface ProductsQueryParams {
  readonly category?: "round" | "square" | "therapeutic";
  readonly capacity?: string;
  readonly featured?: string;
  readonly collection?: string;
  readonly limit?: string;
  readonly page?: string;
  readonly sort?: string;
  readonly direction?: "asc" | "desc";
}

// GET /api/products
export interface GetProductsRequest {
  readonly filters?: ProductFilters;
  readonly sort?: ProductSort;
  readonly page?: number;
  readonly limit?: number;
}

export interface ProductsResponse {
  readonly products: readonly ProductListItem[];
  readonly total: number;
  readonly filters: {
    readonly categories: readonly string[];
    readonly capacities: readonly string[];
    readonly collections: readonly string[];
  };
}

export type GetProductsResponse = PaginatedResponse<ProductsResponse>;

// GET /api/products/[slug]
export interface GetProductRequest {
  readonly slug: string;
}

export interface ProductDetailResponse {
  readonly product: Product;
  readonly relatedProducts: readonly ProductListItem[];
}

export type GetProductResponse = ApiResponse<ProductDetailResponse>;

// GET /api/products/featured
export type GetFeaturedProductsResponse = ApiResponse<readonly ProductListItem[]>;

// GET /api/products/related/[slug]
export interface GetRelatedProductsRequest {
  readonly slug: string;
  readonly limit?: number;
}

export type GetRelatedProductsResponse = ApiResponse<readonly ProductListItem[]>;

// ============================================
// Configurator API Types
// ============================================

// GET /api/configurator/options
export type GetConfigOptionsResponse = ApiResponse<readonly ConfigOptionGroup[]>;

// POST /api/configurator/calculate
export interface ConfiguratorRequest {
  readonly productSlug: string;
  readonly selectedOptions: Readonly<Record<string, string | readonly string[]>>;
}

export interface ConfigBreakdownItem {
  readonly groupId: string;
  readonly groupName: string;
  readonly optionId: string | readonly string[];
  readonly optionName: string;
  readonly price: number;
}

export interface ConfiguratorResponse {
  readonly basePrice: number;
  readonly optionsTotal: number;
  readonly totalPrice: number;
  readonly monthlyPayment: number;
  readonly breakdown: readonly ConfigBreakdownItem[];
  readonly configurationSummary: string;
}

export type CalculatePriceRequest = ConfiguratorRequest;
export type CalculatePriceResponse = ApiResponse<ConfiguratorResponse>;

// ============================================
// Cart API Types
// ============================================

// GET /api/cart
export type GetCartResponse = ApiResponse<Cart>;

// POST /api/cart/items
export interface AddToCartRequest {
  readonly productSlug: string;
  readonly configuration: Readonly<Record<string, string | readonly string[]>>;
  readonly quantity: number;
}

export interface AddToCartResponseData {
  readonly success: boolean;
  readonly item: {
    readonly productSlug: string;
    readonly productName: string;
    readonly unitPrice: number;
    readonly quantity: number;
    readonly configurationSummary: string;
  };
}

export type AddToCartResponse = ApiResponse<AddToCartResponseData>;

// PATCH /api/cart/items/[id]
export interface UpdateCartItemRequest {
  readonly quantity: number;
}

export type UpdateCartItemResponse = ApiResponse<Cart>;

// DELETE /api/cart/items/[id]
export type DeleteCartItemResponse = ApiResponse<Cart>;

// DELETE /api/cart
export type ClearCartResponse = ApiResponse<Cart>;

// Cart validation
export interface CartValidationRequest {
  readonly items: readonly {
    readonly productSlug: string;
    readonly configuration: Readonly<Record<string, string | readonly string[]>>;
    readonly quantity: number;
  }[];
}

export interface CartValidationItem {
  readonly productSlug: string;
  readonly isValid: boolean;
  readonly currentPrice: number;
  readonly priceChanged: boolean;
  readonly previousPrice?: number;
}

export interface CartValidationResponse {
  readonly validItems: readonly CartValidationItem[];
  readonly hasInvalidItems: boolean;
  readonly hasPriceChanges: boolean;
}

// ============================================
// Checkout API Types
// ============================================

// POST /api/checkout
export interface CreateCheckoutRequest {
  readonly checkoutData: CheckoutData;
}

export type CreateCheckoutResponse = ApiResponse<Order>;

// GET /api/checkout/[orderId]
export interface GetOrderRequest {
  readonly orderId: string;
}

export type GetOrderResponse = ApiResponse<Order>;

// ============================================
// Leads API Types (B2B)
// ============================================

export interface LeadFormRequest {
  readonly companyName: string;
  readonly contactName: string;
  readonly email: string;
  readonly phone: string;
  readonly message: string;
  readonly interestedProducts?: readonly string[];
  readonly estimatedQuantity?: string;
  readonly timeline?: string;
  readonly businessType?: "hotel" | "glamping" | "wellness" | "other";
  readonly preferredContact?: "email" | "phone";
}

export interface LeadFormResponse {
  readonly success: boolean;
  readonly leadId: string;
  readonly message: string;
}

export type CreateLeadRequest = LeadFormRequest;
export type CreateLeadResponse = ApiResponse<LeadFormResponse>;

// ============================================
// Revalidation API Types
// ============================================

// POST /api/revalidate
export interface RevalidateRequest {
  readonly path?: string;
  readonly tag?: string;
  readonly secret: string;
}

export interface RevalidateResponseData {
  readonly revalidated: boolean;
  readonly path?: string;
  readonly tag?: string;
}

export type RevalidateResponse = ApiResponse<RevalidateResponseData>;

// ============================================
// Health Check
// ============================================

// GET /api/health
export interface HealthCheckData {
  readonly status: "healthy" | "degraded" | "unhealthy";
  readonly version: string;
  readonly uptime: number;
}

export type HealthCheckResponse = ApiResponse<HealthCheckData>;
