/**
 * Scraped Products Data Transformation Layer
 * Transforms scraped JSON data to match our Product TypeScript types
 */

import type {
  Product,
  ProductListItem,
  ProductCollection,
  ProductVariant,
  ProductShape,
  HeaterType,
  StockStatus,
  ProductImage,
  ProductCapacity,
  ProductDimensions,
  ProductSpecs,
  ProductBadge,
  HeaterSpecs,
  JetRange,
} from "@/types";

// Import scraped data
import scrapedData from "@/data/scraped/products.json";

// Types for scraped data structure
interface ScrapedSpec {
  label: string;
  value: string;
  iconUrl: string;
  localIcon: string;
}

interface ScrapedImage {
  url: string;
  localPath: string;
}

interface ScrapedRelatedProduct {
  name: string;
  url: string;
}

interface ScrapedProductImages {
  hero: ScrapedImage[];
  gallery: ScrapedImage[];
}

interface ScrapedProduct {
  id: string;
  name: string;
  url: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  specs: ScrapedSpec[];
  images: ScrapedProductImages;
  relatedProducts: ScrapedRelatedProduct[];
  configurableOptions: string[];
}

interface ScrapedProductsData {
  scrapedAt: string;
  sourceUrl: string;
  totalProducts: number;
  products: ScrapedProduct[];
}

const scraped = scrapedData as ScrapedProductsData;

// ============================================================================
// Helper Functions
// ============================================================================

// Parse capacity from strings like "4-6", "6", "8-9"
function parseCapacity(specs: ScrapedSpec[]): ProductCapacity {
  const capacitySpec = specs.find(s => s.label.toLowerCase().includes("žmon") || s.label.toLowerCase().includes("zmon"));
  if (capacitySpec) {
    const value = capacitySpec.value;
    const match = value.match(/(\d+)(?:\s*-\s*(\d+))?/);
    if (match) {
      const min = parseInt(match[1], 10);
      const max = match[2] ? parseInt(match[2], 10) : min;
      return { min, max };
    }
  }
  return { min: 4, max: 6 };
}

// Parse dimensions from various formats
// Examples: "2m x 1,05m", "Isore 2250mm, Vidus 2000mm, Aukstis 1050mm", "2100 x 2100mm, Aukstis 1100mm"
function parseDimensions(specs: ScrapedSpec[]): ProductDimensions {
  let external = 2000;
  let internal = 1700;
  let height = 1050;

  const dimSpec = specs.find(s =>
    s.label.toLowerCase().includes("išmata") ||
    s.label.toLowerCase().includes("ismata")
  );

  if (dimSpec) {
    const value = dimSpec.value;

    // Try to extract height
    const heightMatch = value.match(/(?:H|Aukstis|Aukštis)\s*(\d+(?:[,\.]\d+)?)\s*(?:mm|m)?/i);
    if (heightMatch) {
      const h = parseFloat(heightMatch[1].replace(",", "."));
      height = h < 10 ? Math.round(h * 1000) : Math.round(h);
    }

    // Try to extract external dimension
    const externalMatch = value.match(/(?:Išorė|Isore|out)\s*(\d+(?:[,\.]\d+)?)/i);
    if (externalMatch) {
      const e = parseFloat(externalMatch[1].replace(",", "."));
      external = e < 10 ? Math.round(e * 1000) : Math.round(e);
    } else {
      // Try format like "2m x 1,05m" or "2100 x 2100mm"
      const simpleMatch = value.match(/(\d+(?:[,\.]\d+)?)\s*(?:mm|m)?\s*x/i);
      if (simpleMatch) {
        const e = parseFloat(simpleMatch[1].replace(",", "."));
        external = e < 10 ? Math.round(e * 1000) : Math.round(e);
      }
    }

    // Try to extract internal dimension
    const internalMatch = value.match(/(?:Vidus|internal)\s*(\d+(?:[,\.]\d+)?)/i);
    if (internalMatch) {
      const i = parseFloat(internalMatch[1].replace(",", "."));
      internal = i < 10 ? Math.round(i * 1000) : Math.round(i);
    } else {
      internal = Math.round(external * 0.85);
    }
  }

  return { external, internal, height, unit: "mm" };
}

