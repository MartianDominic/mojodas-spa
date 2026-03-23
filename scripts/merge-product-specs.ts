/**
 * Merge Scraped Product Specs
 *
 * This script reads scraped product data, transforms the specs,
 * and updates the main products.json with normalized filterable specs.
 *
 * Run with: npx tsx scripts/merge-product-specs.ts
 */

import * as fs from 'fs';
import * as path from 'path';

interface RawSpec {
  label: string;
  value: string;
  iconUrl?: string;
  localIcon?: string;
}

interface ScrapedProduct {
  id: string;
  name: string;
  specs: RawSpec[];
}

interface ScrapedData {
  products: ScrapedProduct[];
}

interface FilterableSpecs {
  hasWaterJets: boolean;
  hasAirJets: boolean;
  hasLED: boolean;
  hasFiltration: boolean;
  hasElectricHeater: boolean;
  isColdTherapy: boolean;
  weightKg: number | null;
  externalSizeMm: number | null;
}

interface FullSpecs {
  capacity: { min: number; max: number };
  weight: string;
  dimensions: {
    external: number;
    internal: number;
    height: number;
    unit: 'mm';
  };
  heater?: {
    type: string;
    power: string;
    material: string;
  };
  waterCapacity: string;
  filtration?: {
    type: string;
  };
  airJets?: { min: number; max: number };
  waterJets?: { min: number; max: number };
  ledStars?: { min: number; max: number };
  ledLamps?: { min: number; max: number };
  electricHeater?: boolean;
  coldTherapy?: boolean;
}

function parseCapacity(value: string): { min: number; max: number } {
  const match = value.match(/(\d+)\s*[-–]\s*(\d+)/);
  if (match) return { min: parseInt(match[1]), max: parseInt(match[2]) };
  const single = value.match(/(\d+)/);
  if (single) {
    const num = parseInt(single[1]);
    return { min: num, max: num };
  }
  return { min: 4, max: 6 };
}

function parseWeight(value: string): number | null {
  const match = value.match(/~?\s*(\d+)\s*kg/i);
  return match ? parseInt(match[1]) : null;
}

function parseDimensions(value: string): { external: number; internal: number; height: number } {
  const dims = { external: 2000, internal: 1700, height: 1050 };

  // "Išorė 2200 x 2200mm Aukštis 1050mm"
  const extMatch = value.match(/[Ii]šor[eė]\s*(\d+)/);
  if (extMatch) dims.external = parseInt(extMatch[1]);

  const intMatch = value.match(/[Vv]id[au]s\s*(\d+)/);
  if (intMatch) dims.internal = parseInt(intMatch[1]);

  const hMatch = value.match(/[Aa]ukšti?s\s*(\d+)/);
  if (hMatch) dims.height = parseInt(hMatch[1]);

  // Fallback: "2m x 1,05m"
  if (!extMatch) {
    const simpleMatch = value.match(/(\d+(?:[.,]\d+)?)\s*m\s*x\s*(\d+(?:[.,]\d+)?)\s*m/);
    if (simpleMatch) {
      dims.external = Math.round(parseFloat(simpleMatch[1].replace(',', '.')) * 1000);
      dims.height = Math.round(parseFloat(simpleMatch[2].replace(',', '.')) * 1000);
    }
  }

  return dims;
}

function parseHeater(value: string): { type: string; power: string; material: string } {
  const heater = { type: 'Malkinė', power: '25 kW', material: 'AISI 304' };

  if (value.toLowerCase().includes('horizon')) {
    heater.type = 'Integruota Horizon';
  } else if (value.toLowerCase().includes('integruot')) {
    heater.type = 'Integruota malkinė';
  } else if (value.toLowerCase().includes('išorin')) {
    heater.type = 'Išorinė malkinė';
  }

  const powerMatch = value.match(/(\d+)\s*kW/i);
  if (powerMatch) heater.power = `${powerMatch[1]} kW`;

  const matMatch = value.match(/AISI\s*(\d+(?:\/\d+)?)/i);
  if (matMatch) heater.material = `AISI ${matMatch[1]}`;

  return heater;
}

