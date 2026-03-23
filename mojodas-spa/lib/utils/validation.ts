import { z } from "zod";
import type { Product, ConfigOptionGroup, SelectedConfiguration } from "@/types";

// ============================================================================
// Lithuanian Validation Patterns
// ============================================================================

/**
 * Lithuanian phone number pattern
 * Supports: +370 XXX XXXXX, 8 XXX XXXXX, +370XXXXXXXX, 8XXXXXXXX
 */
const LITHUANIAN_PHONE_REGEX = /^(\+370|8)[0-9]{8}$/;

/**
 * Lithuanian postal code pattern (LT-XXXXX)
 */
const LITHUANIAN_POSTAL_CODE_REGEX = /^(LT-)?[0-9]{5}$/i;

/**
 * Email validation pattern (RFC 5322 simplified)
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validate email address format
 *
 * @param email - Email address to validate
 * @returns Validation result with error message if invalid
 */
export function validateEmail(email: string): {
  valid: boolean;
  error?: string;
  normalized?: string;
} {
  const trimmed = email.trim().toLowerCase();

  if (!trimmed) {
    return { valid: false, error: "El. paštas yra privalomas" };
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return { valid: false, error: "Neteisingas el. pašto formatas" };
  }

  // Additional checks for common typos
  if (trimmed.includes("..") || trimmed.startsWith(".") || trimmed.endsWith(".")) {
    return { valid: false, error: "Neteisingas el. pašto formatas" };
  }

  return { valid: true, normalized: trimmed };
}

/**
 * Validate Lithuanian phone number
 * Normalizes to +370 format
 *
 * @param phone - Phone number to validate
 * @returns Validation result with normalized number if valid
 */
export function validatePhone(phone: string): {
  valid: boolean;
  error?: string;
  normalized?: string;
} {
  // Remove spaces, dashes, and parentheses
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");

  if (!cleaned) {
    return { valid: false, error: "Telefono numeris yra privalomas" };
  }

  // Normalize to +370 format
  let normalized = cleaned;
  if (normalized.startsWith("8")) {
    normalized = "+370" + normalized.slice(1);
  }

  // Remove the leading + for regex test
  const testNumber = normalized.startsWith("+")
    ? normalized.slice(1)
    : normalized;

  if (!LITHUANIAN_PHONE_REGEX.test("+" + testNumber) &&
      !LITHUANIAN_PHONE_REGEX.test("8" + testNumber.slice(3))) {
    return {
      valid: false,
      error: "Neteisingas telefono formatas. Naudokite: +370 XXX XXXXX arba 8 XXX XXXXX"
    };
  }

  return { valid: true, normalized };
}

/**
 * Validate Lithuanian postal code
 * Normalizes to LT-XXXXX format
 *
 * @param code - Postal code to validate
 * @returns Validation result with normalized code if valid
 */
export function validatePostalCode(code: string): {
  valid: boolean;
  error?: string;
  normalized?: string;
} {
  const trimmed = code.trim().toUpperCase();

  if (!trimmed) {
    return { valid: false, error: "Pašto kodas yra privalomas" };
  }

  if (!LITHUANIAN_POSTAL_CODE_REGEX.test(trimmed)) {
    return { valid: false, error: "Neteisingas pašto kodo formatas (LT-XXXXX)" };
  }

  // Normalize to LT-XXXXX format
  const digits = trimmed.replace(/[^0-9]/g, "");
  const normalized = `LT-${digits}`;

  return { valid: true, normalized };
}

/**
 * Validate product configuration - ensures all required options are selected
 *
 * @param product - Product being configured
 * @param selectedOptions - Current configuration selections
 * @param configOptions - All available configuration option groups
 * @returns Validation result with missing required options if invalid
 */
