/**
 * Image URL utilities for MojoDas Spa
 *
 * Currently uses mojodasspa.com CDN URLs.
 * Can be switched to local images later by changing USE_LOCAL_IMAGES to true
 * and ensuring images are copied to /public/images/
 */

// Toggle this to switch between CDN and local images
const USE_LOCAL_IMAGES = false;

// Default fallback images
export const DEFAULT_PRODUCT_IMAGE = "/images/products/placeholder.svg";
export const DEFAULT_ICON = "/images/icons/placeholder.svg";
export const DEFAULT_CONFIG_IMAGE = "/images/config/placeholder.svg";

/**
 * Image source with both local path and original CDN URL
 */
export interface ImageSource {
  localPath?: string;
  url?: string;
  originalUrl?: string;
}

/**
 * Get the appropriate image URL based on configuration
 * Prefers originalUrl/url (CDN) unless USE_LOCAL_IMAGES is true
 */
function getImageUrl(
  source: ImageSource | string | undefined,
  fallback: string
): string {
  if (!source) {
    return fallback;
  }

  // If source is a string, treat it as a direct URL
  if (typeof source === "string") {
    return source;
  }

  if (USE_LOCAL_IMAGES) {
    // Use local path if available
    if (source.localPath) {
      // Ensure path starts with /
      return source.localPath.startsWith("/")
        ? source.localPath
        : `/${source.localPath}`;
    }
  }

  // Use CDN URL (prefer originalUrl, then url)
  return source.originalUrl || source.url || fallback;
}

/**
 * Get product image URL
 * Handles both hero and gallery images from products.json format
 */
export function getProductImageUrl(
  source: ImageSource | string | undefined
): string {
  return getImageUrl(source, DEFAULT_PRODUCT_IMAGE);
}

/**
 * Get product hero image URL
 * Convenience function for the primary product image
 */
export function getProductHeroUrl(
  images: { hero?: ImageSource[] } | undefined
): string {
  if (!images?.hero?.length) {
    return DEFAULT_PRODUCT_IMAGE;
  }
  return getProductImageUrl(images.hero[0]);
}

/**
 * Get all product gallery image URLs
 */
export function getProductGalleryUrls(
  images: { gallery?: ImageSource[] } | undefined
): string[] {
  if (!images?.gallery?.length) {
    return [];
  }
  return images.gallery.map((img) => getProductImageUrl(img));
}

/**
 * Get configuration option image URL
 * For acrylic colors, wood finishes, etc.
 */
export function getConfigImageUrl(
  source: ImageSource | string | undefined
): string {
  return getImageUrl(source, DEFAULT_CONFIG_IMAGE);
}

/**
 * Get icon URL
 * For spec icons and feature icons
 */
export function getIconUrl(source: ImageSource | string | undefined): string {
  return getImageUrl(source, DEFAULT_ICON);
}

/**
 * Get spec icon URL from spec object
 * Handles the iconUrl/localIcon format from products.json
 */
export function getSpecIconUrl(spec: {
  iconUrl?: string;
  localIcon?: string;
}): string {
  if (USE_LOCAL_IMAGES && spec.localIcon) {
    return spec.localIcon.startsWith("/") ? spec.localIcon : `/${spec.localIcon}`;
  }
  return spec.iconUrl || DEFAULT_ICON;
}

/**
 * Check if an image URL is from the CDN
 */
export function isCdnUrl(url: string): boolean {
  return url.includes("mojodasspa.com");
}

/**
 * Check if an image URL is a local path
 */
export function isLocalPath(url: string): boolean {
  return url.startsWith("/") && !url.startsWith("//");
}

/**
 * Generate srcSet for responsive images (CDN only)
 * WordPress/WooCommerce generates multiple sizes automatically
 */
export function generateSrcSet(
  baseUrl: string,
  sizes: number[] = [300, 600, 1200]
): string {
  if (!isCdnUrl(baseUrl)) {
    return "";
  }

  // WordPress image URL pattern: image-WxH.ext or image.ext
  // Try to generate srcset by modifying the URL
  const urlParts = baseUrl.match(/(.+?)(-\d+x\d+)?(\.[^.]+)$/);
  if (!urlParts) {
    return "";
  }

  const [, base, , ext] = urlParts;

  return sizes.map((size) => `${base}-${size}x${size}${ext} ${size}w`).join(", ");
}

/**
 * Get optimized image props for Next.js Image component
 */
export function getImageProps(
  source: ImageSource | string | undefined,
  type: "product" | "config" | "icon" = "product"
): {
  src: string;
  unoptimized?: boolean;
} {
  let src: string;

  switch (type) {
    case "config":
      src = getConfigImageUrl(source);
      break;
    case "icon":
      src = getIconUrl(source);
      break;
    default:
      src = getProductImageUrl(source);
  }

  return {
    src,
    // SVGs should not be optimized by Next.js
    unoptimized: src.endsWith(".svg"),
  };
}
