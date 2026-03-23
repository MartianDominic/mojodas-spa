import type { ProductListItem, ProductCollection, ProductVariant } from "@/types";
import {
  getCapacity,
  getShape,
  getHeaterType,
  getVariant,
  getCollection,
  getSlug,
  type ScrapedProduct,
} from "@/lib/utils/product-helpers";

// Import scraped product data
import scrapedData from "@/data/scraped/products.json";

/**
 * Base prices for each collection (estimated from market research)
 * These are placeholder values - actual prices should come from business
 */
const BASE_PRICES: Record<string, number> = {
  "classic-round-in": 1990,
  "classic-round-out": 2490,
  "classic-round-horizon": 3490,
  "grande-round-in": 2890,
  "grande-round-out": 3190,
  "grande-round-horizon": 4290,
  "monaco-in": 3290,
  "monaco-out": 3890,
  "monaco-horizon": 4890,
  "paris-in": 2690,
  "andorra": 2890,
  "cuba-out": 3590,
  "macau-in": 3190,
  arctic: 1490,
  "arctic-chiller": 5990,
  ofuro: 1890,
};

/**
 * Calculate monthly payment (simple division by 36 months)
 */
function calculateMonthlyPayment(price: number): number {
  return Math.round(price / 36);
}

/**
 * Get estimated base price from product ID
 */
function getBasePrice(productId: string): number {
  // Try exact match first
  if (BASE_PRICES[productId]) {
    return BASE_PRICES[productId];
  }

  // Try partial matches
  for (const [key, price] of Object.entries(BASE_PRICES)) {
    if (productId.includes(key)) {
      return price;
    }
  }

  // Default price
  return 2490;
}

/**
 * Transform scraped product to ProductListItem
 */
function transformScrapedProduct(scraped: ScrapedProduct): ProductListItem {
  const slug = getSlug(scraped);
  const shape = getShape(scraped);
  const heaterType = getHeaterType(scraped);
  const capacity = getCapacity(scraped);
  const variant = getVariant(scraped) as ProductVariant;
  const collection = getCollection(scraped) as ProductCollection;
  const basePrice = getBasePrice(slug);

  // Get hero image
  const heroImage = scraped.images.hero[0];
  const imageUrl = heroImage?.url || "";

  return {
    id: scraped.id,
    slug,
    name: scraped.name,
    collection,
    variant,
    tagline: scraped.tagline.replace(/^\*/, ""), // Remove leading asterisk
    shape,
    capacity,
    heaterType,
    basePrice,
    monthlyPayment: calculateMonthlyPayment(basePrice),
    currency: "EUR",
    badges: [
      {
        text: getBadgeText(scraped, heaterType, variant),
        variant: variant === "horizon" ? "accent" : "primary",
      },
    ],
    images: [
      {
        url: imageUrl,
        alt: scraped.name,
        width: 800,
        height: 1000,
      },
    ],
    isFeatured:
      slug === "monaco-horizon" ||
      slug === "arctic-chiller" ||
      slug === "macau-in",
    stockStatus: "in_stock",
  };
}

/**
 * Get badge text for product
 */
function getBadgeText(
  scraped: ScrapedProduct,
  heaterType: string,
  variant: string
): string {
  if (variant === "horizon") {
    return "HORIZON";
  }

  const tagline = scraped.tagline.toLowerCase();

  if (tagline.includes("šilumos siurblys")) {
    return "PREMIUM";
  }

  if (tagline.includes("elektrinis")) {
    return "ELEKTRINIS ŠILDYMAS";
  }

  if (tagline.includes("dvivietis")) {
    return "DVIVIETIS";
  }

  if (heaterType === "internal") {
    return "INTEGRUOTA KROSNELĖ";
  }

  if (heaterType === "external") {
    return "IŠORINĖ KROSNELĖ";
  }

  return "TERAPINIS";
}

/**
 * Deduplicate products by ID (keep first occurrence)
 */
function deduplicateProducts(
  products: ProductListItem[]
): ProductListItem[] {
  const seen = new Set<string>();
  return products.filter((product) => {
    if (seen.has(product.id)) {
      return false;
    }
    seen.add(product.id);
    return true;
  });
}

/**
 * Transform all scraped products
 */
const transformedProducts: ProductListItem[] = deduplicateProducts(
  (scrapedData.products as ScrapedProduct[]).map(transformScrapedProduct)
);

/**
 * Catalog product data from scraped MojoDas website
 * 17 unique products from the catalog
 */
export const CATALOG_PRODUCTS: ProductListItem[] = transformedProducts;

/**
 * Get all catalog products (simulates API call)
 */
export function getCatalogProducts(): ProductListItem[] {
  return CATALOG_PRODUCTS;
}

/**
 * Get product by slug from catalog
 */
export function getCatalogProductBySlug(
  slug: string
): ProductListItem | undefined {
  return CATALOG_PRODUCTS.find((p) => p.slug === slug);
}
