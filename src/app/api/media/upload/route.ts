import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, createAdminSupabaseClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  // Auth check via session client
  const sessionClient = await createServerSupabaseClient();
  const { data: { session } } = await sessionClient.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
  }
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File must be under 5MB" }, { status: 400 });
  }

  const ext = file.name.split(".").pop() || "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  // Use admin client to bypass storage RLS for upload
  const adminSupabase = createAdminSupabaseClient();

  // Create bucket if it doesn't exist yet
  const { data: buckets } = await adminSupabase.storage.listBuckets();
  const bucketExists = buckets?.some((b) => b.name === "product-image");
  if (!bucketExists) {
    await adminSupabase.storage.createBucket("product-image", { public: true });
  }

  const { error: uploadError } = await adminSupabase.storage
    .from("product-image")
    .upload(filename, buffer, { contentType: file.type, upsert: false });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: { publicUrl } } = adminSupabase.storage
    .from("product-image")
    .getPublicUrl(filename);

  return NextResponse.json(
    {
      id: filename,
      filename,
      url: publicUrl,
      size: file.size,
      mime_type: file.type,
      created_at: new Date().toISOString(),
    },
    { status: 201 }
  );
}