function parseJetRange(value: string): { min: number; max: number } | null {
  const match = value.match(/(\d+)\s*[-–]\s*(\d+)/);
  if (match) return { min: parseInt(match[1]), max: parseInt(match[2]) };
  return null;
}

function parseWaterCapacity(value: string): string {
  const match = value.match(/~?\s*(\d+)\s*L/i);
  return match ? `${match[1]} L` : '1000 L';
}

function transformScrapedSpecs(rawSpecs: RawSpec[]): { fullSpecs: FullSpecs; filterable: FilterableSpecs } {
  const fullSpecs: FullSpecs = {
    capacity: { min: 4, max: 6 },
    weight: '~250 kg',
    dimensions: { external: 2000, internal: 1700, height: 1050, unit: 'mm' },
    waterCapacity: '1000 L',
  };

  const filterable: FilterableSpecs = {
    hasWaterJets: false,
    hasAirJets: false,
    hasLED: false,
    hasFiltration: false,
    hasElectricHeater: false,
    isColdTherapy: false,
    weightKg: null,
    externalSizeMm: null,
  };

  for (const spec of rawSpecs) {
    const label = spec.label.toLowerCase();
    const value = spec.value;

    if (label.includes('žmon')) {
      fullSpecs.capacity = parseCapacity(value);
    } else if (label.includes('svor')) {
      fullSpecs.weight = value;
      filterable.weightKg = parseWeight(value);
    } else if (label.includes('išmat')) {
      const dims = parseDimensions(value);
      fullSpecs.dimensions = { ...dims, unit: 'mm' };
      filterable.externalSizeMm = dims.external;
    } else if (label.includes('krosn')) {
      fullSpecs.heater = parseHeater(value);
    } else if (label.includes('filtr') && !label.includes('purkšt')) {
      fullSpecs.filtration = { type: value };
      filterable.hasFiltration = true;
    } else if (label.includes('elektr') && label.includes('šild')) {
      fullSpecs.electricHeater = true;
      filterable.hasElectricHeater = true;
    } else if (label.includes('led')) {
      filterable.hasLED = true;
      const stars = value.match(/(\d+)\s*[-–]\s*(\d+)\s*[Žž]vaigžd/i);
      if (stars) fullSpecs.ledStars = { min: parseInt(stars[1]), max: parseInt(stars[2]) };
      const lamps = value.match(/(\d+)\s*[-–]\s*(\d+)\s*[Ll]emp/i);
      if (lamps) fullSpecs.ledLamps = { min: parseInt(lamps[1]), max: parseInt(lamps[2]) };
    } else if (label.includes('oro') && label.includes('purkšt')) {
      const jets = parseJetRange(value);
      if (jets) {
        fullSpecs.airJets = jets;
        filterable.hasAirJets = true;
      }
    } else if (label.includes('vandens') && label.includes('purkšt')) {
      const jets = parseJetRange(value);
      if (jets) {
        fullSpecs.waterJets = jets;
        filterable.hasWaterJets = true;
      }
    } else if (label.includes('vandens') && label.includes('talp')) {
      fullSpecs.waterCapacity = parseWaterCapacity(value);
    } else if (label.includes('šilumos') && label.includes('siurbl')) {
      fullSpecs.coldTherapy = true;
      filterable.isColdTherapy = true;
    } else if (label.includes('arctic') || label.includes('šalčio')) {
      filterable.isColdTherapy = true;
      fullSpecs.coldTherapy = true;
    }
  }

  return { fullSpecs, filterable };
}

