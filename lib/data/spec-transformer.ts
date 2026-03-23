/**
 * Product Specification Transformer
 * Transforms raw scraped spec strings into normalized, filterable data
 */

export interface NormalizedSpecs {
  // People capacity
  capacity: {
    min: number;
    max: number;
  };

  // Weight in kg
  weight: number | null;

  // Dimensions in mm
  dimensions: {
    external: number | null;      // outer diameter/width
    externalDepth?: number | null; // for square tubs
    internal: number | null;
    height: number | null;
  };

  // Water capacity in liters
  waterCapacity: number | null;

  // Heater
  heater: {
    type: 'internal' | 'external' | 'horizon' | 'none';
    power: number | null;         // kW
    material: string | null;      // e.g., "AISI 304", "AISI 316"
  };

  // Electric heater availability
  electricHeater: boolean;

  // Filtration system
  filtration: {
    available: boolean;
    type: string | null;          // e.g., "Skimeris", "UVC", "Smėlio filtras"
  };

  // Jets
  jets: {
    water: {
      min: number;
      max: number;
    } | null;
    air: {
      min: number;
      max: number;
    } | null;
  };

  // LED lighting
  lighting: {
    stars: {
      min: number;
      max: number;
    } | null;
    lamps: {
      min: number;
      max: number;
    } | null;
  };

  // Cold therapy (for Arctic products)
  coldTherapy: {
    available: boolean;
    heatPump: boolean;
  };
}

interface RawSpec {
  label: string;
  value: string;
  iconUrl?: string;
  localIcon?: string;
}

/**
 * Transform raw scraped specs into normalized structure
 */
export function transformSpecs(rawSpecs: RawSpec[]): NormalizedSpecs {
  const specs: NormalizedSpecs = {
    capacity: { min: 1, max: 1 },
    weight: null,
    dimensions: {
      external: null,
      internal: null,
      height: null,
    },
    waterCapacity: null,
    heater: {
      type: 'none',
      power: null,
      material: null,
    },
    electricHeater: false,
    filtration: {
      available: false,
      type: null,
    },
    jets: {
      water: null,
      air: null,
    },
    lighting: {
      stars: null,
      lamps: null,
    },
    coldTherapy: {
      available: false,
      heatPump: false,
    },
  };

  for (const spec of rawSpecs) {
    const label = spec.label.toLowerCase();
    const value = spec.value;

    if (label.includes('žmon')) {
      specs.capacity = parseCapacity(value);
    } else if (label.includes('svor')) {
      specs.weight = parseWeight(value);
    } else if (label.includes('išmat')) {
      specs.dimensions = parseDimensions(value);
    } else if (label.includes('krosn')) {
      specs.heater = parseHeater(value);
    } else if (label.includes('filtr')) {
      specs.filtration = parseFiltration(value);
    } else if (label.includes('elektr') && label.includes('šild')) {
      specs.electricHeater = true;
    } else if (label.includes('led')) {
      specs.lighting = parseLighting(value);
    } else if (label.includes('oro') && label.includes('purkšt')) {
      specs.jets.air = parseJetRange(value);
    } else if (label.includes('vandens') && label.includes('purkšt')) {
      specs.jets.water = parseJetRange(value);
    } else if (label.includes('vandens') && label.includes('talp')) {
      specs.waterCapacity = parseWaterCapacity(value);
    } else if (label.includes('šilumos') && label.includes('siurbl')) {
      specs.coldTherapy.heatPump = true;
      specs.coldTherapy.available = true;
    }
  }

  return specs;
}

/**
 * Parse capacity string like "4-6" or "6"
 */
function parseCapacity(value: string): { min: number; max: number } {
  const match = value.match(/(\d+)\s*[-–]\s*(\d+)/);
  if (match) {
    return { min: parseInt(match[1]), max: parseInt(match[2]) };
  }
  const single = value.match(/(\d+)/);
  if (single) {
    const num = parseInt(single[1]);
    return { min: num, max: num };
  }
  return { min: 1, max: 1 };
}

/**
 * Parse weight string like "~400 kg" or "200kg"
 */
function parseWeight(value: string): number | null {
  const match = value.match(/~?\s*(\d+)\s*kg/i);
  return match ? parseInt(match[1]) : null;
}

/**
 * Parse dimensions string like "Išorė 2200 x 2200mm Aukštis 1050mm" or "2m x 1,05m"
 */
