"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Product } from "@/types";

/**
 * Product fetch state
 */
export interface UseProductState {
  product: Product | null;
  isLoading: boolean;
  error: Error | null;
  isValidating: boolean;
}

/**
 * Product fetch options
 */
export interface UseProductOptions {
  /** Initial data for SSR hydration */
  initialData?: Product | null;
  /** Revalidate on mount even if initialData provided */
  revalidateOnMount?: boolean;
  /** Revalidate on window focus */
  revalidateOnFocus?: boolean;
  /** Retry failed requests */
  retryCount?: number;
  /** Retry delay in ms */
  retryDelay?: number;
}

const DEFAULT_OPTIONS: Required<UseProductOptions> = {
  initialData: null,
  revalidateOnMount: true,
  revalidateOnFocus: false,
  retryCount: 3,
  retryDelay: 1000,
};

/**
 * Custom hook for fetching a single product by slug
 *
 * Uses a simple SWR-like pattern with caching and revalidation
 *
 * @param slug - Product slug to fetch
 * @param options - Fetch options
 * @returns Product state with loading, error, and revalidation
 *
 * @example
 * ```tsx
 * const { product, isLoading, error, refetch } = useProduct("monaco-horizon");
 *
 * if (isLoading) return <Skeleton />;
 * if (error) return <Error message={error.message} />;
 * if (!product) return <NotFound />;
 *
 * return <ProductDetail product={product} />;
 * ```
 */
export function useProduct(
  slug: string | null | undefined,
  options: UseProductOptions = {}
): UseProductState & { refetch: () => Promise<void>; mutate: (product: Product) => void } {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  const [state, setState] = useState<UseProductState>({
    product: opts.initialData,
    isLoading: !opts.initialData && !!slug,
    error: null,
    isValidating: false,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCountRef = useRef(0);

  /**
   * Fetch product data from API
   */
  const fetchProduct = useCallback(
    async (signal?: AbortSignal): Promise<Product | null> => {
      if (!slug) return null;

      const response = await fetch(`/api/products/${slug}`, { signal });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to fetch product: ${response.statusText}`);
      }

      const data = await response.json();
      return data.product || data;
    },
    [slug]
  );

  /**
   * Fetch with retry logic
   */
  const fetchWithRetry = useCallback(async (): Promise<void> => {
    if (!slug) {
      setState((prev) => ({
        ...prev,
        product: null,
        isLoading: false,
        error: null,
        isValidating: false,
      }));
      return;
    }

    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    setState((prev) => ({
      ...prev,
      isLoading: !prev.product,
      isValidating: !!prev.product,
    }));

    try {
      const product = await fetchProduct(signal);
      retryCountRef.current = 0;

      setState({
        product,
        isLoading: false,
        error: null,
        isValidating: false,
      });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return; // Ignore aborted requests
      }

      // Retry logic
      if (retryCountRef.current < opts.retryCount) {
        retryCountRef.current++;
        setTimeout(fetchWithRetry, opts.retryDelay * retryCountRef.current);
        return;
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error : new Error("Unknown error"),
        isValidating: false,
      }));
    }
  }, [slug, fetchProduct, opts.retryCount, opts.retryDelay]);

  /**
   * Manual refetch
   */
  const refetch = useCallback(async () => {
    retryCountRef.current = 0;
    await fetchWithRetry();
  }, [fetchWithRetry]);

  /**
   * Optimistic update
   */
  const mutate = useCallback((product: Product) => {
    setState((prev) => ({
      ...prev,
      product,
    }));
  }, []);

  // Initial fetch
  useEffect(() => {
    if (!slug) return;

    // Skip if we have initial data and don't want to revalidate
    if (opts.initialData && !opts.revalidateOnMount) return;

    fetchWithRetry();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [slug, opts.initialData, opts.revalidateOnMount, fetchWithRetry]);

  // Revalidate on focus
  useEffect(() => {
    if (!opts.revalidateOnFocus || !slug) return;

    const handleFocus = () => {
      fetchWithRetry();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [opts.revalidateOnFocus, slug, fetchWithRetry]);

  return { ...state, refetch, mutate };
}

/**
 * Hook for prefetching a product (for hover states, etc.)
 */
export function usePrefetchProduct(): (slug: string) => void {
  const cache = useRef<Set<string>>(new Set());

  return useCallback((slug: string) => {
    if (cache.current.has(slug)) return;

    cache.current.add(slug);

    // Use low-priority fetch
    if ("requestIdleCallback" in window) {
      (window as typeof window & { requestIdleCallback: (cb: () => void) => void })
        .requestIdleCallback(() => {
          fetch(`/api/products/${slug}`, { priority: "low" } as RequestInit);
        });
    } else {
      setTimeout(() => {
        fetch(`/api/products/${slug}`);
      }, 100);
    }
  }, []);
}
