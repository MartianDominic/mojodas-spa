import type { Metadata, Viewport } from "next";
import { DEFAULT_SEO, COMPANY_INFO, EXTERNAL_LINKS } from "@/lib/constants";
import type { Product, ProductListItem } from "@/types";

// ============================================================================
// Types
// ============================================================================

export interface PageMetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: "website" | "article";
}

export interface ProductMetadataOptions {
  includePrice?: boolean;
  includeBrand?: boolean;
  includeAvailability?: boolean;
}

// ============================================================================
// Default Configuration
// ============================================================================

/**
 * Default viewport configuration
 */
export const defaultViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: DEFAULT_SEO.themeColor },
    { media: "(prefers-color-scheme: dark)", color: "#0D0D0D" },
  ],
};

/**
 * Base URL for the site
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mojodasspa.com";

/**
 * Default Open Graph image
 */
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.jpg`;

// ============================================================================
// Metadata Generators
// ============================================================================

/**
 * Generate default metadata for the entire site
 *
 * Use in root layout.tsx:
 * ```tsx
 * export const metadata = generateDefaultMetadata();
 * ```
 */
export function generateDefaultMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: DEFAULT_SEO.title,
      template: `%s | ${DEFAULT_SEO.siteName}`,
    },
    description: DEFAULT_SEO.description,
    keywords: [...DEFAULT_SEO.keywords],
    authors: [{ name: COMPANY_INFO.name }],
    creator: COMPANY_INFO.name,
    publisher: COMPANY_INFO.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: DEFAULT_SEO.locale,
      url: SITE_URL,
      siteName: DEFAULT_SEO.siteName,
      title: DEFAULT_SEO.title,
      description: DEFAULT_SEO.description,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: DEFAULT_SEO.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: DEFAULT_SEO.title,
      description: DEFAULT_SEO.description,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    alternates: {
      canonical: SITE_URL,
      languages: {
        "lt-LT": SITE_URL,
      },
    },
  };
}

/**
 * Generate metadata for a specific page
 *
 * @param options - Page metadata options
 * @returns Next.js Metadata object
 *
 * @example
 * ```tsx
 * export const metadata = generatePageMetadata({
 *   title: "Katalogas",
 *   description: "Peržiūrėkite visą kubilų kolekciją",
 *   canonicalPath: "/katalogas"
 * });
 * ```
 */
export function generatePageMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description = DEFAULT_SEO.description,
    keywords = [...DEFAULT_SEO.keywords],
    noIndex = false,
    noFollow = false,
    canonicalPath,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = "website",
  } = options;

  const canonicalUrl = canonicalPath ? `${SITE_URL}${canonicalPath}` : undefined;

  return {
    title,
    description,
    keywords: Array.isArray(keywords) ? [...keywords] : keywords,
    openGraph: {
      type: ogType,
      title: title ? `${title} | ${DEFAULT_SEO.siteName}` : DEFAULT_SEO.title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || DEFAULT_SEO.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | ${DEFAULT_SEO.siteName}` : DEFAULT_SEO.title,
      description,
      images: [ogImage],
    },
    robots: {
      index: !noIndex,
      follow: !noFollow,
    },
    alternates: canonicalUrl
      ? {
          canonical: canonicalUrl,
        }
      : undefined,
  };
}

/**
 * Generate metadata for a product page
 *
 * @param product - Product data
 * @param options - Additional options
 * @returns Next.js Metadata object
 *
 * @example
 * ```tsx
 * export async function generateMetadata({ params }) {
 *   const product = await getProduct(params.slug);
 *   return generateProductMetadata(product);
 * }
 * ```
 */
