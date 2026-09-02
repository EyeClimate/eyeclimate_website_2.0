import Image from "next/image";
import Link from "next/link";

export type CaseSection = {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: string;
  figure?: { src: string; alt: string; caption: string };
  numbered?: string[];
};

export type CaseStudyData = {
  breadcrumb: string;
  tags: string[];
  title: string;
  intro: string;
  stats: { value: string; unit?: string; label: string }[];
  hero: { src: string; alt: string; caption?: string };
  sections: CaseSection[];
  resultsIntro: string;
  results: { eyebrow: string; value: string; unit?: string; copy: string }[];
  resultsOutro: string;
  ctaTitle: string;
  ctaCopy: string;
  related: {
    tag: string;
    title: string;
    meta: string;
    image: string;
    href: string;
  }[];
};

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag, index) => (
        <span
          key={tag}
          className={`rounded-full border px-4 py-2 text-label uppercase tracking-label ${index === 0 ? "border-accent-green text-accent-green" : "border-divider text-text-muted"}`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function CaseStudy({ data }: { data: CaseStudyData }) {
  return (
    <>
      <article>
        <header className="site-container py-12 md:py-16">
          <p className="text-body-sm text-text-dim">
            Use cases&nbsp; / &nbsp;{data.breadcrumb}
          </p>
          <div className="mt-12">
            <Tags tags={data.tags} />
          </div>
          <h1 className="mt-8 max-w-case-title text-case-mobile font-normal leading-hero tracking-display md:text-case-desktop">
            {data.title}
          </h1>
          <p className="mt-8 max-w-case-intro text-body-lg leading-body text-text-muted">
            {data.intro}
          </p>
          <div className="mt-14 grid grid-cols-2 border-y border-divider lg:grid-cols-4">
            {data.stats.map((stat) => (
              <div
                key={stat.label}
                className="border-divider p-6 even:border-l lg:border-l lg:first:border-l-0"
              >
                <p className="text-h3-mobile md:text-h3">
                  {stat.value}
                  <span className="ml-1 text-body text-text-muted">
                    {stat.unit}
                  </span>
                </p>
                <p className="mt-2 text-label uppercase tracking-label text-text-dim">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <div className="case-hero-ratio relative mt-14 overflow-hidden rounded-xl">
            <Image
              src={data.hero.src}
              alt={data.hero.alt}
              fill
              preload
              sizes="(min-width: 1280px) 1280px, calc(100vw - 40px)"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-case-image-overlay" />
            {data.hero.caption && (
              <p className="absolute bottom-5 left-6 text-label uppercase tracking-label text-text-muted">
                {data.hero.caption}
              </p>
            )}
          </div>
        </header>

        <div className="border-y border-divider">
          <div className="site-container py-8 lg:hidden">
            <p className="text-label uppercase tracking-label text-text-dim">
              Contents
            </p>
            <nav className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {data.sections.map((section) => (
                <Link
                  key={section.id}
                  href={`#${section.id}`}
                  className="whitespace-nowrap rounded-full border border-divider px-4 py-3 text-body-sm text-text-muted"
                >
                  <span className="mr-2 text-accent-green">
                    {section.number}
                  </span>
                  {section.title}
                </Link>
              ))}
              <Link
                href="#results"
                className="whitespace-nowrap rounded-full border border-divider px-4 py-3 text-body-sm text-text-muted"
              >
                <span className="mr-2 text-accent-green">04</span>Results
              </Link>
            </nav>
          </div>
        </div>

        <div className="site-container grid gap-16 py-section-mobile lg:grid-cols-case-content lg:py-section-desktop">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="border-b border-divider pb-4 text-label uppercase tracking-label text-text-dim">
                Contents
              </p>
              <nav className="mt-4 space-y-3">
                {data.sections.map((section) => (
                  <Link
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-body-sm text-text-muted hover:text-accent-green"
                  >
                    <span className="mr-4 text-text-dim">{section.number}</span>
                    {section.title}
                  </Link>
                ))}
                <Link
                  href="#results"
                  className="block text-body-sm text-text-muted hover:text-accent-green"
                >
                  <span className="mr-4 text-text-dim">04</span>Results
                </Link>
              </nav>
            </div>
          </aside>
          <div>
            {data.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 pb-20"
              >
                <header className="flex items-baseline gap-5 border-b border-divider pb-5">
                  <span className="text-body-sm text-accent-green">
                    {section.number}
                  </span>
                  <h2 className="text-h3-mobile font-normal tracking-heading md:text-h3">
                    {section.title}
                  </h2>
                </header>
                <div className="mt-7 space-y-6 text-body leading-body text-text-muted md:text-body-lg">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets && (
                  <ul className="mt-7 divide-y divide-divider border-y border-divider">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-5 py-5 text-body text-text-muted"
                      >
                        <span className="text-accent-green">→</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
                {section.callout && (
                  <p className="mt-7 rounded-r-lg border border-divider border-l-2 border-l-accent-green bg-bg-card p-8 text-body leading-body text-text-primary">
                    {section.callout}
                  </p>
                )}
                {section.figure && (
                  <figure className="mt-8 rounded-xl border border-divider bg-figure p-3 md:p-7">
                    <div className="case-figure-ratio relative overflow-hidden rounded-md bg-text-primary">
                      <Image
                        src={section.figure.src}
                        alt={section.figure.alt}
                        fill
                        sizes="(min-width: 1024px) 780px, 100vw"
                        className="object-contain"
                      />
                    </div>
                    <figcaption className="mt-4 text-center text-body-xs text-text-muted">
                      {section.figure.caption}
                    </figcaption>
                  </figure>
                )}
                {section.numbered && (
                  <ol className="mt-7 divide-y divide-divider border-y border-divider">
                    {section.numbered.map((item, index) => (
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
                  </ol>
                )}
              </section>
            ))}

            <section id="results" className="scroll-mt-28">
              <header className="flex items-baseline gap-5 border-b border-divider pb-5">
                <span className="text-body-sm text-accent-green">04</span>
                <h2 className="text-h3-mobile font-normal tracking-heading md:text-h3">
                  Results
                </h2>
              </header>
              <p className="mt-7 text-body leading-body text-text-muted md:text-body-lg">
                {data.resultsIntro}
              </p>
              <div className="mt-8 grid overflow-hidden rounded-xl border border-divider md:grid-cols-2">
                {data.results.map((result) => (
                  <div
                    key={result.eyebrow}
                    className="border-b border-divider p-8 md:border-r"
                  >
                    <p className="text-caption uppercase tracking-caption text-accent-green">
                      {result.eyebrow}
                    </p>
                    <p className="mt-5 text-h3-mobile md:text-h3">
                      {result.value}
                      <span className="ml-2 text-body text-text-muted">
                        {result.unit}
                      </span>
                    </p>
                    <p className="mt-3 text-body-sm leading-body text-text-muted">
                      {result.copy}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-body leading-body text-text-muted md:text-body-lg">
                {data.resultsOutro}
              </p>
            </section>
          </div>
        </div>
      </article>

      <section className="border-y border-divider py-cta-mobile text-center md:py-cta-desktop">
        <div className="site-container">
          <h2 className="mx-auto max-w-cta-title text-h3-mobile font-normal tracking-heading md:text-h2">
            {data.ctaTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-cta-copy text-body leading-body text-text-muted md:text-body-lg">
            {data.ctaCopy}
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-accent-green px-8 text-body-sm font-medium text-text-inverse"
          >
            Talk to us
          </Link>
        </div>
      </section>

      <section className="site-container py-section-mobile lg:py-section-desktop">
        <p className="text-label uppercase tracking-label text-text-dim">
          More use cases
        </p>
        <h2 className="mt-6 text-h3-mobile font-normal md:text-h3">
          Other applications of our research
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {data.related.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="overflow-hidden rounded-xl border border-divider bg-bg-card"
            >
              <div className="case-card-ratio relative">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(min-width: 1280px) 620px, (min-width: 768px) 50vw, calc(100vw - 40px)"
                  className="object-cover"
                />
              </div>
              <div className="p-7">
                <p className="text-caption uppercase tracking-caption text-accent-green">
                  {card.tag}
                </p>
                <h3 className="mt-3 text-h5 font-normal">{card.title}</h3>
                <p className="mt-2 text-body-sm text-text-muted">{card.meta}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
