import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { getPublishedArticles } from "@/lib/supabase/articles";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const articles = await getPublishedArticles();
  const staticRoutes = [
    "",
    "/about",
    "/news",
    "/newsroom",
    "/contact",
    "/privacy",
    "/product/methanemapper",
    "/product/wildlifemapper",
    "/use-cases/methane-detection",
    "/use-cases/methane-monitoring",
    "/use-cases/wildlife-detection",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency:
        route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : route === "/news" ? 0.9 : 0.7,
    })),
    ...articles.map((article) => ({
      url: `${baseUrl}/news/${article.slug}`,
      lastModified: article.date ? new Date(article.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