// Parse weight from specs
function parseWeight(specs: ScrapedSpec[]): string {
  const weightSpec = specs.find(s => s.label.toLowerCase().includes("svoris"));
  if (weightSpec) {
    const match = weightSpec.value.match(/~?(\d+)/);
    if (match) {
      return `${match[1]} kg`;
    }
    return weightSpec.value;
  }
  return "~150 kg";
}

// Parse water capacity from specs or estimate
function parseWaterCapacity(specs: ScrapedSpec[], dimensions: ProductDimensions): string {
  const waterSpec = specs.find(s => s.label.toLowerCase().includes("vandens talpa"));
  if (waterSpec) {
    const match = waterSpec.value.match(/~?(\d+)/);
    if (match) {
      return `${match[1]} L`;
    }
    return waterSpec.value;
  }
  // Estimate based on dimensions
  const volume = Math.round((dimensions.internal * dimensions.internal * dimensions.height) / 1000000 * 400);
  return `~${volume} L`;
}

// Parse collection from product id/name
function parseCollection(id: string, name: string): ProductCollection {
  const lowerName = name.toLowerCase();
  const lowerId = id.toLowerCase();

  if (lowerId.includes("monaco") || lowerName.includes("monaco")) return "monaco";
  if (lowerId.includes("classic-round") || lowerName.includes("classic round")) return "classic-round";
  if (lowerId.includes("grande-round") || lowerName.includes("grande round")) return "grande-round";
  if (lowerId.includes("paris") || lowerName.includes("paris")) return "paris";
  if (lowerId.includes("andorra") || lowerName.includes("andorra")) return "andorra";
  if (lowerId.includes("cuba") || lowerName.includes("cuba")) return "cuba";
  if (lowerId.includes("macau") || lowerName.includes("macau")) return "macau";
  if (lowerId.includes("arctic") || lowerName.includes("arctic")) return "arctic";
  if (lowerId.includes("ofuro") || lowerName.includes("ofuro")) return "ofuro";

  return "classic-round";
}

// Parse variant from product id/name/tagline
function parseVariant(id: string, name: string, tagline: string): ProductVariant {
  const combined = `${id} ${name} ${tagline}`.toLowerCase();

  if (combined.includes("horizon") || combined.includes("skandinavisk") || combined.includes("skandinaviš")) return "horizon";
  if (combined.includes("chiller") || combined.includes("šilumos siurblys") || combined.includes("silumos siurblys")) return "chiller";
  if (combined.includes("-out") || (combined.includes(" out") && !combined.includes("without"))) return "out";
  if (combined.includes("-in") || combined.includes("integruota")) return "in";

  return "standard";
}

// Parse shape from specs/name/collection
function parseShape(id: string, name: string, collection: ProductCollection): ProductShape {
  if (collection === "arctic" || collection === "ofuro") return "therapeutic";

  const lowerName = name.toLowerCase();
  const lowerId = id.toLowerCase();

  if (lowerName.includes("round") || lowerId.includes("round")) return "round";

  return "square";
}

// Parse heater type from specs/tagline
function parseHeaterType(specs: ScrapedSpec[], tagline: string): HeaterType {
  const lowerTagline = tagline.toLowerCase();

  // Check specs for heater info
  const heaterSpec = specs.find(s => s.label.toLowerCase().includes("krosnel"));
  if (heaterSpec) {
    const lowerValue = heaterSpec.value.toLowerCase();
    if (lowerValue.includes("integruota") || lowerValue.includes("vidinis")) return "internal";
    if (lowerValue.includes("išorin") || lowerValue.includes("isorin")) return "external";
    if (lowerValue.includes("horizon")) return "internal";
  }

  // Check tagline
  if (lowerTagline.includes("integruota")) return "internal";
  if (lowerTagline.includes("išorin") || lowerTagline.includes("isorin")) return "external";
  if (lowerTagline.includes("skandinaviš")) return "internal";
  if (lowerTagline.includes("elektrinis") || lowerTagline.includes("šilumos siurblys") || lowerTagline.includes("silumos siurblys")) return "electric";
  if (lowerTagline.includes("dvivietis")) return "none";

  return "internal";
}

