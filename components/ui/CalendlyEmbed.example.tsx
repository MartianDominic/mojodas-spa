/**
 * CalendlyEmbed Usage Examples
 *
 * This file demonstrates various ways to use the CalendlyEmbed component.
 * DO NOT import this file in production code - it's for documentation only.
 */

import { CalendlyEmbed } from "./CalendlyEmbed";

// Example 1: Basic Inline Embed
export function BasicInlineExample() {
  return (
    <CalendlyEmbed
      style="inline"
      height={700}
    />
  );
}

// Example 2: Popup Button
export function PopupButtonExample() {
  return (
    <CalendlyEmbed
      style="popup"
      buttonText="Užsiregistruoti konsultacijai"
      buttonVariant="primary"
      buttonSize="lg"
    />
  );
}

// Example 3: Custom URL with Prefill
export function CustomUrlWithPrefillExample() {
  return (
    <CalendlyEmbed
      url="https://calendly.com/mojodasspa/techninė-konsultacija"
      style="inline"
      height={800}
      prefill={{
        name: "Jonas Jonaitis",
        email: "jonas@example.com",
        customAnswers: {
          a1: "Baseino konstrukcija",
        },
      }}
    />
  );
}

// Example 4: Different Heights
export function VariableHeightExample() {
  return (
    <div className="space-y-8">
      <CalendlyEmbed style="inline" height={500} />
      <CalendlyEmbed style="inline" height="100vh" />
    </div>
  );
}

// Example 5: Custom Styling
export function CustomStyledExample() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="font-display text-3xl mb-6">
        Rezervuokite konsultaciją
      </h2>
      <CalendlyEmbed
        style="inline"
        height={700}
        className="shadow-lg border border-outline-variant/30"
      />
    </div>
  );
}

// Example 6: Multiple Popup Buttons
export function MultiplePopupButtonsExample() {
  return (
    <div className="flex gap-4">
      <CalendlyEmbed
        style="popup"
        buttonText="15 min konsultacija"
        buttonVariant="primary"
        url="https://calendly.com/mojodasspa/15min-konsultacija"
      />
      <CalendlyEmbed
        style="popup"
        buttonText="30 min konsultacija"
        buttonVariant="secondary"
        url="https://calendly.com/mojodasspa/30min-konsultacija"
      />
    </div>
  );
}

// Example 7: Replacing B2BCalendly Placeholder
export function B2BCalendlyReplacement() {
  return (
    <div className="bg-surface-container-high p-6 md:p-8 lg:p-12 flex flex-col justify-center items-center text-center space-y-8 relative overflow-hidden h-full">
      <div className="relative z-10 w-full max-w-4xl">
        <h3 className="font-display text-3xl mb-4">
          Techninė konsultacija su inžinieriumi
        </h3>
        <p className="text-on-surface-variant mb-8 leading-relaxed">
          Aptarkime techninius niuansus, pamatus ir pajungimo galimybes jūsų
          sklype video skambučio metu.
        </p>

        <CalendlyEmbed
          style="inline"
          height={700}
          className="bg-surface-container border border-outline-variant/30"
        />
      </div>
    </div>
  );
}

// Example 8: Replacing ConsultationBooking Section
export function ConsultationBookingReplacement() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-surface overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Left Content */}
          <div className="flex-1 max-w-2xl">
            <p className="text-primary font-bold text-xs tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
              Pavasario gamybos grafikas sparčiai pildosi.
            </p>
            <h2 className="font-headline text-4xl md:text-6xl mb-8 leading-tight">
              Rezervuokite nemokamą 15 minučių pokalbį.
            </h2>
            <p className="font-body text-lg text-on-surface-variant mb-12 max-w-lg">
              Parinksime tinkamiausią modelį jūsų sklypui, aptarsime techninius
              reikalavimus ir pateiksime preliminarų kainos pasiūlymą.
            </p>
          </div>

          {/* Right - Calendar Embed */}
          <div className="flex-1 w-full lg:w-auto">
            <CalendlyEmbed
              style="inline"
              height={600}
              className="bg-surface-container-high shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
