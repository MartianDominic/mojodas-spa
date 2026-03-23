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
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLCc95wXpJ75aZGgdFs7-vwoxe7RUHJj_1qxTUcRhI8zvh50gXSTicNSCeEakXuZr6M-L0CAEuOF56Ni331j6V5e_abs6QbLivsIgdM11i2bzey0UUIqL085Q5ys_zzmevwPiIUfAcqzlrmW5U3uoHugJqkPYwYBzM8GPWS8h3CAidDwYufn0XDN7cuU27BW0FcyrjSSQ7VvSZoau2zMURoggFxV5i3wkxZ2Qz93B8slLgXIgBPjqMWnvPoj4IFsswbEEJyHRwhik",
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
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQF0iRK4nuaXgoWoUcoeqbc0VhwTG4AXksk1m0L7Thh6otUpVrgsu4MINOL7PufWmw3qR7lo_0e1Q8D7fcLN6jOH3HHqdFr4LDtd6KAG8NZ11nxfi1yo8i08OBtdk86dqf3yuwNJCjrUj0VKgp82BVhCxKVvY58gL0eSpb3NMQ9-u8c-iErj0wu8Y5ilIuUu23pewjzF3MU6fzd8aLApTZtqP7yciLq2qFd5p3tCOr_4pxSBEx8UvYdgUJGCINnyzoIugf4deHPAA",
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
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6jvWC4VZKtz1BGxZ5gQ1yVxY1DdSl1F4GXvNwBK6o3CpcQYDO7AhE8iSeXYJ9SrUNmnNRTamaYMchE15wbQwzAZsGzQ0hf7dkGYu9TKVKq0forlJnmWsZwiL1pWZ_7Qf6JD_OQ0mdfJgjwFRXpM1m0dVkPmt_JGGvSYldwHsJ3hXY8uOAPRVLd4lR2ytTkiNC9h9U7bEFFl3yraid1VDtjeqCgsuxYJouhOefOwBeBwDv_6Yf8ldPeDnitcPkJkSEz75hUrkvfR4",
    featured: false,
  },
];

export function Bestsellers() {
  const featured = bestsellers.find((p) => p.featured);
  const others = bestsellers.filter((p) => !p.featured);

  return (
    <section className="bg-[#FAFAFA] text-[#050505] py-32 px-12">
      <div className="container mx-auto">
        <div className="mb-16">
          <h2 className="font-headline text-4xl md:text-5xl mb-4">
            Dažniausias klientų pasirinkimas.
          </h2>
          <p className="font-body text-gray-500 max-w-2xl">
            Patikrinti modeliai, kuriuos dažniausiai užsako privačių namų savininkai.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  <span className="text-[10px] bg-black text-white px-3 py-1 uppercase tracking-widest inline-block mb-4">
                    {featured.badge}
                  </span>
                  <h3 className="font-headline text-4xl md:text-5xl mb-4">
                    {featured.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">{featured.tagline}</p>
                  <div className="mb-8">
                    <p className="text-[10px] uppercase tracking-widest font-bold mb-3">
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
                <span className="text-[10px] bg-black text-white px-3 py-1 uppercase tracking-widest inline-block mb-4">
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
