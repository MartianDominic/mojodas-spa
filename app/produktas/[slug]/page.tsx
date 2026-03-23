import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import {
  ProductGallery,
  TechSpecs,
  ProductInfo,
  RelatedProducts,
} from "@/components/product";
import {
  getAllScrapedProductSlugs,
  getScrapedProductBySlug,
  getScrapedRelatedProducts,
} from "@/lib/data/scraped-products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all products from scraped data
 */
export async function generateStaticParams() {
  const slugs = getAllScrapedProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getScrapedProductBySlug(slug);

  if (!product) {
    return {
      title: "Produktas nerastas",
    };
  }

  const seo = product.seo;

  return {
    title: seo?.title || `${product.name} | MojoDas SPA`,
    description: seo?.description || product.shortDescription || product.longDescription,
    keywords: seo?.keywords ? [...seo.keywords] : [],
    openGraph: {
      title: seo?.title || product.name,
      description: seo?.description || product.shortDescription,
      type: "website",
      locale: "lt_LT",
      images: product.images[0]
        ? [
            {
              url: product.images[0].url,
              alt: product.images[0].alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.title || product.name,
      description: seo?.description || product.shortDescription,
      images: product.images[0] ? [product.images[0].url] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getScrapedProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getScrapedRelatedProducts(product, 4);

  return (
    <>
      <Header />
      <main className="pb-32 -mt-24">
        {/* Full Viewport Cinematic Hero */}
        <div className="w-full overflow-hidden">
          <ProductGallery
            images={product.images}
            productName={product.name}
            badge={product.tagline}
          />
        </div>

        {/* Narrative & Specifications Grid */}
        <div className="max-w-screen-2xl mx-auto px-8 pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left Column: Narrative & Specs */}
            <div className="lg:col-span-7 space-y-24">
              <section className="max-w-3xl">
                <h2 className="font-headline italic text-4xl mb-8 font-light text-on-surface">The Narrative</h2>
                <p className="text-secondary/90 leading-relaxed font-body text-lg">
                  {product.longDescription || product.shortDescription}
                </p>
              </section>

              <TechSpecs
                specs={product.specs}
                capacity={product.capacity}
              />
            </div>

            {/* Right Column: Investment & Configuration Info */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32 pt-8">
                <ProductInfo product={product} />
              </div>
            </div>
          </div>

          {/* Related Products */}
          <RelatedProducts products={relatedProducts} />
        </div>
      </main>
      <Footer />
    </>
  );
}
