import { cache } from "react";
import type { NewsArticle } from "@/lib/news";
import { createPublicClient } from "@/lib/supabase/public";

export type PublishedArticle = {
  id: string;
  author_id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  cover_image_url: string | null;
  body_markdown: string;
  published_at: string | null;
  author: {
    name: string;
    title: string;
    description: string;
    photo_url: string | null;
    linkedin_url: string | null;
    google_scholar_url: string | null;
  } | null;
};

export const getPublishedArticles = cache(async (): Promise<NewsArticle[]> => {
  const supabase = createPublicClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("articles")
    .select(
      "slug,title,excerpt,category,cover_image_url,published_at,body_markdown,author_id,is_featured",
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error || !data?.length) return [];
  const authorIds = [...new Set(data.map((item) => item.author_id))];
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id,name")
    .in("id", authorIds);
  const names = new Map(
    (profiles ?? []).map((profile) => [profile.id, profile.name]),
  );
  return data.map((item) => ({
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    category: item.category,
    date: item.published_at
      ? new Date(item.published_at).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "",
    image: item.cover_image_url || "/figma/news/card-2-heatmap.webp",
    featured: item.is_featured,
    author: names.get(item.author_id) || "Eyeclimate team",
    readTime: `${Math.max(1, Math.ceil(item.body_markdown.split(/\s+/).length / 200))} min read`,
  }));
});

export const getPublishedArticle = cache(
  async (slug: string): Promise<PublishedArticle | null> => {
    const supabase = createPublicClient();
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from("articles")
        .select(
          "id,author_id,title,slug,excerpt,category,cover_image_url,body_markdown,published_at",
        )
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      if (error || !data) return null;

      const { data: author } = await supabase
        .from("profiles")
        .select(
          "name,title,description,photo_url,linkedin_url,google_scholar_url",
        )
        .eq("id", data.author_id)
        .maybeSingle();

      return { ...data, author };
    } catch (error) {
      console.error("Unable to load published article", { slug, error });
      return null;
    }
  },
);
