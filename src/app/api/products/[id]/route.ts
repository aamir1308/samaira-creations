import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { toProduct } from "../route";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return NextResponse.json(toProduct(data));
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (body.name !== undefined) updates.name = body.name;
  if (body.sku !== undefined) updates.sku = body.sku;
  if (body.price !== undefined) updates.price = body.price;
  if (body.originalPrice !== undefined) updates.original_price = body.originalPrice;
  if (body.category !== undefined) updates.category = body.category;
  if (body.subCategory !== undefined) updates.sub_category = body.subCategory;
  if (body.designs !== undefined) updates.designs = body.designs;
  if (body.ageGroups !== undefined) updates.age_groups = body.ageGroups;
  if (body.material !== undefined) updates.material = body.material;
  if (body.description !== undefined) updates.description = body.description;
  if (body.careInstructions !== undefined) updates.care_instructions = body.careInstructions;
  if (body.images !== undefined) updates.images = body.images;
  if (body.isOrganic !== undefined) updates.is_organic = body.isOrganic;
  if (body.isNew !== undefined) updates.is_new = body.isNew;
  if (body.isBestSeller !== undefined) updates.is_best_seller = body.isBestSeller;
  if (body.inStock !== undefined) updates.in_stock = body.inStock;

  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(toProduct(data));
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
