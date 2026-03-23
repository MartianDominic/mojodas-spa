import type { ProductSpecs, ProductCapacity } from "@/types";

interface TechSpecsProps {
  specs: ProductSpecs;
  capacity?: ProductCapacity;
}

interface SpecItemProps {
  label: string;
  value: string;
}

function SpecItem({ label, value }: SpecItemProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between py-6 border-b border-on-surface/10 group hover:bg-surface-container-low transition-colors px-2">
      <p className="text-sm uppercase tracking-[0.15em] font-medium text-secondary group-hover:text-on-surface transition-colors">
        {label}
      </p>
      <p className="font-headline text-xl text-on-surface mt-2 sm:mt-0 tracking-tight text-right">
        {value}
      </p>
    </div>
  );
}

export function TechSpecs({ specs, capacity }: TechSpecsProps) {
  const specItems: SpecItemProps[] = [];

  // Add capacity if provided
  if (capacity) {
    const capacityValue = capacity.min === capacity.max
      ? `${capacity.min} Zmones`
      : `${capacity.min}-${capacity.max} Zmones`;
    specItems.push({
      label: "Talpa",
      value: capacityValue,
    });
  }

  specItems.push(
    {
      label: "Svoris",
      value: specs.weight,
    },
    {
      label: "Ismataviamai (Isore)",
      value: `${specs.dimensions.external} ${specs.dimensions.unit}`,
    },
    {
      label: "Ismatavimai (Vidus)",
      value: `${specs.dimensions.internal} ${specs.dimensions.unit}`,
    },
    {
      label: "Aukstis",
      value: `${specs.dimensions.height} ${specs.dimensions.unit}`,
    },
    {
      label: "Vandens turis",
      value: specs.waterCapacity,
    }
  );

  // Add heater info if available
  if (specs.heater) {
    specItems.push({
      label: "Krosnele",
      value: `${specs.heater.type} (${specs.heater.power})`,
    });
  }

  // Add air jets if available
  if (specs.airJets) {
    const jetValue = specs.airJets.min === specs.airJets.max
      ? `${specs.airJets.min} vnt.`
      : `${specs.airJets.min}-${specs.airJets.max} vnt.`;
    specItems.push({
      label: "Oro purkstukai",
      value: jetValue,
    });
  }

  // Add water jets if available
  if (specs.waterJets) {
    const jetValue = specs.waterJets.min === specs.waterJets.max
      ? `${specs.waterJets.min} vnt.`
      : `${specs.waterJets.min}-${specs.waterJets.max} vnt.`;
    specItems.push({
      label: "Vandens purkstukai",
      value: jetValue,
    });
  }

  // Add LED stars if available
  if (specs.ledStars) {
    const ledValue = specs.ledStars.min === specs.ledStars.max
      ? `${specs.ledStars.min} zvaigzdes`
      : `${specs.ledStars.min}-${specs.ledStars.max} zvaigzdes`;
    specItems.push({
      label: "LED apsvietimas",
      value: ledValue,
    });
  }

  return (
    <div className="mt-24 pt-16 border-t-2 border-on-surface">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <h3 className="font-headline italic text-4xl font-light tracking-tight text-on-surface">The Ledger</h3>
        <p className="text-xs uppercase tracking-widest text-secondary mt-4 md:mt-0 font-medium">Techninė Specifikacija & Matmenys</p>
      </div>
      <div className="flex flex-col border-t border-on-surface">
        {specItems.map((item) => (
          <SpecItem key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
}
