/**
 * Configuration Options Data Helper
 * Provides typed access to product configuration options
 *
 * Uses scraped config data transformed to match our ConfigOption types.
 */

import type {
  ConfigOptionGroup,
  ConfigOption,
  AllConfigOptions,
  ConfigOptionGroupId,
  PriceCalculation,
  PriceBreakdownItem,
  ConfigurationSummary,
  ConfigurationSummaryItem,
  SelectedConfiguration,
} from "@/types";

// Import from scraped config transformation layer
import {
  SCRAPED_CONFIG_OPTIONS,
  getScrapedConfigInfo,
} from "./scraped-config";

// Use scraped config as the source of truth
const configOptions: AllConfigOptions = SCRAPED_CONFIG_OPTIONS;

// Get version info from scraped data
const scrapedInfo = getScrapedConfigInfo();
const dataVersion = "2.0.0"; // Updated to reflect scraped data integration
const dataLastUpdated = scrapedInfo.scrapedAt;

// Export individual config groups for direct access
export const acrylicColors = configOptions.acrylicColor;
export const woodFinishes = configOptions.woodFinish;
export const heatingSystem = configOptions.heatingSystem;
export const massage = configOptions.massage;
export const accessories = configOptions.accessories;

// All config options grouped (using group IDs as keys)
export const allConfigOptions: Record<string, ConfigOptionGroup> = {
  acrylicColor: configOptions.acrylicColor,
  woodFinish: configOptions.woodFinish,
  heatingSystem: configOptions.heatingSystem,
  massage: configOptions.massage,
  accessories: configOptions.accessories,
};

// Step definitions for the configurator UI
export const configSteps = [
  { id: 1, groupId: "acrylicColor" as ConfigOptionGroupId, title: "Akrilo Spalva" },
  { id: 2, groupId: "woodFinish" as ConfigOptionGroupId, title: "Kubilo Apdaila" },
  { id: 3, groupId: "heatingSystem" as ConfigOptionGroupId, title: "Šildymo Sistema" },
  { id: 4, groupId: "massage" as ConfigOptionGroupId, title: "Masažas ir Apšvietimas" },
  { id: 5, groupId: "accessories" as ConfigOptionGroupId, title: "Technologijos ir Priedai" },
];

/**
 * Get all config option groups
 */
export function getAllConfigOptions(): AllConfigOptions {
  return configOptions;
}

/**
 * Get all config option groups as array
 */
export function getAllConfigOptionsArray(): ConfigOptionGroup[] {
  return Object.values(allConfigOptions);
}

/**
 * Get config option group by ID
 */
export function getConfigOptionGroup(groupId: string): ConfigOptionGroup | undefined {
  return allConfigOptions[groupId];
}

/**
 * Get a specific option from a group
 */
export function getConfigOption(groupId: string, optionId: string): ConfigOption | undefined {
  const group = getConfigOptionGroup(groupId);
  if (!group) return undefined;
  return group.options.find((opt) => opt.id === optionId);
}

/**
 * Get default option for a group
 */
export function getDefaultOption(groupId: string): ConfigOption | undefined {
  const group = getConfigOptionGroup(groupId);
  if (!group) return undefined;
  return group.options.find((opt) => opt.isDefault);
}

/**
 * Get default selections for all groups
 */
export function getDefaultSelections(): {
  selections: Record<string, string | string[]>;
  priceModifiers: Record<string, number>;
  selectionNames: Record<string, string | string[]>;
} {
  const selections: Record<string, string | string[]> = {};
  const priceModifiers: Record<string, number> = {};
  const selectionNames: Record<string, string | string[]> = {};

  Object.values(allConfigOptions).forEach((group) => {
    if (group.type === "single") {
      const defaultOption = group.options.find((opt) => opt.isDefault);
      if (defaultOption) {
        selections[group.id] = defaultOption.id;
        priceModifiers[group.id] = defaultOption.priceModifier;
        selectionNames[group.id] = defaultOption.name;
      } else if (group.required && group.options.length > 0) {
        // If required but no default, use first option
        selections[group.id] = group.options[0].id;
        priceModifiers[group.id] = group.options[0].priceModifier;
        selectionNames[group.id] = group.options[0].name;
      }
    } else {
      // Multiple selection - get all defaults
      const defaultOptions = group.options.filter((opt) => opt.isDefault);
      if (defaultOptions.length > 0) {
        selections[group.id] = defaultOptions.map((opt) => opt.id);
        priceModifiers[group.id] = defaultOptions.reduce(
          (sum, opt) => sum + opt.priceModifier,
          0
        );
        selectionNames[group.id] = defaultOptions.map((opt) => opt.name);
      } else {
        selections[group.id] = [];
        priceModifiers[group.id] = 0;
        selectionNames[group.id] = [];
      }
    }
  });

  return { selections, priceModifiers, selectionNames };
}

/**
 * Calculate total price modifier for a configuration
 */
