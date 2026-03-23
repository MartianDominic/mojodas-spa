/**
 * Scraped Configuration Options Data Transformation Layer
 * Transforms scraped config JSON to match our ConfigOption TypeScript types
 */

import type {
  ConfigOptionGroup,
  ConfigOption,
  AllConfigOptions,
  ConfigOptionGroupId,
} from "@/types";

// Import scraped config data
import scrapedConfigData from "@/data/scraped/config-options.json";

// Types for scraped config structure
interface ScrapedConfigOption {
  id: string;
  name: string;
  type?: string;
  image: string;
  price: number;
}

interface ScrapedConfigGroup {
  title: string;
  options: ScrapedConfigOption[];
}

interface ScrapedConfigData {
  scrapedAt: string;
  sourceUrl: string;
  acrylicColors: ScrapedConfigGroup;
  woodFinishes: ScrapedConfigGroup;
  thermoCover?: ScrapedConfigGroup;
  accessories?: {
    title: string;
    options: Array<ScrapedConfigOption & { category?: string }>;
  };
}

const scrapedConfig = scrapedConfigData as ScrapedConfigData;

// ============================================================================
// Acrylic Colors Transformation
// ============================================================================

// Price modifiers: 0 for standard colors, premium colors add cost
const ACRYLIC_PRICE_MODIFIERS: Record<string, number> = {
  "perlamutrinė-pilka": 0,      // Standard - Pearl Gray
  "perlamutrinė-balta": 0,      // Standard - Pearl White
  "mėlyna": 150,                // Premium - Blue
  "sidabrinė": 150,             // Premium - Silver
  "pilka-šlifuota": 200,        // Premium - Brushed Gray
  "juoda-šlifuota": 250,        // Premium - Brushed Black
};

// Descriptions for acrylic colors in Lithuanian
const ACRYLIC_DESCRIPTIONS: Record<string, string> = {
  "perlamutrinė-pilka": "Elegantiskas perlamutro pilkas atspalvis su svelniu blizgesiu",
  "perlamutrinė-balta": "Klasikinis baltas perlamutras - sviezi ir modernus",
  "mėlyna": "Ryskus melynos spalvos akcentas jusu kubilui",
  "sidabrinė": "Metalinis sidabrinis atspalvis su prabangiu blizgesiu",
  "pilka-šlifuota": "Moderni slifuota pilka tekstura su matine apdaila",
  "juoda-šlifuota": "Prabangus slifuotas juodas pavirsius - premium pasirinkimas",
};

function transformAcrylicColors(): ConfigOptionGroup {
  const options: ConfigOption[] = scrapedConfig.acrylicColors.options.map((opt, index) => ({
    id: opt.id,
    name: opt.name,
    description: ACRYLIC_DESCRIPTIONS[opt.id] || `${opt.name} akrilo spalva`,
    priceModifier: ACRYLIC_PRICE_MODIFIERS[opt.id] ?? 0,
    isDefault: index === 0, // First option is default
    image: opt.image,
    badge: ACRYLIC_PRICE_MODIFIERS[opt.id] && ACRYLIC_PRICE_MODIFIERS[opt.id] > 0 ? "Premium" : undefined,
  }));

  return {
    id: "acrylicColor" as ConfigOptionGroupId,
    name: scrapedConfig.acrylicColors.title,
    description: "Pasirinkite kubilo vidaus akrilo spalva",
    type: "single",
    required: true,
    options,
  };
}

// ============================================================================
// Wood Finishes Transformation
// ============================================================================

// Price modifiers: 0 for standard finishes, premium finishes add cost
const WOOD_PRICE_MODIFIERS: Record<string, number> = {
  "silbergrau": 0,    // Standard - Silver Gray
  "pine": 0,          // Standard - Pine
  "teak": 200,        // Premium - Teak
  "charcoal": 250,    // Premium - Charcoal
  "oak": 300,         // Premium - Oak
};

