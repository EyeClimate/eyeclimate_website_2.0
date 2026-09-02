import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import { getPublishedArticles } from "@/lib/supabase/articles";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "News | Eyeclimate",
  description:
    "Field reports, product updates, research, and company news from Eyeclimate.",
};

export default async function NewsPage() {
  const published = await getPublishedArticles();
  const activeFeatured =
    published.find((article) => article.featured) ?? published[0];
  const recent = published
    .filter((article) => article.slug !== activeFeatured?.slug)
    .slice(0, 3);

  if (!activeFeatured) {
    return (
      <section className="site-container py-section-mobile lg:py-section-desktop">
        <p className="text-label uppercase tracking-label text-text-dim">
          News
        </p>
        <h1 className="mt-5 text-h2-mobile font-normal md:text-h2">
          Newsroom updates are coming soon.
        </h1>
        <p className="mt-4 max-w-hero-body text-body text-text-muted">
          Published articles from the Eyeclimate team will appear here.
        </p>
      </section>
    );
  }
  return (
    <>
      <section className="site-container py-10 md:py-16">
        <article className="news-feature-ratio relative overflow-hidden rounded-xl">
          <Image
            src={activeFeatured.image}
            alt={activeFeatured.title}
            fill
            preload
            sizes="(min-width: 1024px) 1176px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-news-feature-overlay" />
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <div className="max-w-feature-copy">
              <div className="flex items-center justify-center gap-3 text-tiny">
                <span className="rounded-full border border-border-accent px-3 py-1 uppercase tracking-caption text-accent-green">
                  Featured · {activeFeatured.category}
                </span>
                <span className="text-text-muted">{activeFeatured.date}</span>
              </div>
              <h1 className="mt-5 text-h2-mobile font-normal leading-hero tracking-heading md:text-h2">
                {activeFeatured.title}
              </h1>
              <p className="mx-auto mt-5 max-w-hero-body text-body-sm leading-body text-text-primary md:text-body">
                {activeFeatured.excerpt}
              </p>
              <Link
                href={`/news/${activeFeatured.slug}`}
                className="mt-7 inline-flex h-11 items-center rounded-full bg-text-inverse px-6 text-body-sm text-text-primary"
              >
                Read article&nbsp; →
              </Link>
            </div>
          </div>
        </article>
      </section>
      <section className="site-container pb-section-mobile pt-8 lg:pb-section-desktop">
        <p className="text-label uppercase tracking-label text-text-dim">
          News
        </p>
        <h2 className="mt-5 text-h3-mobile font-normal md:text-h3">
          More about <em className="font-normal text-accent-green">us.</em>
        </h2>
        <p className="mt-2 text-body-sm text-text-muted">
          News and updates from the team.
        </p>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {recent.map((article) => (
            <NewsCard key={article.slug} article={article} />
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link
            href="/newsroom"
            className="inline-flex h-11 items-center rounded-full border border-divider px-6 text-body-sm"
          >
            View more news&nbsp; →
          </Link>
        </div>
      </section>
    </>
  );
}