// Parse heater specs from krosnele value
function parseHeaterSpecs(specs: ScrapedSpec[]): HeaterSpecs | undefined {
  const heaterSpec = specs.find(s => s.label.toLowerCase().includes("krosnel"));
  if (!heaterSpec) return undefined;

  const value = heaterSpec.value;
  let type = "Malkine krosnele";
  let power = "25 kW";
  let material = "AISI 304";

  if (value.toLowerCase().includes("integruota")) {
    type = "Integruota malkine";
    if (value.toLowerCase().includes("horizon")) {
      type = "Horizon";
    }
  } else if (value.toLowerCase().includes("išorin") || value.toLowerCase().includes("isorin")) {
    type = "Isorine malkine";
  }

  const powerMatch = value.match(/(\d+)\s*kW/i);
  if (powerMatch) {
    power = `${powerMatch[1]} kW`;
  }

  if (value.includes("316")) {
    material = "AISI 316";
  } else if (value.includes("304")) {
    material = "AISI 304";
  }

  return { type, power, material };
}

// Parse jet ranges from spec values
function parseJetRange(value: string): JetRange | undefined {
  const rangeMatch = value.match(/(\d+)\s*-\s*(\d+)/);
  if (rangeMatch) {
    return { min: parseInt(rangeMatch[1], 10), max: parseInt(rangeMatch[2], 10) };
  }
  const singleMatch = value.match(/(\d+)/);
  if (singleMatch) {
    const num = parseInt(singleMatch[1], 10);
    return { min: num, max: num };
  }
  return undefined;
}

// Get spec value by label (partial match)
function getSpecValue(specs: ScrapedSpec[], label: string): string | undefined {
  const spec = specs.find(s => s.label.toLowerCase().includes(label.toLowerCase()));
  return spec?.value;
}

// Generate base price based on size, features, collection (2000-5000 EUR range)
function generateBasePrice(
  capacity: ProductCapacity,
  heaterType: HeaterType,
  collection: ProductCollection,
  variant: ProductVariant
): number {
  let base = 2500;

  // Adjust by capacity
  if (capacity.max <= 2) {
    base = collection === "arctic" && variant === "chiller" ? 4990 : 1490;
  } else if (capacity.max <= 4) {
    base = 2200;
  } else if (capacity.max <= 6) {
    base = 2800;
  } else if (capacity.max <= 8) {
    base = 3400;
  } else {
    base = 4200;
  }

  // Collection adjustments
  if (collection === "monaco") base += 400;
  if (collection === "macau") base += 200;
  if (collection === "grande-round") base += 300;
  if (collection === "ofuro") base = 1890;
  if (collection === "arctic" && variant !== "chiller") base = 1490;

  // Variant adjustments
  if (variant === "horizon") base += 600;
  if (variant === "out") base += 200;

  // Heater adjustments
  if (heaterType === "external") base += 100;

  // Ensure within 2000-5000 range (except special cases)
  if (collection !== "arctic" && collection !== "ofuro") {
    base = Math.max(2000, Math.min(5000, base));
  }

  // Round to nearest 10
  return Math.round(base / 10) * 10;
}

