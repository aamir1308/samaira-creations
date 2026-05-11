import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { toBundle } from "../route";

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
  if (body.description !== undefined) updates.description = body.description;
  if (body.productIds !== undefined) updates.product_ids = body.productIds;
  if (body.price !== undefined) updates.price = body.price;
  if (body.originalPrice !== undefined) updates.original_price = body.originalPrice;
  if (body.savings !== undefined) updates.savings = body.savings;
  if (body.isFeatured !== undefined) updates.is_featured = body.isFeatured;
  if (body.isPerfectGift !== undefined) updates.is_perfect_gift = body.isPerfectGift;
  if (body.whatsappTemplate !== undefined) updates.whatsapp_template = body.whatsappTemplate;

  const { data, error } = await supabase
    .from("bundles")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: productRows } = await supabase
    .from("products")
    .select("*")
    .in("id", data.product_ids);

  const productMap = Object.fromEntries((productRows || []).map((p) => [p.id, p]));
  return NextResponse.json(toBundle(data, productMap));
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabase.from("bundles").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
