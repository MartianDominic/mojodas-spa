/**
 * Products Data Helper
 * Provides typed access to product data with query capabilities
 *
 * Uses scraped product data transformed to match our Product types.
 */

import type {
  Product,
  ProductListItem,
  ProductFilters,
  ProductSort,
  ProductCollection,
  ProductShape,
} from "@/types";

// Import from scraped products transformation layer
import {
  SCRAPED_PRODUCTS,
  getScrapedDataInfo,
} from "./scraped-products";

// Use scraped products as the source of truth
const allProducts: Product[] = SCRAPED_PRODUCTS;

// Get version info from scraped data
const scrapedInfo = getScrapedDataInfo();
const dataVersion = "2.0.0"; // Updated to reflect scraped data integration
const dataLastUpdated = scrapedInfo.scrapedAt;

// Export for direct access (used by API routes)
export const PRODUCTS = allProducts;

/**
 * Get all products
 */
export function getAllProducts(): Product[] {
  return allProducts;
}

/**
 * Get all active products
 */
export function getActiveProducts(): Product[] {
  return allProducts.filter((p) => p.isActive);
}

/**
 * Get a single product by slug
 */
export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

/**
 * Get a single product by ID
 */
export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

/**
 * Get featured products
 */
export function getFeaturedProducts(limit?: number): ProductListItem[] {
  const featured = allProducts.filter((p) => p.isActive && p.isFeatured);
  const limited = limit ? featured.slice(0, limit) : featured;
  return limited.map(toProductListItem);
}

/**
 * Get products by collection
 */
export function getProductsByCollection(
  collection: ProductCollection
): Product[] {
  return allProducts.filter(
    (p) => p.isActive && p.collection === collection
  );
}

/**
 * Get products by shape
 */
export function getProductsByShape(shape: ProductShape): Product[] {
  return allProducts.filter(
    (p) => p.isActive && p.shape === shape
  );
}

/**
 * Get related products for a given product
 */
export function getRelatedProducts(
  product: Product,
  limit: number = 4
): ProductListItem[] {
  // First try using relatedProducts array from product
  if (product.relatedProducts && product.relatedProducts.length > 0) {
    const related = product.relatedProducts
      .map((slug) => allProducts.find((p) => p.slug === slug))
      .filter((p): p is Product => p !== undefined && p.isActive)
      .slice(0, limit);

    if (related.length > 0) {
      return related.map(toProductListItem);
    }
  }

  // Fallback to collection/shape matching
  const related = allProducts
    .filter(
      (p) =>
        p.isActive &&
        p.id !== product.id &&
        (p.collection === product.collection || p.shape === product.shape)
    )
    .slice(0, limit);

  return related.map(toProductListItem);
}

/**
 * Convert Product to ProductListItem (for list views)
 */
export function toProductListItem(product: Product): ProductListItem {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    collection: product.collection,
    variant: product.variant,
    tagline: product.tagline,
    shape: product.shape,
    capacity: product.capacity,
    heaterType: product.heaterType,
    basePrice: product.basePrice,
    monthlyPayment: product.monthlyPayment,
    currency: product.currency,
    badges: product.badges,
    images: product.images,
    thumbnail: product.thumbnail,
    isFeatured: product.isFeatured,
    stockStatus: product.stockStatus,
  };
}

/**
 * Get products as list items (for catalog views)
 */
export function getProductListItems(): ProductListItem[] {
  return getActiveProducts().map(toProductListItem);
}

/**
 * Filter products based on filter criteria
 */
export function filterProducts(
  products: Product[],
  filters: ProductFilters
): Product[] {
  return products.filter((product) => {
    // Collection filter
    if (filters.collection && product.collection !== filters.collection) {
      return false;
    }

    // Shape filter
    if (filters.shape && product.shape !== filters.shape) {
      return false;
    }

    // Heater type filter
    if (filters.heaterType && product.heaterType !== filters.heaterType) {
      return false;
    }

    // Capacity filters
    if (
      filters.minCapacity !== undefined &&
      product.capacity.max < filters.minCapacity
    ) {
      return false;
    }
    if (
      filters.maxCapacity !== undefined &&
      product.capacity.min > filters.maxCapacity
    ) {
      return false;
    }

    // Price filters
    if (
      filters.minPrice !== undefined &&
      product.basePrice < filters.minPrice
    ) {
      return false;
    }
    if (
      filters.maxPrice !== undefined &&
      product.basePrice > filters.maxPrice
    ) {
      return false;
    }

    // Featured filter
    if (filters.isFeatured !== undefined && product.isFeatured !== filters.isFeatured) {
      return false;
    }

    // Stock status filter
    if (filters.stockStatus && product.stockStatus !== filters.stockStatus) {
      return false;
    }

    return true;
  });
}