// Generate badges based on product attributes
function generateBadges(
  variant: ProductVariant,
  collection: ProductCollection,
  heaterType: HeaterType,
  isFeatured: boolean
): ProductBadge[] {
  const badges: ProductBadge[] = [];

  if (variant === "horizon") {
    badges.push({ text: "HORIZON", variant: "accent" });
  } else if (collection === "arctic" && variant === "chiller") {
    badges.push({ text: "PREMIUM", variant: "primary" });
  } else if (heaterType === "internal") {
    badges.push({ text: "Integruota krosnele", variant: "secondary" });
  } else if (heaterType === "external") {
    badges.push({ text: "Isorine krosnele", variant: "secondary" });
  }

  if (isFeatured && badges.length === 0) {
    badges.push({ text: "Populiarus", variant: "primary" });
  }

  return badges;
}

// Placeholder images using working lh3 URLs
const PLACEHOLDER_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDLCc95wXpJ75aZGgdFs7-vwoxe7RUHJj_1qxTUcRhI8zvh50gXSTicNSCeEakXuZr6M-L0CAEuOF56Ni331j6V5e_abs6QbLivsIgdM11i2bzey0UUIqL085Q5ys_zzmevwPiIUfAcqzlrmW5U3uoHugJqkPYwYBzM8GPWS8h3CAidDwYufn0XDN7cuU27BW0FcyrjSSQ7VvSZoau2zMURoggFxV5i3wkxZ2Qz93B8slLgXIgBPjqMWnvPoj4IFsswbEEJyHRwhik",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCQF0iRK4nuaXgoWoUcoeqbc0VhwTG4AXksk1m0L7Thh6otUpVrgsu4MINOL7PufWmw3qR7lo_0e1Q8D7fcLN6jOH3HHqdFr4LDtd6KAG8NZ11nxfi1yo8i08OBtdk86dqf3yuwNJCjrUj0VKgp82BVhCxKVvY58gL0eSpb3NMQ9-u8c-iErj0wu8Y5ilIuUu23pewjzF3MU6fzd8aLApTZtqP7yciLq2qFd5p3tCOr_4pxSBEx8UvYdgUJGCINnyzoIugf4deHPAA",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA6jvWC4VZKtz1BGxZ5gQ1yVxY1DdSl1F4GXvNwBK6o3CpcQYDO7AhE8iSeXYJ9SrUNmnNRTamaYMchE15wbQwzAZsGzQ0hf7dkGYu9TKVKq0forlJnmWsZwiL1pWZ_7Qf6JD_OQ0mdfJgjwFRXpM1m0dVkPmt_JGGvSYldwHsJ3hXY8uOAPRVLd4lR2ytTkiNC9h9U7bEFFl3yraid1VDtjeqCgsuxYJouhOefOwBeBwDv_6Yf8ldPeDnitcPkJkSEz75hUrkvfR4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBcc-_pz3yDuVJhYgqDULzjZGKFWTGKC_prEXti2syqkOtJ9m_y3zizzY3pN421_dFpEUR0OMrrtSqRBiWRf4rctpEwQAnuPqjmqJUcbgnkxnK_GkQV-LTMg0_swDvQt4Lvv0v93XlLgqDLAw_1mGrBSWzF33F__HThVpym4GIPhXtr2RTS4gARL6wKh9oYeyHroKa60XofZMMREeS74HTbkNnINYBsyt7HNu6uX7ryKTFL8w24lq29aKgqb7uJHtToywmn922rQYY",
];

// Convert scraped images to ProductImage array
function convertImages(images: ScrapedProductImages, productName: string): ProductImage[] {
  const result: ProductImage[] = [];

  // Use placeholder images since mojodasspa.com blocks external access
  // Rotate through available placeholders based on product name hash
  const hashCode = productName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const primaryIdx = hashCode % PLACEHOLDER_IMAGES.length;

  // Add primary image
  result.push({
    url: PLACEHOLDER_IMAGES[primaryIdx],
    alt: `${productName} - 1`,
    width: 800,
    height: 1000,
  });

  // Add 2 more gallery images with different placeholders
  result.push({
    url: PLACEHOLDER_IMAGES[(primaryIdx + 1) % PLACEHOLDER_IMAGES.length],
    alt: `${productName} galerija - 1`,
    width: 800,
    height: 1000,
  });

  result.push({
    url: PLACEHOLDER_IMAGES[(primaryIdx + 2) % PLACEHOLDER_IMAGES.length],
    alt: `${productName} galerija - 2`,
    width: 800,
    height: 1000,
  });

  return result;
}

