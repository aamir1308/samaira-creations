import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import type { Bundle, Product } from "@/lib/types";

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { searchParams } = new URL(request.url);

  let query = supabase.from("bundles").select("*").order("name");

  const featured = searchParams.get("featured");
  if (featured === "true") query = query.eq("is_featured", true);

  const { data: bundleRows, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Resolve product_ids to full product objects
  const allProductIds = [...new Set(bundleRows.flatMap((b) => b.product_ids as string[]))];
  let products: Record<string, unknown>[] = [];

  if (allProductIds.length > 0) {
    const { data: productRows } = await supabase
      .from("products")
      .select("*")
      .in("id", allProductIds);
    products = productRows || [];
  }

  const productMap = Object.fromEntries(products.map((p) => [p.id as string, p]));

  const bundles = bundleRows.map((b) => toBundle(b, productMap));
  return NextResponse.json(bundles);
}

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const id = `bundle-${Date.now()}`;

  const { data, error } = await supabase
    .from("bundles")
    .insert({
      id,
      name: body.name,
      description: body.description || "",
      product_ids: body.productIds || [],
      price: body.price,
      original_price: body.originalPrice || 0,
      savings: body.savings || null,
      is_featured: body.isFeatured ?? false,
      is_perfect_gift: body.isPerfectGift ?? false,
      whatsapp_template: body.whatsappTemplate || "",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Resolve products for response
  const { data: productRows } = await supabase
    .from("products")
    .select("*")
    .in("id", data.product_ids);

  const productMap = Object.fromEntries((productRows || []).map((p) => [p.id, p]));
  return NextResponse.json(toBundle(data, productMap), { status: 201 });
}

export function toBundle(row: Record<string, unknown>, productMap: Record<string, Record<string, unknown>>): Bundle {
  const productIds = (row.product_ids as string[]) || [];
  return {
    id: row.id as string,
    name: row.name as string,
    description: row.description as string,
    products: productIds.map((id) => productMap[id]).filter(Boolean).map(toProductBrief),
    price: row.price as number,
    originalPrice: row.original_price as number,
    savings: row.savings as number | undefined,
    isFeatured: row.is_featured as boolean | undefined,
    isPerfectGift: row.is_perfect_gift as boolean | undefined,
    whatsappTemplate: row.whatsapp_template as string,
  };
}

function toProductBrief(row: Record<string, unknown>): Product {
  const images = (row.images as string[]) || [];
  return {
    id: row.id as string,
    name: row.name as string,
    sku: row.sku as string,
    price: row.price as number,
    category: row.category as Product["category"],
    material: row.material as string,
    description: row.description as string,
    ageGroups: row.age_groups as Product["ageGroups"],
    designs: row.designs as string[] | undefined,
    images,
    imageUrl: images[0] || undefined,
    isOrganic: row.is_organic as boolean | undefined,
    isNew: row.is_new as boolean | undefined,
    isBestSeller: row.is_best_seller as boolean | undefined,
    inStock: row.in_stock as boolean | undefined,
  };
}
