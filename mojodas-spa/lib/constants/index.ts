// Re-export routes
export * from "./routes";

// ============================================================================
// Company Information
// ============================================================================

export const COMPANY_INFO = {
  name: "Lux Spa Nature",
  legalName: "UAB Lux Spa Nature",
  tagline: "Engineering of Serenity",
  taglineLt: "Ramybės inžinerija",

  // Address
  address: {
    street: "Gamyklos g. 1",
    city: "Vilnius",
    postalCode: "LT-01234",
    country: "Lietuva",
    countryCode: "LT",
  },

  // Contact
  phone: "+370 600 12345",
  phoneFormatted: "+370 600 12 345",
  email: "info@luxspanaturespa.com",
  supportEmail: "pagalba@mojodasspa.com",
  salesEmail: "pardavimai@mojodasspa.com",

  // Business details
  companyCode: "123456789",
  vatCode: "LT123456789",

  // Working hours
  workingHours: {
    weekdays: "I-V: 9:00 - 18:00",
    saturday: "VI: 10:00 - 14:00",
    sunday: "VII: Nedirbame",
  },
} as const;

// ============================================================================
// Social Media Links
// ============================================================================

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/mojodasspa",
  instagram: "https://www.instagram.com/mojodasspa",
  youtube: "https://www.youtube.com/@mojodasspa",
  linkedin: "https://www.linkedin.com/company/mojodasspa",
  pinterest: "https://www.pinterest.com/mojodasspa",
} as const;

export type SocialPlatform = keyof typeof SOCIAL_LINKS;

// ============================================================================
// External Service URLs
// ============================================================================

export const CALENDLY_URL = "https://calendly.com/mojodasspa/15min-konsultacija";

export const EXTERNAL_LINKS = {
  calendly: CALENDLY_URL,
  calendlyB2B: "https://calendly.com/mojodasspa/b2b-konsultacija",
  mainWebsite: "https://mojodasspa.com",
  privacyPolicy: "/privatumo-politika",
  termsOfService: "/pirkimo-salygos",
  cookiePolicy: "/slapuku-politika",
  warrantyTerms: "/garantijos-salygos",
} as const;

// ============================================================================
// Payment & Leasing
// ============================================================================

export const PAYMENT_METHODS = {
  banklink: {
    id: "banklink",
    name: "Banklink",
    nameLt: "Bankinis pavedimas",
    icon: "account_balance",
    description: "SEB, Swedbank, Luminor ir kt.",
  },
  card: {
    id: "card",
    name: "Card",
    nameLt: "Mokėjimo kortelė",
    icon: "credit_card",
    description: "Visa, Mastercard",
  },
  leasing: {
    id: "leasing",
    name: "Leasing",
    nameLt: "Išsimokėtinai",
    icon: "payments",
    description: "ESTO, Montonio",
  },
} as const;

export const LEASING_TERMS = [12, 24, 36, 48] as const;
export type LeasingTerm = (typeof LEASING_TERMS)[number];

export const DEFAULT_LEASING_TERM: LeasingTerm = 36;

// ============================================================================
// Product Configuration
// ============================================================================

export const PRODUCT_CATEGORIES = {
  round: {
    id: "round",
    name: "Round",
    nameLt: "Apvalios kubilai",
    description: "Klasikinės apvalios formos kubilai",
  },
  square: {
    id: "square",
    name: "Square",
    nameLt: "Kvadratiniai kubilai",
    description: "Modernaus dizaino kvadratiniai kubilai",
  },
  therapeutic: {
    id: "therapeutic",
    name: "Therapeutic",
    nameLt: "Terapiniai kubilai",
    description: "Šalto vandens ir terapiniai kubilai",
  },
} as const;

export const CAPACITY_OPTIONS = [
  { value: "1-2", label: "1-2 asmenys", min: 1, max: 2 },
  { value: "4-6", label: "4-6 asmenys", min: 4, max: 6 },
  { value: "6-8", label: "6-8 asmenys", min: 6, max: 8 },
  { value: "8-10", label: "8-10 asmenų", min: 8, max: 10 },
] as const;

// ============================================================================
// Trust Badges & USPs
// ============================================================================

export const TRUST_BADGES = [
  {
    id: "made-in-lithuania",
    icon: "flag",
    title: "PAGAMINTA LIETUVOJE",
    titleEn: "MADE IN LITHUANIA",
    description: "Visa gamyba Lietuvoje",
  },
  {
    id: "aisi-316",
    icon: "science",
    title: "AISI 316 PLIENAS",
    titleEn: "AISI 316 STEEL",
    description: "Medicininis plienas",
  },
  {
    id: "warranty",
    icon: "verified",
    title: "5 METŲ GARANTIJA",
    titleEn: "5 YEAR WARRANTY",
    description: "Ilgaamžiškumo garantija",
  },
  {
    id: "smart-payments",
    icon: "payments",
    title: "IŠMANUS MOKĖJIMAS",
    titleEn: "SMART PAYMENTS",
    description: "Mokėjimas dalimis",
  },
] as const;

// ============================================================================
// SEO & Meta
// ============================================================================

export const DEFAULT_SEO = {
  siteName: "Lux Spa Nature",
  title: "Lux Spa Nature | Prabangūs kubilai Lietuvoje",
  description:
    "Aukščiausios kokybės kubilai ir SPA sprendimai. Pagaminta Lietuvoje, AISI 316 plienas, 5 metų garantija. Užsisakykite nemokamą konsultaciją.",
  keywords: [
    "kubilai",
    "spa",
    "karšta vonia",
    "hot tub",
    "lauko kubilai",
    "mediniai kubilai",
    "AISI 316",
    "Lietuva",
  ],
  locale: "lt_LT",
  type: "website",
  twitterCard: "summary_large_image",
  themeColor: "#755a26",
} as const;

// ============================================================================
// Shipping & Delivery
// ============================================================================

export const SHIPPING_INFO = {
  freeShippingThreshold: 0, // Free shipping on all orders
  estimatedDeliveryDays: {
    min: 14,
    max: 21,
  },
  deliveryNote: "Pristatymas visoje Lietuvoje",
  installationAvailable: true,
  installationNote: "Galime suteikti montavimo paslaugas",
} as const;

// ============================================================================
// Tax
// ============================================================================

export const TAX_CONFIG = {
  rate: 0.21, // 21% PVM
  name: "PVM",
  included: true, // Prices include VAT
} as const;

// ============================================================================
// Currency
// ============================================================================

export const CURRENCY_CONFIG = {
  code: "EUR",
  symbol: "€",
  locale: "lt-LT",
  position: "suffix", // 1,990 €
  decimalSeparator: ",",
  thousandsSeparator: " ",
} as const;

// ============================================================================
// Feature Flags
// ============================================================================

export const FEATURES = {
  enableCheckout: true,
  enableLeasing: true,
  enableB2B: true,
  enableNewsletter: true,
  enableProductReviews: false,
  enableWishlist: false,
  enableCompare: false,
  enableLiveChat: false,
  maintenanceMode: false,
} as const;

// ============================================================================
// API Configuration
// ============================================================================

export const API_CONFIG = {
  revalidateProducts: 3600, // 1 hour
  revalidateConfig: 86400, // 24 hours
  maxCartItems: 10,
  maxQuantityPerItem: 5,
} as const;