export function generateProductMetadata(
  product: Product | ProductListItem,
  options: ProductMetadataOptions = {}
): Metadata {
  const {
    includePrice = true,
    includeBrand = true,
    includeAvailability = true,
  } = options;

  // Use product SEO if available, otherwise generate from product data
  const seoTitle = "seo" in product && product.seo?.title
    ? product.seo.title
    : product.name;

  const seoDescription = "seo" in product && product.seo?.description
    ? product.seo.description
    : generateProductDescription(product);

  const seoKeywords = "seo" in product && product.seo?.keywords
    ? product.seo.keywords
    : generateProductKeywords(product);

  // Get product image for OG
  const ogImage = "images" in product && product.images?.[0]?.url
    ? product.images[0].url
    : "thumbnail" in product && product.thumbnail?.url
      ? product.thumbnail.url
      : DEFAULT_OG_IMAGE;

  const canonicalUrl = `${SITE_URL}/produktas/${product.slug}`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    openGraph: {
      type: "website",
      title: `${seoTitle} | ${DEFAULT_SEO.siteName}`,
      description: seoDescription,
      url: canonicalUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${seoTitle} | ${DEFAULT_SEO.siteName}`,
      description: seoDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    other: {
      // Product structured data hints
      ...(includePrice && {
        "product:price:amount": product.basePrice.toString(),
        "product:price:currency": "EUR",
      }),
      ...(includeBrand && {
        "product:brand": COMPANY_INFO.name,
      }),
      ...(includeAvailability && "stockStatus" in product && {
        "product:availability": product.stockStatus === "in_stock"
          ? "in stock"
          : "made to order",
      }),
    },
  };
}

/**
 * Generate product JSON-LD structured data
 *
 * @param product - Product data
 * @returns JSON-LD script content
 */
export function generateProductJsonLd(product: Product): object {
  const image = product.images?.[0]?.url || product.thumbnail?.url;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription || product.tagline,
    image: image ? [image] : undefined,
    brand: {
      "@type": "Brand",
      name: COMPANY_INFO.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: COMPANY_INFO.legalName,
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY_INFO.address.street,
        addressLocality: COMPANY_INFO.address.city,
        postalCode: COMPANY_INFO.address.postalCode,
        addressCountry: COMPANY_INFO.address.countryCode,
      },
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/produktas/${product.slug}`,
      priceCurrency: "EUR",
      price: product.basePrice,
      priceValidUntil: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toISOString().split("T")[0],
      availability:
        product.stockStatus === "in_stock"
          ? "https://schema.org/InStock"
          : product.stockStatus === "made_to_order"
            ? "https://schema.org/PreOrder"
            : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: COMPANY_INFO.name,
      },
    },
    category: product.shape === "therapeutic"
      ? "Terapiniai kubilai"
      : product.shape === "round"
        ? "Apvalūs kubilai"
        : "Kvadratiniai kubilai",
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Talpa",
        value: `${product.capacity.min}-${product.capacity.max} asmenys`,
      },
      {
        "@type": "PropertyValue",
        name: "Forma",
        value: product.shape,
      },
    ],
  };
}

/**
 * Generate organization JSON-LD structured data
 */
export function generateOrganizationJsonLd(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_INFO.name,
    legalName: COMPANY_INFO.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description: DEFAULT_SEO.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_INFO.address.street,
      addressLocality: COMPANY_INFO.address.city,
      postalCode: COMPANY_INFO.address.postalCode,
      addressCountry: COMPANY_INFO.address.countryCode,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: COMPANY_INFO.phone,
      contactType: "customer service",
      availableLanguage: ["Lithuanian", "English"],
    },
    sameAs: [
      EXTERNAL_LINKS.mainWebsite,
      // Add social links here
    ],
  };
}

/**
 * Generate breadcrumb JSON-LD structured data
 */
export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Generate product description from product data
 */
function generateProductDescription(product: Product | ProductListItem): string {
  const parts: string[] = [];

  parts.push(product.name);

  if ("tagline" in product && product.tagline) {
    parts.push(product.tagline);
  }

  parts.push(`Talpa: ${product.capacity.min}-${product.capacity.max} asmenys`);
  parts.push(`Kaina nuo ${product.basePrice} €`);
  parts.push("Pagaminta Lietuvoje");

  return parts.join(". ") + ".";
}

/**
 * Generate product keywords from product data
 */
function generateProductKeywords(product: Product | ProductListItem): string[] {
  const keywords = new Set<string>([
    product.name,
    product.collection,
    product.shape === "round" ? "apvalus kubilas" : product.shape === "square" ? "kvadratinis kubilas" : "terapinis kubilas",
    "kubilas",
    "spa",
    "hot tub",
    "MojoDas",
    "Lietuva",
  ]);

  if ("variant" in product) {
    keywords.add(product.variant);
  }

  return Array.from(keywords);
}

/**
 * Generate category page metadata
 */
export function generateCategoryMetadata(
  category: "round" | "square" | "therapeutic",
  productCount?: number
): Metadata {
  const categoryNames = {
    round: {
      title: "Apvalūs Kubilai",
      description: "Klasikinės apvalios formos kubilai nuo MojoDas Spa. Talpumas 4-8 asmenims, pagaminta Lietuvoje.",
    },
    square: {
      title: "Kvadratiniai Kubilai",
      description: "Modernaus dizaino kvadratiniai kubilai. Erdvūs, patogūs, su išorine arba vidine krosnimi.",
    },
    therapeutic: {
      title: "Terapiniai Kubilai",
      description: "Šalto vandens terapijos ir Ofuro stiliaus kubilai. Idealūs atsipalaidavimui ir sveikatai.",
    },
  };

  const { title, description } = categoryNames[category];
  const countSuffix = productCount ? ` (${productCount} produktai)` : "";

  return generatePageMetadata({
    title: `${title}${countSuffix}`,
    description,
    canonicalPath: `/katalogas/${category}`,
    keywords: [
      ...DEFAULT_SEO.keywords,
      title.toLowerCase(),
      `${category} kubilai`,
    ],
  });
}
