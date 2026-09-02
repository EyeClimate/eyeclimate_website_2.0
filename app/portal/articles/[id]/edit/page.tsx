import { notFound, redirect } from "next/navigation";
import ArticleEditor, {
  type ArticleAuthorProfile,
  type EditableArticle,
} from "@/components/ArticleEditor";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Edit article | Eyeclimate" };
export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=/portal/articles/${id}/edit`);
  const { data } = await supabase
    .from("articles")
    .select(
      "id,title,slug,excerpt,category,cover_image_url,body_markdown,status,is_featured,published_at",
    )
    .eq("id", id)
    .eq("author_id", user.id)
    .maybeSingle();
  if (!data) notFound();
  const { data: profile } = await supabase
    .from("profiles")
    .select("name,title,description,photo_url,linkedin_url,google_scholar_url")
    .eq("id", user.id)
    .maybeSingle();
  return (
    <ArticleEditor
      userId={user.id}
      initialArticle={data as EditableArticle}
      authorProfile={profile as ArticleAuthorProfile | null}
    />
  );
}
