"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function deleteArticle(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  if (!id) redirect("/portal/articles");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/portal/articles");

  const { data: article } = await supabase
    .from("articles")
    .select("slug")
    .eq("id", id)
    .eq("author_id", user.id)
    .maybeSingle();
  if (!article) redirect("/portal/articles?error=Article%20not%20found.");

  const { error } = await supabase
    .from("articles")
    .delete()
    .eq("id", id)
    .eq("author_id", user.id);
  if (error)
    redirect(`/portal/articles?error=${encodeURIComponent(error.message)}`);

  revalidatePath("/");
  revalidatePath("/news");
  revalidatePath("/newsroom");
  revalidatePath(`/news/${article.slug}`);
  revalidatePath("/portal/articles");
  redirect("/portal/articles?message=Article%20deleted.");
}
