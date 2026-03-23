// Class name utility
export { cn } from "./cn";

// Product helpers for scraped data
export {
  getCapacity,
  getShape,
  getHeaterType,
  getHeaterLabel,
  getSpecValue,
  getVariant,
  getCollection,
  getSlug,
  type ScrapedProduct,
  type ScrapedProductSpec,
  type ScrapedProductImage,
} from "./product-helpers";

// Price formatting and calculation
export { formatPrice, formatMonthlyPayment, calculateConfigPrice } from "./format";

// Advanced price utilities
export {
  calculateConfigurationPrice,
  calculateMonthlyPayment,
  generateLeasingOptions,
  formatPriceBreakdown,
  calculatePriceDifference,
  findOptionPriceRange,
  calculateBundleSavings,
  type PriceBreakdownItem,
  type PriceBreakdown,
  type ConfigurationPriceResult,
  type MonthlyPaymentOptions,
} from "./price";

// Validation utilities
export {
  validateEmail,
  validatePhone,
  validatePostalCode,
  validateConfiguration,
  // Zod schemas
  customerSchema,
  deliverySchema,
  paymentSchema,
  checkoutSchema,
  leadFormSchema,
  contactFormSchema,
  newsletterSchema,
  // Types
  type CustomerFormData,
  type DeliveryFormData,
  type PaymentFormData,
  type CheckoutFormData,
  type LeadFormData,
  type ContactFormData,
  type NewsletterFormData,
} from "./validation";

// Image utilities
export {
  getProductImageUrl,
  getProductHeroUrl,
  getProductGalleryUrls,
  getConfigImageUrl,
  getIconUrl,
  getSpecIconUrl,
  getImageProps,
  isCdnUrl,
  isLocalPath,
  generateSrcSet,
  DEFAULT_PRODUCT_IMAGE,
  DEFAULT_ICON,
  DEFAULT_CONFIG_IMAGE,
  type ImageSource,
} from "./images";
