import Link from "next/link";
import { redirect } from "next/navigation";
import BackButton from "@/components/BackButton";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Your articles | Eyeclimate" };

export default async function ArticlesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/portal/articles");
  const { data: articles, error } = await supabase
    .from("articles")
    .select("id,title,slug,category,status,is_featured,updated_at,published_at")
    .eq("author_id", user.id)
    .order("updated_at", { ascending: false });

  return (
    <section className="site-container pb-14 pt-7 lg:pb-20 lg:pt-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <BackButton href="/portal" label="Back to portal" />
        <Link
          href="/portal/articles/new"
          className="inline-flex h-11 items-center rounded-full bg-accent-green px-6 text-body-sm font-medium text-text-inverse"
        >
          New article +
        </Link>
      </div>
      <div className="mt-7">
        <p className="text-label uppercase tracking-label text-accent-green">
          Publishing
        </p>
        <h1 className="mt-3 text-h2-mobile font-normal md:text-h2">
          Your articles.
        </h1>
        <p className="mt-2 text-body text-text-muted">
          Create drafts, publish stories, or archive work that is no longer
          active.
        </p>
      </div>
      {error ? (
        <p className="mt-8 rounded-lg border border-red-500/40 bg-red-500/10 p-5 text-body-sm text-red-300">
          {error.message}. Run the articles migration in Supabase first.
        </p>
      ) : (
        <div className="mt-7 overflow-hidden rounded-xl border border-divider">
          {articles?.length ? (
            articles.map((article) => (
              <Link
                key={article.id}
                href={`/portal/articles/${article.id}/edit`}
                className="grid gap-4 border-b border-divider bg-bg-card p-5 transition-colors last:border-b-0 hover:bg-bg-card-inset md:grid-cols-news-row md:items-center"
              >
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-tiny uppercase tracking-caption ${article.status === "published" ? "border-border-accent text-accent-green" : "border-divider text-text-dim"}`}
                  >
                    {article.status}
                  </span>
                  {article.is_featured && (
                    <span className="inline-flex rounded-full border border-border-accent px-3 py-1 text-tiny uppercase tracking-caption text-accent-green">
                      Featured
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-body font-medium">
                    {article.title || "Untitled article"}
                  </h2>
                  <p className="mt-1 text-body-xs text-text-dim">
                    {article.category} · Updated{" "}
                    {new Date(article.updated_at).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-right text-text-muted">→</span>
              </Link>
            ))
          ) : (
            <div className="bg-bg-card p-10 text-center">
              <h2 className="text-h5">No articles yet.</h2>
              <p className="mt-3 text-body-sm text-text-muted">
                Create your first draft to begin.
              </p>
              <Link
                href="/portal/articles/new"
                className="mt-6 inline-flex rounded-full bg-accent-green px-5 py-3 text-body-sm font-medium text-text-inverse"
              >
                Create article
              </Link>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
