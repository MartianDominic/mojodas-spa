import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CatalogContent } from "@/components/catalog";
import { getCatalogProducts } from "@/lib/data/catalog-products";
import type { ProductShape } from "@/types";

/**
 * Category metadata and configuration
 */
const CATEGORIES = {
  apvalus: {
    shape: "round" as ProductShape,
    title: "Apvalūs Kubilai",
    description:
      "Klasikinio dizaino apvalūs masažiniai kubilai. Tobula forma, maksimali erdvė ir hidrodynamika. Lietuvoje gaminami premium kokybės SPA kubilai.",
    keywords: [
      "apvalus kubilas",
      "round hot tub",
      "apvalūs kubilai",
      "klasikinis kubilas",
      "Lux Spa Nature apvalus",
    ],
  },
  kvadratinis: {
    shape: "square" as ProductShape,
    title: "Kvadratiniai Kubilai",
    description:
      "Modernūs kvadratiniai masažiniai kubilai. Šiuolaikiškas dizainas, maksimalus komfortas. Lietuvoje gaminami premium kokybės SPA sprendimai.",
    keywords: [
      "kvadratinis kubilas",
      "square hot tub",
      "kvadratiniai kubilai",
      "modernus kubilas",
      "Lux Spa Nature kvadratinis",
    ],
  },
  terapinis: {
    shape: "therapeutic" as ProductShape,
    title: "Terapiniai Kubilai",
    description:
      "Specialūs terapiniai kubilai sveikatai ir atsipalaidavimui. Arctic šalčio terapija ir Ofuro tradicija. Lietuvoje gaminami terapiniai sprendimai.",
    keywords: [
      "terapinis kubilas",
      "therapeutic tub",
      "Arctic kubilas",
      "Ofuro kubilas",
      "šalčio terapija",
      "japoniškas kubilas",
    ],
  },
} as const;

type CategorySlug = keyof typeof CATEGORIES;

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

/**
 * Generate static params for all categories
 * Enables ISR and static generation at build time
 */
export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({
    category,
  }));
}

/**
 * Generate metadata for category page
 */
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  if (!(category in CATEGORIES)) {
    return {
      title: "Kategorija Nerasta | Lux Spa Nature",
    };
  }

  const categoryConfig = CATEGORIES[category as CategorySlug];

  return {
    title: `${categoryConfig.title} | Lux Spa Nature Katalogas`,
    description: categoryConfig.description,
    keywords: [...categoryConfig.keywords, "Lux Spa Nature", "Lietuva", "kubilai"],
    openGraph: {
      title: `${categoryConfig.title} | Lux Spa Nature`,
      description: categoryConfig.description,
      type: "website",
      locale: "lt_LT",
    },
  };
}

/**
 * Category page - Server Component
 * Fetches and filters products by category (shape) server-side
 */
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  // Validate category
  if (!(category in CATEGORIES)) {
    notFound();
  }

  const categoryConfig = CATEGORIES[category as CategorySlug];

  // Fetch all products server-side
  const allProducts = getCatalogProducts();

  // Filter products by shape
  const filteredProducts = allProducts.filter(
    (product) => product.shape === categoryConfig.shape
  );

  return (
    <>
      <Header />

      <main className="pt-32 pb-24 bg-[#FAFAFA]">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="px-8 md:px-16 max-w-screen-2xl mx-auto mb-8"
        >
          <ol className="flex items-center gap-2 text-sm text-on-surface-variant">
            <li>
              <a
                href="/"
                className="hover:text-primary transition-colors"
              >
                Pagrindinis
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <a
                href="/katalogas"
                className="hover:text-primary transition-colors"
              >
                Katalogas
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li
              aria-current="page"
              className="text-on-surface font-medium"
            >
              {categoryConfig.title}
            </li>
          </ol>
        </nav>

        {/* Category Header */}
        <section className="px-8 md:px-16 max-w-screen-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-on-surface mb-4">
            {categoryConfig.title}
          </h1>
          <p className="text-lg text-on-surface-variant max-w-3xl">
            {categoryConfig.description}
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-on-surface-variant">
            <span className="font-mono">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "produktas"
                : filteredProducts.length < 10
                ? "produktai"
                : "produktų"}
            </span>
          </div>
        </section>

        {/* Filter Bar + Product Grid */}
        <CatalogContent products={filteredProducts} />

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <section className="px-8 md:px-16 max-w-screen-2xl mx-auto">
            <div className="text-center py-20 bg-white rounded-lg shadow-sm">
              <p className="text-on-surface-variant text-lg mb-4">
                Šioje kategorijoje produktų kol kas nėra.
              </p>
              <a
                href="/katalogas"
                className="inline-block text-primary underline hover:no-underline"
              >
                Peržiūrėti visą katalogą
              </a>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