/**
 * Sort products based on sort criteria
 */
export function sortProducts(
  products: Product[],
  sort: ProductSort
): Product[] {
  const sorted = [...products];
  const direction = sort.direction === "asc" ? 1 : -1;

  sorted.sort((a, b) => {
    switch (sort.field) {
      case "name":
        return a.name.localeCompare(b.name, "lt") * direction;
      case "basePrice":
        return (a.basePrice - b.basePrice) * direction;
      case "capacity":
        return (a.capacity.max - b.capacity.max) * direction;
      case "createdAt": {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return (aTime - bTime) * direction;
      }
      default:
        return 0;
    }
  });

  return sorted;
}

/**
 * Get products with filtering and sorting
 */
export function queryProducts(
  filters?: ProductFilters,
  sort?: ProductSort,
  page: number = 1,
  limit: number = 12
): {
  products: ProductListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} {
  let products = getActiveProducts();

  // Apply filters
  if (filters) {
    products = filterProducts(products, filters);
  }

  // Apply sort
  if (sort) {
    products = sortProducts(products, sort);
  }

  const total = products.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedProducts = products.slice(startIndex, endIndex);

  return {
    products: paginatedProducts.map(toProductListItem),
    total,
    page,
    limit,
    totalPages,
  };
}

/**
 * Get unique collections from products
 */
export function getCollections(): ProductCollection[] {
  const collections = new Set<ProductCollection>();
  getActiveProducts().forEach((p) => collections.add(p.collection));
  return Array.from(collections);
}

/**
 * Get unique shapes from products
 */
export function getShapes(): ProductShape[] {
  const shapes = new Set<ProductShape>();
  getActiveProducts().forEach((p) => shapes.add(p.shape));
  return Array.from(shapes);
}

/**
 * Get price range from products
 */
export function getPriceRange(): { min: number; max: number } {
  const products = getActiveProducts();
  if (products.length === 0) {
    return { min: 0, max: 0 };
  }

  const prices = products.map((p) => p.basePrice);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

/**
 * Get capacity range from products
 */
export function getCapacityRange(): { min: number; max: number } {
  const products = getActiveProducts();
  if (products.length === 0) {
    return { min: 0, max: 0 };
  }

  const minCapacities = products.map((p) => p.capacity.min);
  const maxCapacities = products.map((p) => p.capacity.max);

  return {
    min: Math.min(...minCapacities),
    max: Math.max(...maxCapacities),
  };
}

/**
 * Get all product slugs (for static generation)
 */
export function getAllProductSlugs(): string[] {
  return getActiveProducts().map((p) => p.slug);
}

/**
 * Get product data version info
 */
export function getProductsDataInfo(): {
  lastUpdated: string;
  version: string;
  productCount: number;
} {
  return {
    lastUpdated: dataLastUpdated,
    version: dataVersion,
    productCount: allProducts.length,
  };
}

/**
 * Get catalog filter options for UI
 */
export function getCatalogFilters(): {
  collections: { value: ProductCollection; label: string }[];
  shapes: { value: ProductShape; label: string }[];
  capacities: { value: string; min: number; max: number }[];
  priceRange: { min: number; max: number };
} {
  const collectionLabels: Record<ProductCollection, string> = {
    monaco: "Monaco",
    "classic-round": "Classic Round",
    "grande-round": "Grande Round",
    paris: "Paris",
    andorra: "Andorra",
    cuba: "Cuba",
    macau: "Macau",
    arctic: "Arctic",
    ofuro: "Ofuro",
  };

  const shapeLabels: Record<ProductShape, string> = {
    round: "Apvalus",
    square: "Kvadratinis",
    therapeutic: "Terapinis",
  };

  return {
    collections: getCollections().map((c) => ({
      value: c,
      label: collectionLabels[c],
    })),
    shapes: getShapes().map((s) => ({
      value: s,
      label: shapeLabels[s],
    })),
    capacities: [
      { value: "1-2", min: 1, max: 2 },
      { value: "4-6", min: 4, max: 6 },
      { value: "6-8", min: 6, max: 8 },
      { value: "8-10", min: 8, max: 10 },
    ],
    priceRange: getPriceRange(),
  };
}
