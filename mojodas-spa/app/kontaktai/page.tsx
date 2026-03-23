import { Header, Footer } from "@/components/layout";
import { ContactInfo, ContactForm, ContactCalendly } from "@/components/contact";

export const metadata = {
  title: "Kontaktai | MojoDas Spa",
  description:
    "Susisiekite su MojoDas Spa komanda. Konsultacija, užsakymai, techninė informacija. Esame pasirengę atsakyti į visus jūsų klausimus.",
};

export default function ContactPage() {
  return (
    <>
      <Header variant="default" />
      <main>
        {/* Hero Section */}
        <section className="max-w-screen-2xl mx-auto px-8 pt-32 pb-20">
          <div className="max-w-4xl">
            <span className="text-primary font-bold tracking-[0.2em] text-[10px] uppercase block mb-4">
              SUSISIEKIME
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6">
              Atsakysime į visus jūsų klausimus
            </h1>
            <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed max-w-2xl">
              Ar turite klausimų apie mūsų produktus, pristatymą ar techninius
              sprendimus? Mūsų komanda pasirengusi jums padėti.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <ContactInfo />

        {/* Main Contact Section - Form & Calendly */}
        <section
          className="max-w-screen-2xl mx-auto px-8 py-32 grid grid-cols-1 lg:grid-cols-2 gap-20"
          id="contact-form"
        >
          <ContactForm />
          <ContactCalendly />
        </section>

        {/* Map Section */}
        <section className="max-w-screen-2xl mx-auto px-8 pb-32">
          <div className="bg-surface-container-high p-12">
            <div className="mb-12">
              <span className="text-primary font-bold tracking-[0.2em] text-[10px] uppercase block mb-4">
                LOKACIJA
              </span>
              <h2 className="font-display text-4xl mb-4">Atvykite pas mus</h2>
              <p className="text-on-surface-variant leading-relaxed max-w-2xl">
                Kviečiame apsilankyti mūsų gamybos patalpose ir pamatyti, kaip
                kuriami aukščiausios kokybės SPA kubilai.
              </p>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-96 bg-surface-container border border-outline-variant/30 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-6xl opacity-20">📍</div>
                <span className="text-[10px] font-bold tracking-widest uppercase opacity-60">
                  [ GOOGLE MAPS EMBED ]
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
