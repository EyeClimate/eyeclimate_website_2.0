import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewsCard from "@/components/NewsCard";
import CopyLinkButton from "@/components/CopyLinkButton";
import PublishedArticlePage from "@/components/PublishedArticlePage";
import { articles, getArticle } from "@/lib/news";
import { getPublishedArticle } from "@/lib/supabase/articles";
import { getAbsoluteUrl, getSiteUrl } from "@/lib/site-url";

export const revalidate = 300;

function createArticleMetadata({
  title,
  description,
  slug,
  image,
  publishedTime,
}: {
  title: string;
  description: string;
  slug: string;
  image?: string | null;
  publishedTime?: string | null;
}): Metadata {
  const pageTitle = `${title} | Eyeclimate`;
  const url = `${getSiteUrl()}/news/${slug}`;
  const images = image
    ? [
        {
          url: getAbsoluteUrl(image),
          width: 1200,
          height: 675,
          alt: title,
        },
      ]
    : [];

  return {
    title: pageTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "Eyeclimate",
      title: pageTitle,
      description,
      images,
      publishedTime: publishedTime || undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: pageTitle,
      description,
      images: image ? [getAbsoluteUrl(image)] : [],
    },
  };
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const databaseArticle = await getPublishedArticle(slug);
  if (databaseArticle)
    return createArticleMetadata({
      title: databaseArticle.title,
      description: databaseArticle.excerpt,
      slug: databaseArticle.slug,
      image: databaseArticle.cover_image_url,
      publishedTime: databaseArticle.published_at,
    });
  const article = getArticle(slug);
  if (!article) return {};
  const image =
    article.slug === "air-quality-intelligence-new-delhi"
      ? "/figma/article-template/hero-map-screenshot.webp"
      : article.image;
  return createArticleMetadata({
    title: article.title,
    description: article.excerpt,
    slug: article.slug,
    image,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const databaseArticle = await getPublishedArticle(slug);
  if (databaseArticle)
    return <PublishedArticlePage article={databaseArticle} />;
  const article = getArticle(slug);
  if (!article) notFound();
  const related = articles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);
  const articleUrl = `${getSiteUrl()}/news/${article.slug}`;
  const heroImage =
    article.slug === "air-quality-intelligence-new-delhi"
      ? "/figma/article-template/hero-map-screenshot.webp"
      : article.image;
  const isDelhi = article.slug === "air-quality-intelligence-new-delhi";

  return (
    <article>
      <header className="site-container max-w-article py-12 md:py-16">
        <Link
          href="/news"
          className="text-body-xs uppercase tracking-label text-text-muted"
        >
          ← Back to news
        </Link>
        <div className="mt-10 flex items-center gap-3 text-tiny">
          <span className="rounded-full border border-border-accent px-3 py-1 uppercase tracking-caption text-accent-green">
            {article.category}
          </span>
          <span className="text-text-dim">
            {article.date}&nbsp; · &nbsp;{article.readTime}
          </span>
        </div>
        <h1 className="mt-6 text-case-mobile font-normal leading-hero tracking-display md:text-case-desktop">
          {article.title}
        </h1>
        <p className="mt-6 max-w-case-intro text-body-lg leading-body text-text-muted">
          {article.excerpt}
        </p>
        <div className="mt-8 flex items-center justify-between border-b border-divider pb-7">
          <div className="flex items-center gap-4">
            <div className="relative size-11 overflow-hidden rounded-full">
              <Image
                src="/figma/article-template/author-avatar.webp"
                alt={article.author}
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-body-sm">{article.author}</p>
              <p className="text-body-xs text-text-dim">
                Research &amp; product team
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CopyLinkButton />
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Share on LinkedIn"
              className="flex size-10 items-center justify-center rounded-full border border-divider text-body-xs font-medium text-text-muted transition-colors hover:text-text-primary"
            >
              in
            </a>
            <a
              href={`https://x.com/intent/post?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Share on X"
              className="flex size-10 items-center justify-center rounded-full border border-divider text-body-sm text-text-muted transition-colors hover:text-text-primary"
            >
              𝕏
            </a>
          </div>
        </div>
      </header>

      <div className="site-container max-w-article">
        <div className="article-hero-ratio relative overflow-hidden rounded-xl">
          <Image
            src={heroImage}
            alt={article.title}
            fill
            preload
            sizes="(min-width: 1024px) 920px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="site-container grid max-w-article gap-12 py-section-mobile lg:grid-cols-article lg:py-section-desktop">
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-3 text-body-xs text-text-dim">
            <p className="uppercase tracking-label">In this article</p>
            <Link
              href="#why"
              className="block transition-colors hover:text-text-primary"
            >
              {isDelhi ? "Why New Delhi" : "Why now"}
            </Link>
            <Link
              href="#approach"
              className="block transition-colors hover:text-text-primary"
            >
              How it works
            </Link>
            <Link
              href="#results"
              className="block transition-colors hover:text-text-primary"
            >
              Early results
            </Link>
            <Link
              href="#next"
              className="block transition-colors hover:text-text-primary"
            >
              What’s next
            </Link>
          </div>
        </aside>
        <div className="space-y-14">
          <section id="why">
            <p className="text-body-lg leading-body text-text-muted">
              Earth observation is moving from occasional snapshots to
              operational intelligence. The challenge is no longer collecting
              data—it is turning large, noisy datasets into decisions that teams
              can act on quickly and confidently.
            </p>
            <p className="mt-6 text-body-lg leading-body text-text-muted">
              This update brings our research pipeline into a real deployment
              context, combining rigorous validation with practical workflows
              for operators, researchers, and conservation teams.
            </p>
          </section>
          <section id="approach">
            <h2 className="text-h3-mobile font-normal md:text-h3">
              {isDelhi ? "Why New Delhi" : "Why now"}
            </h2>
            <p className="mt-6 text-body leading-body text-text-muted">
              {isDelhi
                ? "New Delhi’s air-quality challenge is shaped by many overlapping sources: traffic, construction, industry, seasonal burning, and regional transport. The pilot brings satellite observations, street-level measurements, and emissions modelling into one operational view."
                : "Modern sensors create more information than teams can review manually. Eyeclimate applies domain-specific models to identify the signals that matter, preserve traceability, and surface evidence with the context required for action."}
            </p>
            <blockquote className="mt-7 border-l-2 border-accent-green bg-bg-card p-7 text-body-lg leading-body">
              “The goal is not another dashboard. It is trustworthy evidence
              that shortens the distance between observation and response.”
            </blockquote>
          </section>
          <section>
            <h2 className="text-h3-mobile font-normal md:text-h3">
              How the system works
            </h2>
            <ul className="mt-6 divide-y divide-divider border-y border-divider">
              {[
                "Ingest and normalize multi-source observations",
                "Detect candidate events with product-specific models",
                "Validate confidence against known environmental conditions",
                "Package results for review, reporting, and follow-up action",
              ].map((item, index) => (
                <li
                  key={item}
                  className="flex gap-6 py-5 text-body text-text-muted"
                >
                  <span className="text-accent-green">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section id="results">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-divider bg-figure">
              <Image
                src="/figma/article-template/fig2-heatmap.webp"
                alt="Earth observation analysis example"
                fill
                sizes="800px"
                className="object-cover"
              />
            </div>
            <h2 className="mt-10 text-h3-mobile font-normal md:text-h3">
              Early results
            </h2>
            <div className="mt-7 grid gap-px overflow-hidden rounded-xl border border-divider bg-divider sm:grid-cols-3">
              {[
                ["3×", "Faster review"],
                ["91%", "Validated precision"],
                ["2 min", "Typical processing"],
              ].map(([value, label]) => (
                <div key={label} className="bg-bg-page p-6">
                  <p className="text-h3 text-accent-green">{value}</p>
                  <p className="mt-2 text-body-sm text-text-muted">{label}</p>
                </div>
              ))}
            </div>
          </section>
          <section id="next">
            <h2 className="text-h3-mobile font-normal md:text-h3">
              What’s next
            </h2>
            <p className="mt-6 text-body leading-body text-text-muted">
              We are expanding validation with partners and incorporating
              feedback directly into the next product release. Future updates
              will share new field results, model benchmarks, and the
              operational lessons learned along the way.
            </p>
          </section>
        </div>
      </div>

      <section className="border-y border-divider">
        <div className="site-container max-w-article py-14">
          <div className="flex max-w-author gap-5">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/figma/article-template/author-avatar.webp"
                alt="Satish Kumar"
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-label uppercase tracking-label text-text-dim">
                Written by
              </p>
              <h2 className="mt-2 text-body-lg font-medium">Satish Kumar</h2>
              <p className="mt-1 text-body-sm text-accent-green">
                Founder &amp; CEO · Eyeclimate
              </p>
              <p className="mt-4 text-body-sm leading-body text-text-muted">
                Satish leads Eyeclimate&apos;s research and product direction.
                His work focuses on remote sensing, hyperspectral imaging, and
                computer vision for environmental monitoring.
              </p>
              <div className="mt-4 flex flex-wrap gap-5 text-body-xs text-text-muted">
                <Link href="/newsroom">More articles</Link>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a
                  href="https://scholar.google.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Google Scholar
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="site-container py-section-mobile lg:py-section-desktop">
          <p className="text-label uppercase tracking-label text-text-dim">
            Continue reading
          </p>
          <h2 className="mt-4 text-h3-mobile font-normal md:text-h3">
            More from the team
          </h2>
          <div className="mt-9 grid gap-10 md:grid-cols-3">
            {related.map((item) => (
              <NewsCard key={item.slug} article={item} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/newsroom"
              className="inline-flex h-11 items-center rounded-full border border-divider px-6 text-body-sm"
            >
              View all news&nbsp; →
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
