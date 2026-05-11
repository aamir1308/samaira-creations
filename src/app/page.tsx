import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { CategoriesSection } from "@/components/sections/categories";
import { BundlesSection } from "@/components/sections/bundles";
import { OrganicStorySection } from "@/components/sections/organic-story";
import { BestSellersSection } from "@/components/sections/best-sellers";
import { GallerySection } from "@/components/sections/gallery";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { toProduct } from "@/app/api/products/route";
import { toBundle } from "@/app/api/bundles/route";

export default async function Home() {
  const supabase = await createServerSupabaseClient();

  const [{ data: productRows }, { data: bundleRows }] = await Promise.all([
    supabase.from("products").select("*").eq("is_best_seller", true).eq("in_stock", true).limit(4),
    supabase.from("bundles").select("*").eq("is_featured", true).limit(6),
  ]);

  const bestSellers = (productRows ?? []).map(toProduct);

  // Resolve product IDs for bundles
  const allProductIds = [...new Set((bundleRows ?? []).flatMap((b) => b.product_ids as string[]))];
  let productMap: Record<string, Record<string, unknown>> = {};
  if (allProductIds.length > 0) {
    const { data: pRows } = await supabase.from("products").select("*").in("id", allProductIds);
    productMap = Object.fromEntries((pRows ?? []).map((p) => [p.id, p as Record<string, unknown>]));
  }
  const featuredBundles = (bundleRows ?? []).map((row) => toBundle(row as Record<string, unknown>, productMap));

  return (
    <div className="min-h-screen bg-[var(--canvas)]">
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <BundlesSection bundles={featuredBundles} />
        <OrganicStorySection />
        <BestSellersSection products={bestSellers} />
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
}
