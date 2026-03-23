import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

// Product category images
const categories = [
  {
    title: "Apvalūs kubilai",
    subtitle: "Klasikinis dizainas 4-8 asmenims",
    image: "/images/products/classic-round-out/hero-1.jpg",
    href: `${ROUTES.CATALOG}?shape=round`,
    size: "large",
  },
  {
    title: "Kvadratiniai kubilai",
    subtitle: "Monaco, Cuba, Macau serijos",
    image: "/images/products/monaco-horizon/hero-1.jpg",
    href: `${ROUTES.CATALOG}?shape=square`,
    size: "small",
  },
  {
    title: "Šalčio terapija",
    subtitle: "Arctic ir Ofuro modeliai",
    image: "/images/products/arctic/hero-1.jpg",
    href: `${ROUTES.CATALOG}?type=cold-therapy`,
    size: "small",
  },
];

export function CategoryGrid() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-surface-container-low">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch max-w-screen-2xl">
        {/* Large Card */}
        <div className="md:col-span-8 relative aspect-[16/9] md:aspect-auto md:min-h-[400px] lg:min-h-[500px] bg-surface overflow-hidden group">
          <Image
            src={categories[0].image}
            alt={categories[0].title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6 md:p-8 lg:p-12">
            <h3 className="text-white font-headline text-2xl md:text-3xl mb-2">
              {categories[0].title}
            </h3>
            <p className="text-white/80 text-sm md:text-base mb-4 md:mb-6">{categories[0].subtitle}</p>
            <Link
              href={categories[0].href}
              className="w-fit border-b border-white text-white text-xs font-bold tracking-widest uppercase pb-2 hover:opacity-70 transition-opacity"
            >
              PERŽIŪRĖTI
            </Link>
          </div>
        </div>

        {/* Small Cards */}
        <div className="md:col-span-4 flex flex-col gap-6 md:gap-8">
          {categories.slice(1).map((category) => (
            <div
              key={category.title}
              className="flex-1 relative bg-surface overflow-hidden group min-h-[200px] md:min-h-[240px]"
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6 md:p-8">
                <h3 className="text-white font-headline text-2xl mb-1">
                  {category.title}
                </h3>
                <p className="text-white/80 text-sm mb-4">{category.subtitle}</p>
                <Link
                  href={category.href}
                  className="w-fit border-b border-white text-white text-xs font-bold tracking-widest uppercase pb-2 hover:opacity-70 transition-opacity"
                >
                  PERŽIŪRĖTI
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
