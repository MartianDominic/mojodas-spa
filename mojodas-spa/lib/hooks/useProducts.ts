"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import type { ProductListItem, ProductShape, HeaterType } from "@/types";

/**
 * Product filter state
 */
export interface ProductFilters {
  shape?: ProductShape | "all";
  heaterType?: HeaterType | "all";
  capacityMin?: number;
  capacityMax?: number;
  priceMin?: number;
  priceMax?: number;
  collection?: string;
  search?: string;
  featured?: boolean;
}

/**
 * Sort options for product listing
 */
export type ProductSortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "newest";

/**
 * Pagination state
 */
export interface PaginationState {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Products fetch state
 */
export interface UseProductsState {
  products: ProductListItem[];
  filteredProducts: ProductListItem[];
  isLoading: boolean;
  error: Error | null;
  filters: ProductFilters;
  sort: ProductSortOption;
  pagination: PaginationState;
}

/**
 * Products hook options
 */
export interface UseProductsOptions {
  /** Initial products for SSR hydration */
  initialData?: ProductListItem[];
  /** Initial filter state */
  initialFilters?: ProductFilters;
  /** Initial sort option */
  initialSort?: ProductSortOption;
  /** Page size for pagination */
  pageSize?: number;
  /** Enable URL state sync */
  syncUrl?: boolean;
}

const DEFAULT_OPTIONS = {
  initialSort: "featured" as ProductSortOption,
  pageSize: 12,
  syncUrl: false,
};

/**
 * Custom hook for fetching and filtering products
 *
 * @param options - Hook options
 * @returns Products state with filtering, sorting, and pagination
 *
 * @example
 * ```tsx
 * const {
 *   filteredProducts,
 *   isLoading,
 *   filters,
 *   setFilter,
 *   setSort,
 *   nextPage,
 *   prevPage
 * } = useProducts({ pageSize: 9 });
 * ```
 */
export function useProducts(options: UseProductsOptions = {}): UseProductsState & {
  setFilter: <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => void;
  setFilters: (filters: ProductFilters) => void;
  clearFilters: () => void;
  setSort: (sort: ProductSortOption) => void;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  refetch: () => Promise<void>;
} {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  const [products, setProducts] = useState<ProductListItem[]>(opts.initialData || []);
  const [isLoading, setIsLoading] = useState(!opts.initialData?.length);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFiltersState] = useState<ProductFilters>(opts.initialFilters || {});
  const [sort, setSortState] = useState<ProductSortOption>(opts.initialSort);
  const [page, setPageState] = useState(1);

  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Fetch products from API
   */
  const fetchProducts = useCallback(async (): Promise<void> => {
    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    setIsLoading(true);

    try {
      const response = await fetch("/api/products", { signal });

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }

      const data = await response.json();
      setProducts(data.products || data || []);
      setError(null);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Apply filters to products
   */
  const applyFilters = useCallback(
    (items: ProductListItem[]): ProductListItem[] => {
      return items.filter((product) => {
        // Shape filter
        if (filters.shape && filters.shape !== "all" && product.shape !== filters.shape) {
          return false;
        }

        // Heater type filter
        if (filters.heaterType && filters.heaterType !== "all" && product.heaterType !== filters.heaterType) {
          return false;
        }

        // Capacity filter (check if product capacity range overlaps with filter range)
        if (filters.capacityMin !== undefined) {
          if (product.capacity.max < filters.capacityMin) {
            return false;
          }
        }

        if (filters.capacityMax !== undefined) {
          if (product.capacity.min > filters.capacityMax) {
            return false;
          }
        }

        // Price filter
        if (filters.priceMin !== undefined && product.basePrice < filters.priceMin) {
          return false;
        }

        if (filters.priceMax !== undefined && product.basePrice > filters.priceMax) {
          return false;
        }

        // Collection filter
        if (filters.collection && product.collection !== filters.collection) {
          return false;
        }

        // Featured filter
        if (filters.featured !== undefined && product.isFeatured !== filters.featured) {
          return false;
        }

        // Search filter
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          const matchesName = product.name.toLowerCase().includes(searchLower);
          const matchesCollection = product.collection.toLowerCase().includes(searchLower);
          if (!matchesName && !matchesCollection) {
            return false;
          }
        }

        return true;
      });
    },
    [filters]
  );

  /**
   * Apply sorting to products
   */
  const applySort = useCallback(
    (items: ProductListItem[]): ProductListItem[] => {
      const sorted = [...items];

      switch (sort) {
        case "featured":
          return sorted.sort((a, b) => {
            if (a.isFeatured && !b.isFeatured) return -1;
            if (!a.isFeatured && b.isFeatured) return 1;
            return 0;
          });

        case "price-asc":
          return sorted.sort((a, b) => a.basePrice - b.basePrice);

        case "price-desc":
          return sorted.sort((a, b) => b.basePrice - a.basePrice);

        case "name-asc":
          return sorted.sort((a, b) => a.name.localeCompare(b.name, "lt"));

        case "name-desc":
          return sorted.sort((a, b) => b.name.localeCompare(a.name, "lt"));

        case "newest":
          // For now, just return in original order
          // Would sort by createdAt if available
          return sorted;

        default:
          return sorted;
      }
    },
    [sort]
  );

  /**
   * Memoized filtered and sorted products
   */
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = applyFilters(products);
    return applySort(filtered);
  }, [products, applyFilters, applySort]);

  /**
   * Pagination
   */
  const pagination = useMemo((): PaginationState => {
    const totalItems = filteredAndSortedProducts.length;
    const totalPages = Math.ceil(totalItems / opts.pageSize);
    const currentPage = Math.min(page, Math.max(1, totalPages));

    return {
      page: currentPage,
      pageSize: opts.pageSize,
      totalItems,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    };
  }, [filteredAndSortedProducts.length, opts.pageSize, page]);

  /**
   * Paginated products
   */
  const paginatedProducts = useMemo(() => {
    const start = (pagination.page - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    return filteredAndSortedProducts.slice(start, end);
  }, [filteredAndSortedProducts, pagination.page, pagination.pageSize]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPageState(1);
  }, [filters, sort]);

  // Initial fetch
  useEffect(() => {
    if (!opts.initialData?.length) {
      fetchProducts();
    }

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [opts.initialData, fetchProducts]);

  /**
   * Filter setters
   */
  const setFilter = useCallback(<K extends keyof ProductFilters>(
    key: K,
    value: ProductFilters[K]
  ) => {
    setFiltersState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setFilters = useCallback((newFilters: ProductFilters) => {
    setFiltersState(newFilters);
  }, []);

  const clearFilters = useCallback(() => {
    setFiltersState({});
  }, []);

  const setSort = useCallback((newSort: ProductSortOption) => {
    setSortState(newSort);
  }, []);

  const setPage = useCallback((newPage: number) => {
    setPageState(Math.max(1, newPage));
  }, []);

  const nextPage = useCallback(() => {
    if (pagination.hasNextPage) {
      setPageState((prev) => prev + 1);
    }
  }, [pagination.hasNextPage]);

  const prevPage = useCallback(() => {
    if (pagination.hasPrevPage) {
      setPageState((prev) => prev - 1);
    }
  }, [pagination.hasPrevPage]);

  return {
    products,
    filteredProducts: paginatedProducts,
    isLoading,
    error,
    filters,
    sort,
    pagination,
    setFilter,
    setFilters,
    clearFilters,
    setSort,
    setPage,
    nextPage,
    prevPage,
    refetch: fetchProducts,
  };
}

/**
 * Get available filter options from products
 */
export function useFilterOptions(products: ProductListItem[]): {
  shapes: ProductShape[];
  heaterTypes: HeaterType[];
  collections: string[];
  priceRange: { min: number; max: number };
  capacityRange: { min: number; max: number };
} {
  return useMemo(() => {
    const shapes = new Set<ProductShape>();
    const heaterTypes = new Set<HeaterType>();
    const collections = new Set<string>();
    let minPrice = Infinity;
    let maxPrice = -Infinity;
    let minCapacity = Infinity;
    let maxCapacity = -Infinity;

    for (const product of products) {
      shapes.add(product.shape);
      heaterTypes.add(product.heaterType);
      collections.add(product.collection);

      minPrice = Math.min(minPrice, product.basePrice);
      maxPrice = Math.max(maxPrice, product.basePrice);

      minCapacity = Math.min(minCapacity, product.capacity.min);
      maxCapacity = Math.max(maxCapacity, product.capacity.max);
    }

    return {
      shapes: Array.from(shapes),
      heaterTypes: Array.from(heaterTypes),
      collections: Array.from(collections),
      priceRange: {
        min: minPrice === Infinity ? 0 : minPrice,
        max: maxPrice === -Infinity ? 10000 : maxPrice,
      },
      capacityRange: {
        min: minCapacity === Infinity ? 1 : minCapacity,
        max: maxCapacity === -Infinity ? 10 : maxCapacity,
      },
    };
  }, [products]);
}
