/**
 * Cart Types for MojoDas Spa
 * Matches PRD Section 3.2
 */

import type { Product, ProductListItem } from "./product";
import type { SelectedConfiguration, ConfigurationSummary } from "./config";

export interface CartItem {
  readonly id: string;
  readonly productId: string;
  readonly productSlug: string;
  readonly productName: string;
  readonly productImage: string;
  readonly quantity: number;
  readonly configuration: SelectedConfiguration;
  readonly configurationSummary: ConfigurationSummary;
  readonly basePrice: number;
  readonly configPrice: number;
  readonly unitPrice: number;
  readonly subtotal: number;
}

export interface Cart {
  readonly items: readonly CartItem[];
  readonly subtotal: number;
  readonly tax: number;
  readonly taxRate: number;
  readonly shipping: number;
  readonly total: number;
  readonly itemCount: number;
}

// Cart state for Zustand store
export interface CartState {
  readonly items: CartItem[];
  readonly isOpen: boolean;
}

// Cart actions for Zustand store
export interface CartActions {
  addItem: (
    product: Product | ProductListItem,
    config: SelectedConfiguration,
    configSummary: ConfigurationSummary,
    price: number
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

// Cart computed values
export interface CartComputed {
  getSubtotal: () => number;
  getTax: () => number;
  getShipping: () => number;
  getTotal: () => number;
  getItemCount: () => number;
  getCart: () => Cart;
}

// Full cart store type
export type CartStore = CartState & CartActions & CartComputed;

// Checkout customer information
export interface CheckoutCustomer {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: string;
  readonly company?: string;
  readonly vatNumber?: string;
}

// Checkout delivery information
export interface CheckoutDelivery {
  readonly address: string;
  readonly city: string;
  readonly postalCode: string;
  readonly country: "LT";
  readonly notes?: string;
}

// Payment methods
export type PaymentMethod = "banklink" | "card" | "leasing";
export type LeasingTerm = 12 | 24 | 36 | 48;

// Checkout payment information
export interface CheckoutPayment {
  readonly method: PaymentMethod;
  readonly leasingTerm?: LeasingTerm;
}

// Full checkout data
export interface CheckoutData {
  readonly customer: CheckoutCustomer;
  readonly delivery: CheckoutDelivery;
  readonly payment: CheckoutPayment;
  readonly cart: Cart;
  readonly agreedToTerms: boolean;
  readonly subscribedToNewsletter: boolean;
}

// Order status
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "manufacturing"
  | "shipped"
  | "delivered"
  | "cancelled";

// Order confirmation
export interface Order {
  readonly id: string;
  readonly orderNumber: string;
  readonly status: OrderStatus;
  readonly customer: CheckoutCustomer;
  readonly delivery: CheckoutDelivery;
  readonly payment: CheckoutPayment;
  readonly items: readonly CartItem[];
  readonly subtotal: number;
  readonly tax: number;
  readonly shipping: number;
  readonly total: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly estimatedDelivery?: string;
}