function normalizeSlug(scrapedId: string): string {
  // Map scraped IDs to our slug format (without -kubilas suffix)
  const mapping: Record<string, string> = {
    'classic-round-in-kubilas': 'classic-round-in',
    'classic-round-out-kubilas': 'classic-round-out',
    'classic-round-out-kubilas-horizon': 'classic-round-horizon',
    'grande-round-in-kubilas': 'grande-round-in',
    'grande-round-in-kubilas-2': 'grande-round-in', // Duplicate with more specs
    'grande-round-out-kubilas': 'grande-round-out',
    'grande-round-out-kubilas-horizon': 'grande-round-horizon',
    'paris-in-kubilas': 'paris-in',
    'paris-in': 'paris-in',
    'andorra-kubilas': 'andorra',
    'cuba-out-kubilas': 'cuba-out',
    'cuba-out': 'cuba-out',
    'monaco-in-kubilas': 'monaco-in',
    'monaco-in': 'monaco-in',
    'monaco-out-kubilas': 'monaco-out',
    'monaco-out': 'monaco-out',
    'monaco-horizon-kubilas': 'monaco-horizon',
    'monaco-horizon': 'monaco-horizon',
    'macau-in-kubilas': 'macau-in',
    'macau-in': 'macau-in',
    'arctic-kubilas': 'arctic',
    'arctic': 'arctic',
    'arctic-chiller-kubilas': 'arctic-chiller',
    'arctic-chiller': 'arctic-chiller',
    'ofuro-kubilas': 'ofuro',
    'ofuro': 'ofuro',
  };

  return mapping[scrapedId] || scrapedId;
}

async function main() {
  const dataDir = path.join(__dirname, '..', 'data');
  const scrapedPath = path.join(dataDir, 'scraped', 'products.json');
  const productsPath = path.join(dataDir, 'products.json');

  // Read scraped data
  const scrapedData: ScrapedData = JSON.parse(fs.readFileSync(scrapedPath, 'utf-8'));

  // Read current products
  const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

  // Create a map of scraped specs by normalized slug
  const scrapedSpecsMap = new Map<string, { fullSpecs: FullSpecs; filterable: FilterableSpecs }>();

  for (const scrapedProduct of scrapedData.products) {
    const slug = normalizeSlug(scrapedProduct.id);
    const transformed = transformScrapedSpecs(scrapedProduct.specs || []);
    scrapedSpecsMap.set(slug, transformed);

    console.log(`Transformed: ${scrapedProduct.name} (${slug})`);
    console.log(`  - Has Water Jets: ${transformed.filterable.hasWaterJets}`);
    console.log(`  - Has Air Jets: ${transformed.filterable.hasAirJets}`);
    console.log(`  - Has LED: ${transformed.filterable.hasLED}`);
    console.log(`  - Has Filtration: ${transformed.filterable.hasFiltration}`);
  }

  // Update products with transformed specs
  let updatedCount = 0;
  for (const product of productsData.products) {
    const scrapedSpecs = scrapedSpecsMap.get(product.slug);

    if (scrapedSpecs) {
      // Merge full specs
      product.specs = {
        ...product.specs,
        ...scrapedSpecs.fullSpecs,
      };

      // Add filterable specs
      product.filterableSpecs = scrapedSpecs.filterable;

      updatedCount++;
    } else {
      console.warn(`No scraped data found for: ${product.slug}`);
      // Add default filterable specs
      product.filterableSpecs = {
        hasWaterJets: false,
        hasAirJets: false,
        hasLED: false,
        hasFiltration: false,
        hasElectricHeater: false,
        isColdTherapy: product.shape === 'therapeutic',
        weightKg: null,
        externalSizeMm: null,
      };
    }
  }

  // Write updated products
  productsData.lastUpdated = new Date().toISOString();
  productsData.version = '2.1.0';

  fs.writeFileSync(productsPath, JSON.stringify(productsData, null, 2));

  console.log(`\n✅ Updated ${updatedCount} products with transformed specs`);
  console.log(`📁 Saved to: ${productsPath}`);
}

main().catch(console.error);
