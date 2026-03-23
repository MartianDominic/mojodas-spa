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
    <div>
      <p className="text-xs uppercase tracking-widest text-secondary mb-1">
        {label}
      </p>
      <p className="font-medium text-on-surface">{value}</p>
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
    <div className="bg-surface-container-low p-12 mt-12">
      <h3 className="font-headline text-2xl mb-8">Technine Specifikacija</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-8">
        {specItems.map((item) => (
          <SpecItem key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
}
