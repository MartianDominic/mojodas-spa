import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

const models = [
  {
    slug: "ofuro",
    name: "Ofuro",
    badge: "GLAMPINGAMS",
    description:
      "2 asmenims, greitas įšilimas. Idealu porų poilsiui ir mažoms erdvėms.",
    image: "/images/b2b/ofuro-model.jpg",
  },
  {
    slug: "classic-round-out",
    name: "Classic Round Out",
    badge: "POPULIARIAUSIAS VERSLUI",
    description:
      "4-6 vietos, išorinė krosnelė. Universaliausias pasirinkimas sodyboms.",
    image: "/images/b2b/modern-cabin.jpg",
  },
  {
    slug: "grande-round-out",
    name: "Grande Round Out",
    badge: "DIDELĖMS KOMPANIJOMS",
    description:
      "6-8 vietos, galinga krosnelė. Skirta didelių grupių talpinimui ir pramogoms.",
    image: "/images/b2b/grande-model.jpg",
  },
];

export function B2BModels() {
  return (
    <section className="py-32 px-8 max-w-screen-2xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
        <h2 className="font-display text-4xl md:text-5xl max-w-2xl">
          Rekomenduojami modeliai verslui.
        </h2>
        <Link
          href={ROUTES.CATALOG}
          className="text-primary font-bold tracking-widest uppercase text-sm border-b-2 border-primary pb-2 cursor-pointer hover:opacity-80 transition-opacity"
        >
          Visi modeliai
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {models.map((model) => (
          <div key={model.slug} className="group">
            <div className="relative aspect-[3/4] overflow-hidden mb-8 bg-surface-container">
              <span className="absolute top-6 left-6 z-20 bg-primary text-white text-xs font-bold tracking-widest px-3 py-1 uppercase">
                {model.badge}
              </span>
              <Image
                src={model.image}
                alt={model.name}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
              />
            </div>
            <div className="space-y-4">
              <h3 className="font-headline text-2xl">{model.name}</h3>
              <p className="text-on-surface-variant text-sm">
                {model.description}
              </p>
              <Link
                href={ROUTES.PRODUCT(model.slug)}
                className="inline-block text-on-surface font-bold uppercase tracking-widest text-xs border-b border-on-surface pb-1 group-hover:text-primary group-hover:border-primary transition-colors"
              >
                Skaityti daugiau
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
