import { redirect } from "next/navigation";
import ArticleEditor, {
  type ArticleAuthorProfile,
} from "@/components/ArticleEditor";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "New article | Eyeclimate" };
export default async function NewArticlePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/portal/articles/new");
  const { data: profile } = await supabase
    .from("profiles")
    .select("name,title,description,photo_url,linkedin_url,google_scholar_url")
    .eq("id", user.id)
    .maybeSingle();
  return (
    <ArticleEditor
      userId={user.id}
      authorProfile={profile as ArticleAuthorProfile | null}
    />
  );
}
