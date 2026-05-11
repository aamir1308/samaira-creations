import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase-server";

export async function GET() {
  const supabase = createAdminSupabaseClient();

  // Create bucket if it doesn't exist yet
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some((b) => b.name === "product-images");
  if (!bucketExists) {
    await supabase.storage.createBucket("product-images", { public: true });
  }

  const { data: files, error } = await supabase.storage
    .from("product-images")
    .list("", { limit: 200, sortBy: { column: "created_at", order: "desc" } });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const records = (files ?? [])
    .filter((f) => f.name !== ".emptyFolderPlaceholder")
    .map((f) => {
      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(f.name);
      return {
        id: f.name,
        filename: f.name,
        url: data.publicUrl,
        size: f.metadata?.size ?? 0,
        mime_type: f.metadata?.mimetype ?? "image/jpeg",
        created_at: f.created_at ?? new Date().toISOString(),
      };
    });

  return NextResponse.json(records);
}
