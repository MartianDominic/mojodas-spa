/**
 * Product helper functions for working with scraped product data
 * Extracts and normalizes data from the raw scraped JSON structure
 */

import type { ProductShape, HeaterType, ProductCapacity } from "@/types";

/**
 * Raw scraped product spec structure
 */
export interface ScrapedProductSpec {
  label: string;
  value: string;
  iconUrl?: string;
  localIcon?: string;
}

/**
 * Raw scraped product image structure
 */
export interface ScrapedProductImage {
  url: string;
  localPath?: string;
}

/**
 * Raw scraped product structure from products.json
 */
export interface ScrapedProduct {
  id: string;
  name: string;
  url: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  specs: ScrapedProductSpec[];
  images: {
    hero: ScrapedProductImage[];
    gallery: ScrapedProductImage[];
  };
  relatedProducts: { name: string; url: string }[];
  configurableOptions: string[];
}

/**
 * Get capacity from product specs
 * Looks for "Žmonės" spec and parses "4-6" or "6" format
 */
export function getCapacity(product: ScrapedProduct): ProductCapacity {
  const capacitySpec = product.specs.find((s) => s.label === "Žmonės");

  if (!capacitySpec) {
    // Default capacity for products without explicit spec (like Arctic)
    // Check product name/tagline for hints
    if (product.tagline.toLowerCase().includes("dvivietis")) {
      return { min: 2, max: 2 };
    }
    return { min: 1, max: 2 };
  }

  const value = capacitySpec.value;

  // Handle range format: "4-6", "6-8"
  if (value.includes("-")) {
    const [min, max] = value.split("-").map((v) => parseInt(v.trim(), 10));
    return { min: min || 1, max: max || min || 2 };
  }

  // Handle single number: "6", "5"
  const num = parseInt(value, 10);
  return { min: num, max: num };
}

/**
 * Get shape type from product name
 * Round = contains "Round" or "apvalus"
 * Therapeutic = Arctic, Ofuro
 * Square = Monaco, Cuba, Macau, Paris, Andorra
 */
export function getShape(product: ScrapedProduct): ProductShape {
  const name = product.name.toLowerCase();

  // Therapeutic products
  if (name.includes("arctic") || name.includes("ofuro")) {
    return "therapeutic";
  }

  // Round products
  if (name.includes("round")) {
    return "round";
  }

  // Square products (all others: Monaco, Cuba, Macau, Paris, Andorra)
  return "square";
}

/**
 * Get heater type from tagline and specs
 * Detects: Integruota, Isorine, Horizon, Elektrinis, Silumos siurblys
 */
export function getHeaterType(product: ScrapedProduct): HeaterType {
  const tagline = product.tagline.toLowerCase();
  const heaterSpec = product.specs.find((s) => s.label === "Krosnelė");
  const heaterValue = heaterSpec?.value.toLowerCase() || "";

  // Check for Horizon (skandinaviška)
  if (tagline.includes("horizon") || tagline.includes("skandinaviška")) {
    return "external"; // Horizon is an external heater style
  }

  // Check for external heater
  if (tagline.includes("išorinė") || heaterValue.includes("išorinė")) {
    return "external";
  }

  // Check for internal heater
  if (tagline.includes("integruota") || heaterValue.includes("integruota")) {
    return "internal";
  }

  // Check for electric heating
  if (
    tagline.includes("elektrinis") ||
    product.specs.some((s) => s.label === "Elektrinis šildytuvas")
  ) {
    return "electric";
  }

  // Check for heat pump (chiller)
  if (tagline.includes("šilumos siurblys")) {
    return "electric";
  }

  // Default for products without heater (like Ofuro)
  return "none";
}

/**
 * Get a specific spec value by label
 */
export function getSpecValue(
  product: ScrapedProduct,
  label: string
): string | undefined {
  const spec = product.specs.find(
    (s) => s.label.toLowerCase() === label.toLowerCase()
  );
  return spec?.value;
}

/**
 * Get display label for heater type in Lithuanian
 */
export function getHeaterLabel(product: ScrapedProduct): string {
  const tagline = product.tagline.toLowerCase();

  if (tagline.includes("horizon") || tagline.includes("skandinaviška")) {
    return "HORIZON";
  }

  if (tagline.includes("išorinė")) {
    return "IŠORINĖ KROSNELĖ";
  }

  if (tagline.includes("integruota")) {
    return "INTEGRUOTA KROSNELĖ";
  }

  if (tagline.includes("elektrinis")) {
    return "ELEKTRINIS ŠILDYMAS";
  }

  if (tagline.includes("šilumos siurblys")) {
    return "ŠILUMOS SIURBLYS";
  }

  if (tagline.includes("dvivietis")) {
    return "DVIVIETIS";
  }

  return "TERAPINIS";
}

/**
 * Detect product variant from name
 */
export function getVariant(
  product: ScrapedProduct
): "horizon" | "in" | "out" | "chiller" | "standard" {
  const name = product.name.toLowerCase();
  const tagline = product.tagline.toLowerCase();

  if (name.includes("horizon") || tagline.includes("horizon")) {
    return "horizon";
  }

  if (name.includes("chiller")) {
    return "chiller";
  }

  if (name.endsWith(" in") || name.includes(" in ")) {
    return "in";
  }

  if (name.endsWith(" out") || name.includes(" out ")) {
    return "out";
  }

  return "standard";
}

/**
 * Get collection name from product ID
 */
export function getCollection(product: ScrapedProduct): string {
  const id = product.id.toLowerCase();

  if (id.includes("monaco")) return "monaco";
  if (id.includes("classic-round")) return "classic-round";
  if (id.includes("grande-round")) return "grande-round";
  if (id.includes("paris")) return "paris";
  if (id.includes("andorra")) return "andorra";
  if (id.includes("cuba")) return "cuba";
  if (id.includes("macau")) return "macau";
  if (id.includes("arctic")) return "arctic";
  if (id.includes("ofuro")) return "ofuro";

  return "other";
}

/**
 * Generate slug from product ID
 */
export function getSlug(product: ScrapedProduct): string {
  // Remove "-kubilas" suffix if present
  return product.id.replace(/-kubilas$/, "");
}
