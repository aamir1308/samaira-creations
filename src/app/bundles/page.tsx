import { createServerSupabaseClient } from "@/lib/supabase-server";
import { toBundle } from "@/app/api/bundles/route";
import { BundlesClient } from "./bundles-client";

export default async function BundlesPage() {
  const supabase = await createServerSupabaseClient();

  const { data: bundleRows } = await supabase
    .from("bundles")
    .select("*")
    .order("created_at", { ascending: true });

  const rows = bundleRows ?? [];

  const allProductIds = [...new Set(rows.flatMap((b) => b.product_ids as string[]))];

  let productMap: Record<string, Record<string, unknown>> = {};
  if (allProductIds.length > 0) {
    const { data: productRows } = await supabase
      .from("products")
      .select("*")
      .in("id", allProductIds);
    productMap = Object.fromEntries(
      (productRows ?? []).map((p) => [p.id, p as Record<string, unknown>])
    );
  }

  const bundles = rows.map((row) => toBundle(row as Record<string, unknown>, productMap));

  return <BundlesClient bundles={bundles} />;
}
