import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import type { Product } from "@/lib/types";

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { searchParams } = new URL(request.url);

  let query = supabase.from("products").select("*").order("name");

  const category = searchParams.get("category");
  if (category && category !== "all") query = query.eq("category", category);

  const inStock = searchParams.get("inStock");
  if (inStock === "true") query = query.eq("in_stock", true);

  const bestSellers = searchParams.get("bestSellers");
  if (bestSellers === "true") query = query.eq("is_best_seller", true);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json((data ?? []).map(toProduct));
}

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const id = `prod-${Date.now()}`;

  const { data, error } = await supabase
    .from("products")
    .insert({
      id,
      name: body.name,
      sku: body.sku,
      price: body.price,
      original_price: body.originalPrice || null,
      category: body.category,
      sub_category: body.subCategory || null,
      designs: body.designs || [],
      age_groups: body.ageGroups || [],
      material: body.material,
      description: body.description,
      care_instructions: body.careInstructions || null,
      images: body.images || [],
      is_organic: body.isOrganic ?? false,
      is_new: body.isNew ?? false,
      is_best_seller: body.isBestSeller ?? false,
      in_stock: body.inStock ?? true,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(toProduct(data), { status: 201 });
}

export function toProduct(row: Record<string, unknown>): Product {
  const images = (row.images as string[]) || [];
  return {
    id: row.id as string,
    name: row.name as string,
    sku: row.sku as string,
    price: row.price as number,
    originalPrice: row.original_price as number | undefined,
    category: row.category as Product["category"],
    subCategory: row.sub_category as string | undefined,
    designs: row.designs as string[] | undefined,
    ageGroups: row.age_groups as Product["ageGroups"],
    material: row.material as string,
    description: row.description as string,
    careInstructions: row.care_instructions as string | undefined,
    images,
    imageUrl: images[0] || undefined,
    isOrganic: row.is_organic as boolean | undefined,
    isNew: row.is_new as boolean | undefined,
    isBestSeller: row.is_best_seller as boolean | undefined,
    inStock: row.in_stock as boolean | undefined,
  };
}
