import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

// Bestseller products data
const bestsellers = [
  {
    slug: "monaco-horizon",
    name: "Monaco Horizon",
    tagline: "*Integruota Horizon krosnele | 6 asmenys | Premium klase",
    badge: "AUKŠČIAUSIA KLASĖ",
    price: "4 490",
    monthlyPayment: "135",
    colors: ["#3d2b1f", "#c4a484", "#808080", "#1a1a1a"],
    image: "/images/products/monaco-horizon/hero-1.jpg",
    featured: true,
  },
  {
    slug: "classic-round-out-kubilas",
    name: "Classic Round Out",
    tagline: "*Išorinė krosnelė | 4-6 asmenys",
    badge: "POPULIARIAUSIAS",
    price: "2 490",
    monthlyPayment: "75",
    colors: ["#3d2b1f", "#808080", "#1a1a1a"],
    image: "/images/products/classic-round-out/hero-1.jpg",
    featured: false,
  },
  {
    slug: "grande-round-in-kubilas",
    name: "Grande Round In",
    tagline: "*Integruota krosnelė | 6-8 asmenys | Erdvus šeimai",
    badge: "ERDVIAUSIAS",
    price: "3 190",
    monthlyPayment: "95",
    colors: ["#3d2b1f", "#c4a484", "#808080", "#1a1a1a"],
    image: "/images/products/grande-round-in/hero-1.jpg",
    featured: false,
  },
];

export function Bestsellers() {
  const featured = bestsellers.find((p) => p.featured);
  const others = bestsellers.filter((p) => !p.featured);

  return (
    <section className="bg-[#FAFAFA] text-[#050505] py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-12">
      <div className="container mx-auto max-w-screen-2xl">
        <div className="mb-12 md:mb-16">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl mb-4">
            Dažniausias klientų pasirinkimas.
          </h2>
          <p className="font-body text-sm md:text-base text-gray-500 max-w-2xl">
            Patikrinti modeliai, kuriuos dažniausiai užsako privačių namų savininkai.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Featured Card */}
          {featured && (
            <div className="md:col-span-2 flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200">
              <div className="md:w-1/2 h-[400px] md:h-auto relative">
                <Image
                  src={featured.image}
                  alt={featured.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:w-1/2 p-10 flex flex-col justify-center">
                <div>
                  <span className="text-xs bg-black text-white px-3 py-1 uppercase tracking-widest inline-block mb-4">
                    {featured.badge}
                  </span>
                  <h3 className="font-headline text-4xl md:text-5xl mb-4">
                    {featured.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">{featured.tagline}</p>
                  <div className="mb-8">
                    <p className="text-xs uppercase tracking-widest font-bold mb-3">
                      Spalvų pasirinkimai:
                    </p>
                    <div className="flex gap-3">
                      {featured.colors.map((color) => (
                        <div
                          key={color}
                          className="w-6 h-6 rounded-full border border-gray-300"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mb-8">
                    <span className="text-3xl font-headline">
                      Nuo {featured.price} €
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      arba {featured.monthlyPayment} €/mėn. skaidant mokėjimą
                    </p>
                  </div>
                  <Link href={ROUTES.CONFIGURATOR(featured.slug)}>
                    <button className="bg-black text-white w-full py-4 text-xs tracking-widest uppercase hover:opacity-90 transition-opacity">
                      KONFIGŪRUOTI
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Other Cards */}
          {others.map((product) => (
            <div
              key={product.slug}
              className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={256}
                className="h-64 object-cover w-full"
              />
              <div className="p-8">
                <span className="text-xs bg-black text-white px-3 py-1 uppercase tracking-widest inline-block mb-4">
                  {product.badge}
                </span>
                <h3 className="font-headline text-2xl mb-2">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-6">{product.tagline}</p>
                <div className="mb-6">
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <div
                        key={color}
                        className="w-5 h-5 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <span className="text-2xl font-headline">
                    Nuo {product.price} €
                  </span>
                  <p className="text-xs text-gray-400 mt-1">
                    arba {product.monthlyPayment} €/mėn. skaidant mokėjimą
                  </p>
                </div>
                <Link href={ROUTES.CONFIGURATOR(product.slug)}>
                  <button className="bg-black text-white w-full py-4 text-xs tracking-widest uppercase hover:opacity-90 transition-opacity">
                    KONFIGŪRUOTI
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
