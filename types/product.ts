/**
 * Product Types for MojoDas Spa
 * TypeScript definitions matching PRD Section 3.1 and JSON data structure
 */

// Discriminated union types for collections
export type ProductCollection =
  | "monaco"
  | "classic-round"
  | "grande-round"
  | "paris"
  | "andorra"
  | "cuba"
  | "macau"
  | "arctic"
  | "ofuro";

export type ProductVariant = "horizon" | "in" | "out" | "chiller" | "standard";

export type ProductShape = "round" | "square" | "therapeutic";

export type HeaterType = "internal" | "external" | "electric" | "none";

export type StockStatus = "in_stock" | "made_to_order" | "out_of_stock";

export type BadgeVariant = "primary" | "secondary" | "accent";

export interface ProductBadge {
  text: string;
  variant: BadgeVariant;
}

export interface ProductImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProductCapacity {
  min: number;
  max: number;
}

export interface ProductDimensions {
  external: number;
  internal: number;
  height: number;
  unit: "mm";
}

export interface HeaterSpecs {
  type: string;
  power: string;
  material: string;
}

export interface JetRange {
  min: number;
  max: number;
}

// Specs structure matching the JSON data
export interface ProductSpecs {
  capacity: ProductCapacity;
  weight: string;
  dimensions: ProductDimensions;
  heater?: HeaterSpecs;
  waterCapacity: string;
  airJets?: JetRange;
  waterJets?: JetRange;
  ledStars?: JetRange;
  ledLamps?: JetRange;
}

export interface ProductSEO {
  title: string;
  description: string;
  keywords?: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  collection: ProductCollection;
  variant: ProductVariant;

  // Display
  tagline: string;
  shortDescription: string;
  longDescription: string;
  badges: ProductBadge[];

  // Categorization
  shape: ProductShape;
  capacity: ProductCapacity;
  heaterType: HeaterType;

  // Pricing
  basePrice: number;
  monthlyPayment: number;
  currency: "EUR";

  // Technical
  specs: ProductSpecs;

  // Media
  images: ProductImage[];
  thumbnail?: ProductImage;

  // Configuration
  configurableOptions: string[];
  relatedProducts?: string[];

  // SEO (optional in data)
  seo?: ProductSEO;

  // Status
  isActive: boolean;
  isFeatured: boolean;
  stockStatus: StockStatus;

  // Timestamps (optional in data)
  createdAt?: string;
  updatedAt?: string;
}

// List view subset for performance
export interface ProductListItem {
  id: string;
  slug: string;
  name: string;
  collection: ProductCollection;
  variant: ProductVariant;
  tagline: string;
  shape: ProductShape;
  capacity: ProductCapacity;
  heaterType: HeaterType;
  basePrice: number;
  monthlyPayment: number;
  currency: "EUR";
  badges: ProductBadge[];
  images: ProductImage[];
  thumbnail?: ProductImage;
  isFeatured: boolean;
  stockStatus: StockStatus;
}

// Filter options for catalog
export interface ProductFilters {
  collection?: ProductCollection;
  shape?: ProductShape;
  heaterType?: HeaterType;
  minCapacity?: number;
  maxCapacity?: number;
  minPrice?: number;
  maxPrice?: number;
  isFeatured?: boolean;
  stockStatus?: StockStatus;
}

// Sort options
export type ProductSortField = "name" | "basePrice" | "capacity" | "createdAt";
export type SortDirection = "asc" | "desc";

export interface ProductSort {
  field: ProductSortField;
  direction: SortDirection;
}

// Products collection type (for JSON import)
export interface ProductsData {
  products: Product[];
  lastUpdated?: string;
  version?: string;
}