function parseDimensions(value: string): NormalizedSpecs['dimensions'] {
  const dims: NormalizedSpecs['dimensions'] = {
    external: null,
    internal: null,
    height: null,
  };

  // Try to parse "Išorė 2200 x 2200mm" format
  const externalMatch = value.match(/[Ii]šor[eė]\s*(\d+)\s*(?:x\s*(\d+))?\s*mm/);
  if (externalMatch) {
    dims.external = parseInt(externalMatch[1]);
    if (externalMatch[2]) {
      dims.externalDepth = parseInt(externalMatch[2]);
    }
  }

  // Try to parse "Vidus 1920mm" format
  const internalMatch = value.match(/[Vv]id[au]s\s*(\d+)\s*mm/);
  if (internalMatch) {
    dims.internal = parseInt(internalMatch[1]);
  }

  // Try to parse "Aukštis 1050mm" format
  const heightMatch = value.match(/[Aa]ukšti?s\s*(\d+)\s*mm/);
  if (heightMatch) {
    dims.height = parseInt(heightMatch[1]);
  }

  // Fallback: try to parse "2m x 1,05m" format
  if (!dims.external) {
    const simpleMatch = value.match(/(\d+(?:[.,]\d+)?)\s*m\s*x\s*(\d+(?:[.,]\d+)?)\s*m/);
    if (simpleMatch) {
      dims.external = Math.round(parseFloat(simpleMatch[1].replace(',', '.')) * 1000);
      dims.height = Math.round(parseFloat(simpleMatch[2].replace(',', '.')) * 1000);
    }
  }

  // Another fallback: "out 2m H 1,05m"
  if (!dims.external) {
    const outMatch = value.match(/out\s*(\d+(?:[.,]\d+)?)\s*m/i);
    if (outMatch) {
      dims.external = Math.round(parseFloat(outMatch[1].replace(',', '.')) * 1000);
    }
    const hMatch = value.match(/H\s*(\d+(?:[.,]\d+)?)\s*m/i);
    if (hMatch) {
      dims.height = Math.round(parseFloat(hMatch[1].replace(',', '.')) * 1000);
    }
  }

  return dims;
}

/**
 * Parse heater string like "Integruota „Horizon", 25 kW, AISI 304/316 plieno"
 */
function parseHeater(value: string): NormalizedSpecs['heater'] {
  const heater: NormalizedSpecs['heater'] = {
    type: 'none',
    power: null,
    material: null,
  };

  const lowerValue = value.toLowerCase();

  if (lowerValue.includes('horizon')) {
    heater.type = 'horizon';
  } else if (lowerValue.includes('integruot') || lowerValue.includes('vidin')) {
    heater.type = 'internal';
  } else if (lowerValue.includes('išorin')) {
    heater.type = 'external';
  }

  const powerMatch = value.match(/(\d+)\s*kW/i);
  if (powerMatch) {
    heater.power = parseInt(powerMatch[1]);
  }

  const materialMatch = value.match(/AISI\s*(\d+(?:\/\d+)?)/i);
  if (materialMatch) {
    heater.material = `AISI ${materialMatch[1]}`;
  }

  return heater;
}

/**
 * Parse filtration string like "Skimeris / UVC"
 */
function parseFiltration(value: string): NormalizedSpecs['filtration'] {
  return {
    available: true,
    type: value.trim(),
  };
}

/**
 * Parse LED lighting string like "6-24 Žvaigždžių 1-2 Lempų"
 */
function parseLighting(value: string): NormalizedSpecs['lighting'] {
  const lighting: NormalizedSpecs['lighting'] = {
    stars: null,
    lamps: null,
  };

  const starsMatch = value.match(/(\d+)\s*[-–]\s*(\d+)\s*[Žž]vaigžd/i);
  if (starsMatch) {
    lighting.stars = { min: parseInt(starsMatch[1]), max: parseInt(starsMatch[2]) };
  }

  const lampsMatch = value.match(/(\d+)\s*[-–]\s*(\d+)\s*[Ll]emp/i);
  if (lampsMatch) {
    lighting.lamps = { min: parseInt(lampsMatch[1]), max: parseInt(lampsMatch[2]) };
  }

  return lighting;
}

/**
 * Parse jet range string like "12-24 Vienetų"
 */
function parseJetRange(value: string): { min: number; max: number } | null {
  const match = value.match(/(\d+)\s*[-–]\s*(\d+)/);
  if (match) {
    return { min: parseInt(match[1]), max: parseInt(match[2]) };
  }
  const single = value.match(/(\d+)/);
  if (single) {
    const num = parseInt(single[1]);
    return { min: num, max: num };
  }
  return null;
}

/**
 * Parse water capacity string like "~1100 L"
 */
function parseWaterCapacity(value: string): number | null {
  const match = value.match(/~?\s*(\d+)\s*L/i);
  return match ? parseInt(match[1]) : null;
}

/**
 * Get filterable attributes from normalized specs
 */
export interface FilterableAttributes {
  capacityMin: number;
  capacityMax: number;
  hasWaterJets: boolean;
  hasAirJets: boolean;
  hasLED: boolean;
  hasFiltration: boolean;
  hasElectricHeater: boolean;
  heaterType: 'internal' | 'external' | 'horizon' | 'none';
  isColdTherapy: boolean;
  weightRange: 'light' | 'medium' | 'heavy' | null; // <200, 200-350, >350
  sizeRange: 'small' | 'medium' | 'large' | null;   // <1800, 1800-2200, >2200
}

export function getFilterableAttributes(specs: NormalizedSpecs): FilterableAttributes {
  return {
    capacityMin: specs.capacity.min,
    capacityMax: specs.capacity.max,
    hasWaterJets: specs.jets.water !== null && specs.jets.water.max > 0,
    hasAirJets: specs.jets.air !== null && specs.jets.air.max > 0,
    hasLED: specs.lighting.stars !== null || specs.lighting.lamps !== null,
    hasFiltration: specs.filtration.available,
    hasElectricHeater: specs.electricHeater,
    heaterType: specs.heater.type,
    isColdTherapy: specs.coldTherapy.available,
    weightRange: specs.weight
      ? (specs.weight < 200 ? 'light' : specs.weight <= 350 ? 'medium' : 'heavy')
      : null,
    sizeRange: specs.dimensions.external
      ? (specs.dimensions.external < 1800 ? 'small' : specs.dimensions.external <= 2200 ? 'medium' : 'large')
      : null,
  };
}