export function validateConfiguration(
  product: Product,
  selectedOptions: SelectedConfiguration,
  configOptions: ConfigOptionGroup[]
): {
  isValid: boolean;
  errors: Array<{ groupId: string; groupName: string; message: string }>;
  missingRequired: string[];
} {
  const errors: Array<{ groupId: string; groupName: string; message: string }> = [];
  const missingRequired: string[] = [];

  // Check only option groups that apply to this product
  const applicableGroups = configOptions.filter((group) =>
    product.configurableOptions.includes(group.id)
  );

  for (const group of applicableGroups) {
    if (!group.required) continue;

    const selection = selectedOptions[group.id];
    const hasSelection = Array.isArray(selection)
      ? selection.length > 0
      : Boolean(selection);

    if (!hasSelection) {
      errors.push({
        groupId: group.id,
        groupName: group.name,
        message: `${group.name} pasirinkimas yra privalomas`,
      });
      missingRequired.push(group.id);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    missingRequired,
  };
}

// ============================================================================
// Zod Schemas
// ============================================================================

/**
 * Customer information schema
 */
export const customerSchema = z.object({
  firstName: z
    .string()
    .min(2, "Vardas turi būti bent 2 simboliai")
    .max(50, "Vardas per ilgas"),
  lastName: z
    .string()
    .min(2, "Pavardė turi būti bent 2 simboliai")
    .max(50, "Pavardė per ilga"),
  email: z
    .string()
    .email("Neteisingas el. pašto formatas")
    .transform((val) => val.toLowerCase().trim()),
  phone: z
    .string()
    .refine(
      (val) => {
        const cleaned = val.replace(/[\s\-\(\)]/g, "");
        let normalized = cleaned;
        if (normalized.startsWith("8")) {
          normalized = "+370" + normalized.slice(1);
        }
        return LITHUANIAN_PHONE_REGEX.test(normalized) ||
               LITHUANIAN_PHONE_REGEX.test("8" + normalized.slice(4));
      },
      { message: "Neteisingas telefono formatas" }
    )
    .transform((val) => {
      const cleaned = val.replace(/[\s\-\(\)]/g, "");
      if (cleaned.startsWith("8")) {
        return "+370" + cleaned.slice(1);
      }
      return cleaned;
    }),
});

/**
 * Delivery address schema
 */
export const deliverySchema = z.object({
  address: z
    .string()
    .min(5, "Adresas per trumpas")
    .max(200, "Adresas per ilgas"),
  city: z
    .string()
    .min(2, "Miestas yra privalomas")
    .max(100, "Miesto pavadinimas per ilgas"),
  postalCode: z
    .string()
    .refine(
      (val) => LITHUANIAN_POSTAL_CODE_REGEX.test(val.trim()),
      { message: "Neteisingas pašto kodo formatas (LT-XXXXX)" }
    )
    .transform((val) => {
      const digits = val.replace(/[^0-9]/g, "");
      return `LT-${digits}`;
    }),
  notes: z.string().max(500, "Pastabos per ilgos").optional(),
});

/**
 * Payment method schema
 */
export const paymentSchema = z.object({
  method: z.enum(["banklink", "card", "leasing"], {
    message: "Pasirinkite mokėjimo būdą",
  }),
  leasingTerm: z.enum(["12", "24", "36", "48"]).optional(),
});

/**
 * Complete checkout form schema
 */
export const checkoutSchema = z.object({
  customer: customerSchema,
  delivery: deliverySchema,
  payment: paymentSchema,
  acceptTerms: z.boolean().refine((val) => val === true, { message: "Turite sutikti su sąlygomis" }),
  acceptPrivacy: z.boolean().refine((val) => val === true, { message: "Turite sutikti su privatumo politika" }),
});

/**
 * B2B lead form schema
 */
export const leadFormSchema = z.object({
  companyName: z
    .string()
    .min(2, "Įmonės pavadinimas yra privalomas")
    .max(100, "Įmonės pavadinimas per ilgas"),
  contactPerson: z
    .string()
    .min(2, "Kontaktinis asmuo yra privalomas")
    .max(100, "Vardas per ilgas"),
  email: z
    .string()
    .email("Neteisingas el. pašto formatas")
    .transform((val) => val.toLowerCase().trim()),
  phone: z.string().refine(
    (val) => {
      if (!val) return true; // Optional
      const cleaned = val.replace(/[\s\-\(\)]/g, "");
      return LITHUANIAN_PHONE_REGEX.test(cleaned) ||
             LITHUANIAN_PHONE_REGEX.test("+370" + cleaned.slice(1));
    },
    { message: "Neteisingas telefono formatas" }
  ).optional(),
  businessType: z.enum(["hotel", "glamping", "spa", "wellness", "other"], {
    message: "Pasirinkite verslo tipą",
  }),
  quantity: z
    .number()
    .int()
    .min(1, "Kiekis turi būti bent 1")
    .max(100, "Maksimalus kiekis yra 100"),
  message: z.string().max(1000, "Žinutė per ilga").optional(),
  preferredContact: z.enum(["email", "phone", "calendly"]).default("email"),
});

/**
 * Contact form schema
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Vardas yra privalomas")
    .max(100, "Vardas per ilgas"),
  email: z
    .string()
    .email("Neteisingas el. pašto formatas")
    .transform((val) => val.toLowerCase().trim()),
  phone: z.string().optional(),
  subject: z.enum(["general", "order", "support", "partnership", "other"]).default("general"),
  message: z
    .string()
    .min(10, "Žinutė per trumpa")
    .max(2000, "Žinutė per ilga"),
});

/**
 * Newsletter subscription schema
 */
export const newsletterSchema = z.object({
  email: z
    .string()
    .email("Neteisingas el. pašto formatas")
    .transform((val) => val.toLowerCase().trim()),
});

// ============================================================================
// Type Exports
// ============================================================================

export type CustomerFormData = z.infer<typeof customerSchema>;
export type DeliveryFormData = z.infer<typeof deliverySchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
export type LeadFormData = z.infer<typeof leadFormSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterFormData = z.infer<typeof newsletterSchema>;
