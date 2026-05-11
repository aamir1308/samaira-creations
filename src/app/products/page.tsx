import { createServerSupabaseClient } from "@/lib/supabase-server";
import { toProduct } from "@/app/api/products/route";
import { ProductsClient } from "./products-client";

export default async function ProductsPage() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("in_stock", true)
    .order("is_best_seller", { ascending: false });

  const products = (data ?? []).map(toProduct);

  return <ProductsClient initialProducts={products} />;
}
