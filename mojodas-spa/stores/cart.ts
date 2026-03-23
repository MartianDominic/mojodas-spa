"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, SelectedConfiguration } from "@/types";

// ============================================================================
// Types
// ============================================================================

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  configuration: SelectedConfiguration;
  configurationSummary: string;
  unitPrice: number;
  addedAt: string;
}

export interface CartSummary {
  itemCount: number;
  subtotal: number;
  tax: number;
  taxRate: number;
  shipping: number;
  total: number;
  isEmpty: boolean;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (product: Product, config: SelectedConfiguration, price: number, summary: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateConfiguration: (itemId: string, config: SelectedConfiguration, price: number, summary: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Computed
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
  getItemCount: () => number;
  getSummary: () => CartSummary;
  getItem: (itemId: string) => CartItem | undefined;
  hasItem: (productId: string) => boolean;
  findItemByProduct: (productId: string) => CartItem | undefined;
}

// ============================================================================
// Constants
// ============================================================================

const TAX_RATE = 0.21; // 21% PVM
const MAX_QUANTITY = 5; // Maximum quantity per item
const SHIPPING_COST = 0; // Free shipping

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, config, price, summary) => {
        const id = `${product.id}-${JSON.stringify(config)}`;

        set((state) => {
          const existingItem = state.items.find((item) => item.id === id);

          if (existingItem) {
            // Don't exceed max quantity
            const newQuantity = Math.min(existingItem.quantity + 1, MAX_QUANTITY);

            return {
              items: state.items.map((item) =>
                item.id === id
                  ? { ...item, quantity: newQuantity }
                  : item
              ),
              isOpen: true,
            };
          }

          return {
            items: [
              ...state.items,
              {
                id,
                product,
                quantity: 1,
                configuration: config,
                configurationSummary: summary,
                unitPrice: price,
                addedAt: new Date().toISOString(),
              },
            ],
            isOpen: true,
          };
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity < 1) {
          get().removeItem(itemId);
          return;
        }

        // Enforce max quantity
        const clampedQuantity = Math.min(quantity, MAX_QUANTITY);

        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity: clampedQuantity } : item
          ),
        }));
      },

      updateConfiguration: (itemId, config, price, summary) => {
        // Create new ID based on new configuration
        const item = get().items.find((i) => i.id === itemId);
        if (!item) return;

        const newId = `${item.product.id}-${JSON.stringify(config)}`;

        set((state) => {
          // Check if this configuration already exists
          const existingItem = state.items.find(
            (i) => i.id === newId && i.id !== itemId
          );

          if (existingItem) {
            // Merge quantities and remove old item
            return {
              items: state.items
                .filter((i) => i.id !== itemId)
                .map((i) =>
                  i.id === newId
                    ? {
                        ...i,
                        quantity: Math.min(i.quantity + item.quantity, MAX_QUANTITY),
                      }
                    : i
                ),
            };
          }

          // Update the item with new configuration
          return {
            items: state.items.map((i) =>
              i.id === itemId
                ? {
                    ...i,
                    id: newId,
                    configuration: config,
                    configurationSummary: summary,
                    unitPrice: price,
                  }
                : i
            ),
          };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.unitPrice * item.quantity,
          0
        );
      },

      getTax: () => {
        // Note: Prices already include VAT in Lithuania
        // This returns the VAT component of the price
        const subtotal = get().getSubtotal();
        return Math.round(subtotal - subtotal / (1 + TAX_RATE));
      },

      getTotal: () => {
        return get().getSubtotal() + SHIPPING_COST;
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getSummary: () => {
        const items = get().items;
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = items.reduce(
          (sum, item) => sum + item.unitPrice * item.quantity,
          0
        );
        const tax = Math.round(subtotal - subtotal / (1 + TAX_RATE));

        return {
          itemCount,
          subtotal,
          tax,
          taxRate: TAX_RATE,
          shipping: SHIPPING_COST,
          total: subtotal + SHIPPING_COST,
          isEmpty: items.length === 0,
        };
      },

      getItem: (itemId) => {
        return get().items.find((item) => item.id === itemId);
      },

      hasItem: (productId) => {
        return get().items.some((item) => item.product.id === productId);
      },

      findItemByProduct: (productId) => {
        return get().items.find((item) => item.product.id === productId);
      },
    }),
    {
      name: "mojodas-cart",
      partialize: (state) => ({ items: state.items }),
      // Handle version migrations
      version: 1,
      migrate: (persistedState, version) => {
        if (version === 0) {
          // Migration from v0 to v1: add addedAt to items
          const state = persistedState as { items: CartItem[] };
          return {
            ...state,
            items: state.items.map((item) => ({
              ...item,
              addedAt: item.addedAt || new Date().toISOString(),
            })),
          };
        }
        return persistedState;
      },
    }
  )
);
