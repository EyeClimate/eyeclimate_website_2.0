import Image from "next/image";
import Link from "next/link";
import type { NewsArticle } from "@/lib/news";

export default function NewsCard({
  article,
  horizontal = false,
}: {
  article: NewsArticle;
  horizontal?: boolean;
}) {
  return (
    <article
      className={
        horizontal
          ? "grid gap-6 border-b border-divider py-7 md:grid-cols-news-row md:items-center"
          : ""
      }
    >
      <Link
        href={`/news/${article.slug}`}
        className={
          horizontal
            ? "news-row-ratio relative block overflow-hidden rounded-lg"
            : "news-card-ratio relative block overflow-hidden rounded-lg"
        }
      >
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes={
            horizontal
              ? "180px"
              : "(min-width: 1280px) 400px, (min-width: 768px) 33vw, calc(100vw - 40px)"
          }
          className="object-cover"
        />
      </Link>
      <div className={horizontal ? "" : "pt-5"}>
        <div className="flex items-center gap-3 text-tiny">
          <span className="rounded-full border border-border-accent px-3 py-1 uppercase tracking-caption text-accent-green">
            {article.category}
          </span>
          <span className="text-text-dim">{article.date}</span>
        </div>
        <h2 className="mt-3 text-h5 font-normal leading-heading">
          <Link href={`/news/${article.slug}`}>{article.title}</Link>
        </h2>
        <p className="mt-2 text-body-sm leading-body text-text-muted">
          {article.excerpt}
        </p>
        {horizontal && (
          <p className="mt-3 text-tiny text-text-dim">
            {article.author}&nbsp; · &nbsp;{article.readTime}
          </p>
        )}
      </div>
      {horizontal && (
        <Link
          href={`/news/${article.slug}`}
          aria-label={`Read ${article.title}`}
          className="hidden size-10 items-center justify-center rounded-full border border-divider text-text-muted md:flex"
        >
          →
        </Link>
      )}
    </article>
  );
}