// Descriptions for wood finishes in Lithuanian
const WOOD_DESCRIPTIONS: Record<string, string> = {
  "silbergrau": "Sidabrine pilka kompozitine apdaila - atspari atmosferos poveikiui",
  "pine": "Naturali pusies medienos apdaila - klasikinis pasirinkimas",
  "teak": "Premium tikmedžio apdaila - ilgaamziska ir estetiška",
  "charcoal": "Tamsiai pilka angliška apdaila - modernus stilius",
  "oak": "Azuolo medienos apdaila - prabanga ir naturalumas",
};

// Badges for wood finishes
const WOOD_BADGES: Record<string, string | undefined> = {
  "silbergrau": "Standartas",
  "pine": undefined,
  "teak": "Premium",
  "charcoal": "Modernus",
  "oak": "Premium",
};

function transformWoodFinishes(): ConfigOptionGroup {
  const options: ConfigOption[] = scrapedConfig.woodFinishes.options.map((opt, index) => ({
    id: opt.id,
    name: opt.name,
    description: WOOD_DESCRIPTIONS[opt.id] || `${opt.name} medienos apdaila`,
    priceModifier: WOOD_PRICE_MODIFIERS[opt.id] ?? 0,
    isDefault: index === 0, // First option (Silbergrau) is default
    image: opt.image,
    badge: WOOD_BADGES[opt.id],
  }));

  return {
    id: "woodFinish" as ConfigOptionGroupId,
    name: scrapedConfig.woodFinishes.title,
    description: "Pasirinkite kubilo isorine medienos apdaila",
    type: "single",
    required: true,
    options,
  };
}

// ============================================================================
// Additional Config Groups (not from scraped data, but standard options)
// ============================================================================

function createHeatingSystemGroup(): ConfigOptionGroup {
  return {
    id: "heatingSystem" as ConfigOptionGroupId,
    name: "Sildymo Sistema",
    description: "Pasirinkite sildymo sistema",
    type: "single",
    required: true,
    options: [
      {
        id: "external-wood-304",
        name: "Isorine malkine krosnele (AISI 304)",
        description: "Klasikinis pasirinkimas, uztikrinancius greita vandens pasildyma.",
        priceModifier: 0,
        isDefault: false,
      },
      {
        id: "external-wood-316",
        name: "Isorine malkine krosnele (AISI 316)",
        description: "Kritinis pasirinkimas ilgaamziskumui su chloro atsparumu.",
        priceModifier: 320,
        isDefault: true,
        badge: "Atspariausia chlorui",
      },
      {
        id: "electric-3kw",
        name: "Elektrinis sildytuvas (3kW)",
        description: "Automatizuota temperaturos kontrole jusu patogumui.",
        priceModifier: 650,
        isDefault: false,
      },
      {
        id: "electric-6kw",
        name: "Elektrinis sildytuvas (6kW)",
        description: "Galingesnis elektrinis sildymas greitesniam pasildymui.",
        priceModifier: 890,
        isDefault: false,
        badge: "Galingas",
      },
    ],
  };
}

function createMassageGroup(): ConfigOptionGroup {
  return {
    id: "massage" as ConfigOptionGroupId,
    name: "Masazas ir Apsvietimas",
    description: "Pasirinkite masazo ir apsvietimo opcijas",
    type: "multiple",
    required: false,
    options: [
      {
        id: "water-jets",
        name: "Vandens purkstukai (8 vnt.)",
        description: "Intensyvus raumenu atpalaidavimas hidromasazu",
        priceModifier: 450,
        isDefault: true,
      },
      {
        id: "air-jets",
        name: "Oro purkstukai (12 vnt.)",
        description: "Svelnus Pearl masazo efektas oro burbulais",
        priceModifier: 390,
        isDefault: false,
      },
      {
        id: "led-stars",
        name: "LED Zvaigzdes (6 vnt.)",
        description: "Magiska atmosfera sutemose su zvaigzdziu efektu",
        priceModifier: 180,
        isDefault: true,
      },
      {
        id: "multi-led",
        name: "Multi LED Lempu sistema",
        description: "Dinaminiu spalvu terapija su RGB valdymu",
        priceModifier: 250,
        isDefault: false,
      },
    ],
  };
}

