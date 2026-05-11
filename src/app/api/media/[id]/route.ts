import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, createAdminSupabaseClient } from "@/lib/supabase-server";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Auth check via session client
  const sessionClient = await createServerSupabaseClient();
  const { data: { session } } = await sessionClient.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: filename } = await params;

  // Use admin client to bypass storage RLS for delete
  const adminSupabase = createAdminSupabaseClient();
  const { error } = await adminSupabase.storage
    .from("product-images")
    .remove([filename]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