export function calculatePriceModifier(
  selections: Record<string, string | string[]>
): number {
  let total = 0;

  Object.entries(selections).forEach(([groupId, selection]) => {
    const group = getConfigOptionGroup(groupId);
    if (!group) return;

    if (Array.isArray(selection)) {
      // Multiple selection
      selection.forEach((optionId) => {
        const option = group.options.find((opt) => opt.id === optionId);
        if (option) {
          total += option.priceModifier;
        }
      });
    } else {
      // Single selection
      const option = group.options.find((opt) => opt.id === selection);
      if (option) {
        total += option.priceModifier;
      }
    }
  });

  return total;
}

/**
 * Calculate full price breakdown
 */
export function calculatePrice(
  basePrice: number,
  selections: SelectedConfiguration,
  months: number = 36
): PriceCalculation {
  const breakdown: PriceBreakdownItem[] = [];
  let optionsTotal = 0;

  Object.entries(selections).forEach(([groupId, selection]) => {
    const group = getConfigOptionGroup(groupId);
    if (!group) return;

    if (Array.isArray(selection)) {
      // Multiple selection
      selection.forEach((optionId) => {
        const option = group.options.find((opt) => opt.id === optionId);
        if (option && option.priceModifier > 0) {
          breakdown.push({
            groupId: group.id,
            groupName: group.name,
            optionId: option.id,
            optionName: option.name,
            price: option.priceModifier,
          });
          optionsTotal += option.priceModifier;
        }
      });
    } else if (selection) {
      // Single selection
      const option = group.options.find((opt) => opt.id === selection);
      if (option && option.priceModifier > 0) {
        breakdown.push({
          groupId: group.id,
          groupName: group.name,
          optionId: option.id,
          optionName: option.name,
          price: option.priceModifier,
        });
        optionsTotal += option.priceModifier;
      }
    }
  });

  const totalPrice = basePrice + optionsTotal;
  const monthlyPayment = Math.ceil(totalPrice / months);

  return {
    basePrice,
    optionsTotal,
    totalPrice,
    monthlyPayment,
    breakdown,
  };
}

/**
 * Get configuration summary for display
 */
export function getConfigurationSummary(
  selections: SelectedConfiguration
): ConfigurationSummary {
  const items: ConfigurationSummaryItem[] = [];
  let totalModifier = 0;

  Object.entries(selections).forEach(([groupId, selection]) => {
    const group = getConfigOptionGroup(groupId);
    if (!group) return;

    if (Array.isArray(selection)) {
      selection.forEach((optionId) => {
        const option = group.options.find((opt) => opt.id === optionId);
        if (option) {
          items.push({
            groupName: group.name,
            optionName: option.name,
            priceModifier: option.priceModifier,
          });
          totalModifier += option.priceModifier;
        }
      });
    } else if (selection) {
      const option = group.options.find((opt) => opt.id === selection);
      if (option) {
        items.push({
          groupName: group.name,
          optionName: option.name,
          priceModifier: option.priceModifier,
        });
        totalModifier += option.priceModifier;
      }
    }
  });

  return { items, totalModifier };
}

/**
 * Get configuration summary as readable string
 */
export function getConfigurationSummaryText(
  selections: SelectedConfiguration
): string {
  const summary = getConfigurationSummary(selections);
  return summary.items
    .map((item) => `${item.groupName}: ${item.optionName}`)
    .join(" | ");
}

/**
 * Validate a configuration against available options
 */
export function validateConfiguration(
  selections: SelectedConfiguration,
  productConfigOptions: string[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check required options
  productConfigOptions.forEach((groupId) => {
    const group = getConfigOptionGroup(groupId);
    if (!group) {
      errors.push(`Unknown configuration group: ${groupId}`);
      return;
    }

    if (group.required) {
      const selection = selections[groupId];
      if (!selection || (Array.isArray(selection) && selection.length === 0)) {
        errors.push(`Required option missing: ${group.name}`);
      }
    }

    // Validate selected options exist
    const selection = selections[groupId];
    if (selection) {
      const selectedIds = Array.isArray(selection) ? selection : [selection];
      selectedIds.forEach((optionId) => {
        const option = group.options.find((opt) => opt.id === optionId);
        if (!option) {
          errors.push(`Invalid option "${optionId}" for ${group.name}`);
        }
      });
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Get config data version info
 */
export function getConfigDataInfo(): {
  lastUpdated: string;
  version: string;
  groupCount: number;
} {
  return {
    lastUpdated: dataLastUpdated,
    version: dataVersion,
    groupCount: Object.keys(allConfigOptions).length,
  };
}

/**
 * Get options for a specific product based on its configurableOptions
 */
export function getProductConfigOptions(
  configurableOptions: string[]
): ConfigOptionGroup[] {
  return configurableOptions
    .map((groupId) => getConfigOptionGroup(groupId))
    .filter((group): group is ConfigOptionGroup => group !== undefined);
}