function createAccessoriesGroup(): ConfigOptionGroup {
  return {
    id: "accessories" as ConfigOptionGroupId,
    name: "Technologijos ir Priedai",
    description: "Pasirinkite papildomus priedus",
    type: "multiple",
    required: false,
    options: [
      {
        id: "touch-control",
        name: "Jutimine Kontrole 4 IN 1",
        description: "Pilna valdymo sistema viename - temperaturos, apsvietimo, masazo ir filtracijos valdymas",
        priceModifier: 580,
        isDefault: false,
        badge: "Smart",
      },
      {
        id: "audio-bluetooth",
        name: "Audio (Bluetooth) sistema",
        description: "Aukstos kokybes garso sistema su vandeniui atsparia konstrukcija",
        priceModifier: 420,
        isDefault: false,
      },
      {
        id: "premium-cover",
        name: "Premium Termo Dangtis",
        description: "Auksciausios kokybes izoliuotas dangtis su UV apsauga",
        priceModifier: 350,
        isDefault: true,
        badge: "Rekomenduojama",
      },
      {
        id: "hidden-filtration",
        name: "Filtravimo Deze (Paslepta)",
        description: "Paslepta filtravimo sistema elegantiskam dizainui",
        priceModifier: 190,
        isDefault: false,
      },
      {
        id: "wooden-steps",
        name: "Mediniai Laipteliai",
        description: "Patogus ijungimas i kubila su apsaugine danga",
        priceModifier: 150,
        isDefault: false,
      },
    ],
  };
}

// ============================================================================
// Build All Config Options
// ============================================================================

const transformedAcrylicColors = transformAcrylicColors();
const transformedWoodFinishes = transformWoodFinishes();
const heatingSystemGroup = createHeatingSystemGroup();
const massageGroup = createMassageGroup();
const accessoriesGroup = createAccessoriesGroup();

// All config options combined
export const SCRAPED_CONFIG_OPTIONS: AllConfigOptions = {
  acrylicColor: transformedAcrylicColors,
  woodFinish: transformedWoodFinishes,
  heatingSystem: heatingSystemGroup,
  massage: massageGroup,
  accessories: accessoriesGroup,
};

// ============================================================================
// Exports
// ============================================================================

/**
 * Get all scraped/transformed config options
 */
export function getScrapedConfigOptions(): AllConfigOptions {
  return SCRAPED_CONFIG_OPTIONS;
}

/**
 * Get acrylic color options
 */
export function getAcrylicColorOptions(): ConfigOptionGroup {
  return transformedAcrylicColors;
}

/**
 * Get wood finish options
 */
export function getWoodFinishOptions(): ConfigOptionGroup {
  return transformedWoodFinishes;
}

/**
 * Get heating system options
 */
export function getHeatingSystemOptions(): ConfigOptionGroup {
  return heatingSystemGroup;
}

/**
 * Get massage options
 */
export function getMassageOptions(): ConfigOptionGroup {
  return massageGroup;
}

/**
 * Get accessories options
 */
export function getAccessoriesOptions(): ConfigOptionGroup {
  return accessoriesGroup;
}

/**
 * Get config option group by ID
 */
export function getScrapedConfigGroup(groupId: ConfigOptionGroupId): ConfigOptionGroup | undefined {
  return SCRAPED_CONFIG_OPTIONS[groupId];
}

/**
 * Get scraped config metadata
 */
export function getScrapedConfigInfo() {
  return {
    scrapedAt: scrapedConfig.scrapedAt,
    acrylicColorCount: transformedAcrylicColors.options.length,
    woodFinishCount: transformedWoodFinishes.options.length,
    totalGroups: Object.keys(SCRAPED_CONFIG_OPTIONS).length,
    lastTransformed: new Date().toISOString(),
  };
}
