/**
 * Configuration Types for MojoDas Spa Product Configurator
 * Matches PRD Section 4.2
 */

export type ConfigOptionType = "single" | "multiple";

export type ConfigOptionGroupId =
  | "acrylicColor"
  | "woodFinish"
  | "heatingSystem"
  | "massage"
  | "accessories";

export interface ConfigOption {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly priceModifier: number;
  readonly isDefault: boolean;
  readonly badge?: string;
  readonly colorHex?: string;
  readonly colorSwatch?: string;
  readonly image?: string;
}

export interface ConfigOptionGroup {
  readonly id: ConfigOptionGroupId;
  readonly name: string;
  readonly description?: string;
  readonly type: ConfigOptionType;
  readonly required: boolean;
  readonly options: readonly ConfigOption[];
}

export interface ConfigurationState {
  readonly productId: string | null;
  readonly basePrice: number;
  readonly selections: Readonly<Record<string, string | readonly string[]>>;
  readonly priceModifiers: Readonly<Record<string, number>>;
  readonly totalPrice: number;
}

export interface SelectedConfiguration {
  readonly [optionGroupId: string]: string | readonly string[];
}

// All available configuration categories
export interface AllConfigOptions {
  readonly acrylicColor: ConfigOptionGroup;
  readonly woodFinish: ConfigOptionGroup;
  readonly heatingSystem: ConfigOptionGroup;
  readonly massage: ConfigOptionGroup;
  readonly accessories: ConfigOptionGroup;
}

// Configuration data file structure
export interface ConfigOptionsData {
  readonly configOptions: AllConfigOptions;
  readonly lastUpdated: string;
  readonly version: string;
}

// Price calculation result
export interface PriceCalculation {
  readonly basePrice: number;
  readonly optionsTotal: number;
  readonly totalPrice: number;
  readonly monthlyPayment: number;
  readonly breakdown: readonly PriceBreakdownItem[];
}

export interface PriceBreakdownItem {
  readonly groupId: string;
  readonly groupName: string;
  readonly optionId: string;
  readonly optionName: string;
  readonly price: number;
}

// Configuration summary for cart/checkout
export interface ConfigurationSummary {
  readonly items: readonly ConfigurationSummaryItem[];
  readonly totalModifier: number;
}

export interface ConfigurationSummaryItem {
  readonly groupName: string;
  readonly optionName: string;
  readonly priceModifier: number;
}
