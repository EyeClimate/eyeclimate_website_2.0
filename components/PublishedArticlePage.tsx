import Image from "next/image";
import Link from "next/link";
import CopyLinkButton from "@/components/CopyLinkButton";
import MarkdownRenderer, {
  getMarkdownHeadings,
} from "@/components/MarkdownRenderer";
import type { PublishedArticle } from "@/lib/supabase/articles";
import { getSiteUrl } from "@/lib/site-url";

export default function PublishedArticlePage({
  article,
}: {
  article: PublishedArticle;
}) {
  const date = article.published_at
    ? new Date(article.published_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";
  const readTime = Math.max(
    1,
    Math.ceil(article.body_markdown.split(/\s+/).length / 200),
  );
  const articleUrl = `${getSiteUrl()}/news/${article.slug}`;
  const headings = getMarkdownHeadings(article.body_markdown);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: article.cover_image_url || undefined,
    datePublished: article.published_at || undefined,
    dateModified: article.published_at || undefined,
    mainEntityOfPage: articleUrl,
    author: {
      "@type": "Person",
      name: article.author?.name || "Eyeclimate team",
    },
    publisher: {
      "@type": "Organization",
      name: "Eyeclimate",
      logo: {
        "@type": "ImageObject",
        url: `${getSiteUrl()}/images/brand/eyeclimate-logo.webp`,
      },
    },
  };
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <header className="site-container max-w-article py-10 md:py-14">
        <Link
          href="/news"
          className="inline-flex h-11 items-center rounded-full border border-divider px-6 text-body-sm text-text-muted"
        >
          ← Back to news
        </Link>
        <div className="mt-8 flex items-center gap-3 text-tiny">
          <span className="rounded-full border border-border-accent px-3 py-1 uppercase tracking-caption text-accent-green">
            {article.category}
          </span>
          <span className="text-text-dim">
            {date} · {readTime} min read
          </span>
        </div>
        <h1 className="mt-5 text-case-mobile font-normal leading-hero tracking-display md:text-case-desktop">
          {article.title}
        </h1>
        <p className="mt-5 max-w-case-intro text-body-lg leading-body text-text-muted">
          {article.excerpt}
        </p>
        <div className="mt-7 flex items-center justify-between border-b border-divider pb-6">
          <div className="flex items-center gap-4">
            {article.author?.photo_url && (
              <div className="relative size-11 overflow-hidden rounded-full">
                <Image
                  src={article.author.photo_url}
                  alt={article.author.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="text-body-sm">
                {article.author?.name || "Eyeclimate team"}
              </p>
              <p className="text-body-xs text-text-dim">
                {article.author?.title || "Research & product team"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CopyLinkButton />
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="flex size-10 items-center justify-center rounded-full border border-divider text-body-xs text-text-muted"
            >
              in
            </a>
          </div>
        </div>
      </header>
      {article.cover_image_url && (
        <div className="site-container max-w-article">
          <Image
            src={article.cover_image_url}
            alt={article.title}
            width={1200}
            height={675}
            preload
            className="h-auto w-full rounded-xl border border-divider object-cover"
          />
        </div>
      )}
      <div className="site-container grid max-w-article gap-12 py-12 lg:grid-cols-article md:py-16">
        <aside className="hidden lg:block">
          <nav
            aria-label="In this article"
            className="sticky top-28 space-y-3 text-body-xs text-text-dim"
          >
            <p className="uppercase tracking-label">In this article</p>
            {headings.length ? (
              headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className="block transition-colors hover:text-text-primary"
                >
                  {heading.text}
                </a>
              ))
            ) : (
              <p className="leading-body">
                Add ## headings to create navigation.
              </p>
            )}
          </nav>
        </aside>
        <div className="min-w-0">
          <MarkdownRenderer content={article.body_markdown} />
        </div>
      </div>
      {article.author && (
        <section className="border-y border-divider">
          <div className="site-container max-w-article py-10">
            <div className="flex max-w-author gap-5">
              {article.author.photo_url && (
                <div className="relative size-14 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={article.author.photo_url}
                    alt={article.author.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="text-label uppercase tracking-label text-text-dim">
                  Written by
                </p>
                <h2 className="mt-2 text-body-lg font-medium">
                  {article.author.name}
                </h2>
                <p className="mt-1 text-body-sm text-accent-green">
                  {article.author.title}
                </p>
                {article.author.description && (
                  <p className="mt-3 text-body-sm leading-body text-text-muted">
                    {article.author.description}
                  </p>
                )}
                <div className="mt-4 flex gap-5 text-body-xs text-text-muted">
                  {article.author.linkedin_url && (
                    <a
                      href={article.author.linkedin_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                  )}
                  {article.author.google_scholar_url && (
                    <a
                      href={article.author.google_scholar_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Google Scholar
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
