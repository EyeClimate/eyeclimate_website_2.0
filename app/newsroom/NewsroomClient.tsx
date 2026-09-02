"use client";

import { useMemo, useState } from "react";
import NewsCard from "@/components/NewsCard";
import type { NewsArticle } from "@/lib/news";

export default function NewsroomClient({
  articles,
}: {
  articles: NewsArticle[];
}) {
  const [filter, setFilter] = useState("All");
  const filters = useMemo(() => {
    const categories = new Map<string, string>();
    articles.forEach((article) => {
      const category = article.category.trim();
      if (category) categories.set(category.toLocaleLowerCase(), category);
    });
    return [
      "All",
      ...Array.from(categories.values()).sort((a, b) => a.localeCompare(b)),
    ];
  }, [articles]);
  const visibleArticles = useMemo(
    () =>
      filter === "All"
        ? articles
        : articles.filter(
            (article) =>
              article.category.trim().toLocaleLowerCase() ===
              filter.toLocaleLowerCase(),
          ),
    [articles, filter],
  );
  return (
    <section className="site-container py-12 md:py-16">
      <p className="text-body-xs text-text-dim">
        Home&nbsp; / &nbsp;All updates
      </p>
      <header className="mt-8 flex items-end justify-between">
        <div>
          <p className="text-label uppercase tracking-label text-text-dim">
            Newsroom
          </p>
          <h1 className="mt-3 text-h2-mobile font-normal md:text-h2">
            Newsroom
          </h1>
        </div>
        <div className="text-right">
          <p className="text-h3-mobile">{articles.length}</p>
          <p className="text-label uppercase tracking-label text-text-dim">
            Articles · 2026
          </p>
        </div>
      </header>
      <div className="mt-8 flex gap-3 overflow-x-auto border-y border-divider py-5">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-body-sm ${filter === item ? "border-accent-green bg-accent-green-10 text-accent-green" : "border-divider text-text-muted"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <div>
        {visibleArticles.map((article) => (
          <NewsCard key={article.slug} article={article} horizontal />
        ))}
      </div>
      <p className="mt-10 text-center text-body-xs text-text-dim">
        Page 1 of 1
      </p>
    </section>
  );
}