// Extract slug from URL or ID
function extractSlug(id: string, url: string): string {
  const urlMatch = url.match(/katalogo-vidinis\/([^\/]+)\/?$/);
  if (urlMatch) {
    return urlMatch[1];
  }
  return id.replace(/-kubilas$/i, "");
}

// Extract related product slugs from URLs
function extractRelatedSlugs(relatedProducts: ScrapedRelatedProduct[]): string[] {
  return relatedProducts
    .map(rp => {
      const match = rp.url.match(/katalogo-vidinis\/([^\/]+)\/?$/);
      return match ? match[1] : "";
    })
    .filter(Boolean);
}

// ============================================================================
// Main Transformation
// ============================================================================

// Deduplicate products by slug (keep the one with more specs)
function deduplicateProducts(products: ScrapedProduct[]): ScrapedProduct[] {
  const productMap = new Map<string, ScrapedProduct>();

  for (const product of products) {
    const slug = extractSlug(product.id, product.url);
    const existing = productMap.get(slug);

    if (!existing) {
      productMap.set(slug, product);
    } else if (product.specs.length > existing.specs.length || product.images.hero.length > existing.images.hero.length) {
      productMap.set(slug, product);
    }
  }

  return Array.from(productMap.values());
}

// Convert scraped product to our Product type
function convertScrapedProduct(scrapedProduct: ScrapedProduct, index: number): Product {
  const slug = extractSlug(scrapedProduct.id, scrapedProduct.url);
  const collection = parseCollection(scrapedProduct.id, scrapedProduct.name);
  const variant = parseVariant(scrapedProduct.id, scrapedProduct.name, scrapedProduct.tagline);
  const shape = parseShape(scrapedProduct.id, scrapedProduct.name, collection);
  const heaterType = parseHeaterType(scrapedProduct.specs, scrapedProduct.tagline);

  // Parse specs
  const capacity = parseCapacity(scrapedProduct.specs);
  const dimensions = parseDimensions(scrapedProduct.specs);
  const weight = parseWeight(scrapedProduct.specs);
  const waterCapacity = parseWaterCapacity(scrapedProduct.specs, dimensions);
  const heaterSpecs = parseHeaterSpecs(scrapedProduct.specs);

  // Parse optional jet/LED specs
  const airJetsSpec = getSpecValue(scrapedProduct.specs, "oro purk");
  const waterJetsSpec = getSpecValue(scrapedProduct.specs, "vandens purk");
  const ledSpec = getSpecValue(scrapedProduct.specs, "led") || getSpecValue(scrapedProduct.specs, "žvaig");

  // Determine if featured
  const isFeatured = index < 5 || variant === "horizon" || (collection === "arctic" && variant === "chiller");

  // Generate pricing
  const basePrice = generateBasePrice(capacity, heaterType, collection, variant);
  const monthlyPayment = Math.ceil(basePrice / 36);

  // Build specs object
  const specs: ProductSpecs = {
    capacity,
    weight,
    dimensions,
    heater: heaterSpecs,
    waterCapacity,
    airJets: airJetsSpec ? parseJetRange(airJetsSpec) : undefined,
    waterJets: waterJetsSpec ? parseJetRange(waterJetsSpec) : undefined,
    ledStars: ledSpec ? parseJetRange(ledSpec) : undefined,
  };

  // Convert images
  const images = convertImages(scrapedProduct.images, scrapedProduct.name);

  return {
    id: `prod_${slug.replace(/-/g, "_")}`,
    slug,
    name: scrapedProduct.name,
    collection,
    variant,
    tagline: scrapedProduct.tagline,
    shortDescription: scrapedProduct.shortDescription,
    longDescription: scrapedProduct.longDescription,
    badges: generateBadges(variant, collection, heaterType, isFeatured),
    shape,
    capacity,
    heaterType,
    basePrice,
    monthlyPayment,
    currency: "EUR",
    specs,
    images,
    thumbnail: images[0],
    configurableOptions: scrapedProduct.configurableOptions,
    relatedProducts: extractRelatedSlugs(scrapedProduct.relatedProducts),
    isActive: true,
    isFeatured,
    stockStatus: "made_to_order" as StockStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// Process all scraped products
const deduplicatedProducts = deduplicateProducts(scraped.products);
const allScrapedProducts: Product[] = deduplicatedProducts.map(convertScrapedProduct);

// ============================================================================
// Exports
// ============================================================================

/**
 * All transformed scraped products
 */
export const SCRAPED_PRODUCTS: Product[] = allScrapedProducts;

/**
 * Get all scraped products
 */
export function getAllScrapedProducts(): Product[] {
  return allScrapedProducts;
}

/**
 * Get scraped product by slug
 */
export function getScrapedProductBySlug(slug: string): Product | undefined {
  return allScrapedProducts.find(p => p.slug === slug);
}

/**
 * Get scraped product by ID
 */
export function getScrapedProductById(id: string): Product | undefined {
  return allScrapedProducts.find(p => p.id === id);
}

/**
 * Get all scraped product slugs
 */
export function getAllScrapedProductSlugs(): string[] {
  return allScrapedProducts.map(p => p.slug);
}

/**
 * Get scraped products as list items
 */
export function getScrapedProductListItems(): ProductListItem[] {
  return allScrapedProducts.map(product => ({
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
    thumbnail: product.images[0],
    isFeatured: product.isFeatured,
    stockStatus: product.stockStatus,
  }));
}

/**
 * Get related products from scraped data
 */
export function getScrapedRelatedProducts(product: Product, limit: number = 4): ProductListItem[] {
  if (product.relatedProducts && product.relatedProducts.length > 0) {
    const related = product.relatedProducts
      .map(slug => allScrapedProducts.find(p => p.slug === slug))
      .filter((p): p is Product => p !== undefined)
      .slice(0, limit);

    if (related.length > 0) {
      return related.map(p => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        collection: p.collection,
        variant: p.variant,
        tagline: p.tagline,
        shape: p.shape,
        capacity: p.capacity,
        heaterType: p.heaterType,
        basePrice: p.basePrice,
        monthlyPayment: p.monthlyPayment,
        currency: p.currency,
        badges: p.badges,
        images: p.images,
        thumbnail: p.images[0],
        isFeatured: p.isFeatured,
        stockStatus: p.stockStatus,
      }));
    }
  }

  // Fallback: find products from same collection or shape
  const related = allScrapedProducts
    .filter(p => p.id !== product.id && (p.collection === product.collection || p.shape === product.shape))
    .slice(0, limit);

  return related.map(p => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    collection: p.collection,
    variant: p.variant,
    tagline: p.tagline,
    shape: p.shape,
    capacity: p.capacity,
    heaterType: p.heaterType,
    basePrice: p.basePrice,
    monthlyPayment: p.monthlyPayment,
    currency: p.currency,
    badges: p.badges,
    images: p.images,
    thumbnail: p.images[0],
    isFeatured: p.isFeatured,
    stockStatus: p.stockStatus,
  }));
}

/**
 * Get scraped data metadata
 */
export function getScrapedDataInfo() {
  return {
    scrapedAt: scraped.scrapedAt,
    sourceUrl: scraped.sourceUrl,
    totalProducts: allScrapedProducts.length,
    originalCount: scraped.totalProducts,
    lastTransformed: new Date().toISOString(),
  };
}
