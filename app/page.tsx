import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import InteractiveMethaneGlobe from "@/components/InteractiveMethaneGlobe";
import PartnerOrganizations from "@/components/PartnerOrganizations";
import { getPublishedArticles } from "@/lib/supabase/articles";
import { getPublishedPublications } from "@/lib/supabase/publications";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Eyeclimate — Earth observation intelligence",
  description:
    "AI-powered Earth observation for methane detection, wildlife monitoring, and decision-ready climate intelligence.",
  alternates: { canonical: "/" },
};

const greenButton =
  "inline-flex h-12 items-center rounded-full bg-accent-green px-7 text-body-sm font-medium text-text-inverse";

const methaneCards = [
  {
    title: "Spaceborne Methane Detection",
    copy: "For basin-scale methane surveillance, regional emissions monitoring, climate reporting and large infrastructure networks.",
    image: "/figma/landing/solutions/methane-small-a.webp",
    href: "/use-cases/methane-monitoring",
  },
  {
    title: "Aircraft, stratospheric, and drone-based sensing",
    copy: "Pipeline and infrastructure surveys, oil and gas field monitoring, drone-based inspection programs and rapid response emissions mapping.",
    image: "/figma/landing/solutions/methane-small-b.webp",
    href: "/use-cases/methane-detection",
  },
  {
    title: "Ground-Based Methane detection",
    copy: "Oil and gas production sites, compressor stations and processing facilities, inspections and continuous emissions programs.",
    image: "/figma/landing/solutions/methane-small-c.webp",
    href: "/use-cases/methane-detection",
  },
];

const values = [
  [
    "/figma/landing/how-it-works/icon-checklist.svg",
    "Field-Validated Models",
    "Tested on real methane leaks, air pollution, and wildlife surveys",
  ],
  [
    "/figma/landing/how-it-works/icon-award.svg",
    "Award-Winning Innovation",
    "Including UCSB New Venture Competition 2024",
  ],
  [
    "/figma/landing/how-it-works/icon-science.svg",
    "Peer-Reviewed Science",
    "Transparent methods that lead us to measurable impact",
  ],
  [
    "/figma/landing/how-it-works/icon-5plus.svg",
    "Years of Research experience",
    "Experience in satellite AI, climate analytics, and remote sensing",
  ],
];

export default async function HomePage() {
  const [publishedArticles, publishedPublications] = await Promise.all([
    getPublishedArticles(),
    getPublishedPublications(),
  ]);
  const latestArticles = publishedArticles.slice(0, 3);
  const selectedPublications = publishedPublications
    .filter((publication) => publication.is_selected)
    .slice(0, 5);
  return (
    <>
      <section className="home-starfield relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-home-starfield-overlay" />
        <div className="site-container relative grid min-w-0 min-h-home-hero items-center gap-10 overflow-hidden py-14 md:grid-cols-2 md:gap-6 md:overflow-visible md:py-0">
          <div className="min-w-0 max-w-home-copy">
            <h1 className="text-home-mobile font-normal leading-hero tracking-display md:text-home-desktop">
              Building Intelligence for{" "}
              <span className="text-accent-green">Earth Observation</span>
            </h1>
            <p className="mt-7 max-w-contact-copy text-body leading-body text-text-muted md:text-body-lg">
              We turn multi-modal data from different satellites and sensors into decision-ready actionable insights. Built by researchers, validated against real-world use cases.
            </p>
            <Link href="/contact" className={`${greenButton} mt-8`}>
              Book a demo&nbsp; →
            </Link>
          </div>
          <div className="relative aspect-square min-h-0 min-w-0 w-full max-w-full overflow-hidden md:overflow-visible">
            <InteractiveMethaneGlobe />
          </div>
        </div>
      </section>

      <section
        id="technology"
        className="site-container py-section-mobile lg:py-section-desktop"
      >
        <p className="text-label uppercase tracking-label text-text-dim">
          01 / <span className="text-accent-green">Solutions</span>
        </p>
        <h2 className="mt-6 text-center text-h2-mobile font-normal tracking-heading md:text-h2">
          One platform.{" "}
          <span className="text-text-muted">Multiple applications.</span>
        </h2>

        <div className="mt-16">
          <div className="flex items-end justify-between border-b border-divider pb-5">
            <h3 className="text-h4 font-normal">
              <span className="mr-5 text-body-sm text-accent-green">01</span>
              <Link
                href="/product/methanemapper"
                className="transition-colors hover:text-accent-green"
              >
                Methane Detection
              </Link>
            </h3>
            <p className="hidden max-w-contact-copy text-right text-body-sm text-text-muted md:block">
              Eyeclimate&apos;s methane detection portfolio is designed to work
              across the full monitoring stack.
            </p>
          </div>
          <article className="mt-8 overflow-hidden rounded-xl border border-divider bg-bg-card">
            <div className="home-wide-card relative">
              <Image
                src="/figma/landing/solutions/methane-big.webp"
                alt="Methane observations mapped from Earth observation data"
                fill
                sizes="(min-width: 1280px) 1280px, calc(100vw - 40px)"
                className="object-cover"
              />
            </div>
            <div className="p-7 md:p-10">
              <p className="text-h4">
                One Platform, Multiple Sensing Modalities
              </p>
              <p className="mt-4 max-w-case-intro text-body-sm leading-body text-text-muted">
                Eyeclimate&apos;s methane detection spans satellites for
                wide-area screening, airborne sensors for high-resolution
                mapping, and ground systems for site-level quantification. This
                multi-scale stack moves operators, regulators, and stakeholders
                from detection to verification to action.
              </p>
              <Link
                href="/product/methanemapper"
                className="mt-5 inline-block text-caption uppercase tracking-caption text-accent-green"
              >
                Explore MethaneMapper ↗
              </Link>
            </div>
          </article>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {methaneCards.map((card) => (
              <article
                key={card.title}
                className="overflow-hidden rounded-xl border border-divider bg-bg-card"
              >
                <div className="news-card-ratio relative">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(min-width: 1280px) 410px, (min-width: 768px) 33vw, calc(100vw - 40px)"
                    className="object-cover"
                  />
                </div>
                <div className="p-7">
                  <h4 className="text-h5 font-normal">{card.title}</h4>
                  <p className="mt-3 text-body-sm leading-body text-text-muted">
                    {card.copy}
                  </p>
                  <Link
                    href={card.href}
                    className="mt-5 inline-block text-caption uppercase tracking-caption text-accent-green"
                  >
                    Read case study →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <div className="flex items-end justify-between border-b border-divider pb-5">
            <h3 className="text-h4 font-normal">
              <span className="mr-5 text-body-sm text-accent-green">02</span>
              <Link
                href="/product/wildlifemapper"
                className="transition-colors hover:text-accent-green"
              >
                Wildlife Detection
              </Link>
            </h3>
            <p className="hidden text-body-sm text-text-muted md:block">
              Applications across satellite, airborne, and ground sensor data.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <article className="overflow-hidden rounded-xl border border-divider bg-bg-card">
              <div className="home-wildlife-main relative">
                <Image
                  src="/figma/landing/solutions/wildlife-big.webp"
                  alt="Elephant in a savanna habitat"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h4 className="text-h4">
                  <Link
                    href="/product/wildlifemapper"
                    className="transition-colors hover:text-accent-green"
                  >
                    Product · Wildlife Detection
                  </Link>
                </h4>
                <p className="mt-4 text-body-sm leading-body text-text-muted">
                  We help conservation organizations, researchers, and land
                  managers detect and identify animals at scale using advanced
                  transformer-based models built for aerial survey imagery. From
                  multi-species wildlife monitoring to cattle tracking.
                  Solutions designed for real-world accuracy.
                </p>
                <Link
                  href="/product/wildlifemapper"
                  className="mt-5 inline-block text-caption uppercase tracking-caption text-accent-green"
                >
                  Explore product ↗
                </Link>
              </div>
            </article>
            <div className="grid gap-6">
              <article className="overflow-hidden rounded-xl border border-divider bg-bg-card">
                <div className="home-wildlife-side-image relative">
                  <Image
                    src="/figma/landing/solutions/wildlife-small-a.webp"
                    alt="Wildebeest herd"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-7">
                  <h4 className="text-h5">WildlifeMapper</h4>
                  <p className="mt-3 text-body-sm text-text-muted">
                    Detect and identify multiple wildlife species from aerial
                    imagery with transformer-based precision.
                  </p>
                  <Link
                    href="/product/wildlifemapper"
                    className="mt-5 inline-block text-caption uppercase tracking-caption text-accent-green"
                  >
                    Explore product
                  </Link>
                </div>
              </article>
              <article className="overflow-hidden rounded-xl border border-divider bg-bg-card">
                <div className="home-wildlife-side-image relative">
                  <Image
                    src="/figma/landing/solutions/wildlife-small-b.webp"
                    alt="Cattle observed from the air"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-7">
                  <h4 className="text-h5">CattleMapper</h4>
                  <p className="mt-3 text-body-sm text-text-muted">
                    Track cattle populations at scale using drone imagery and AI
                    built for rangeland and livestock management.
                  </p>
                  <Link
                    href="/product/wildlifemapper"
                    className="mt-5 inline-block text-caption uppercase tracking-caption text-accent-green"
                  >
                    Explore product
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex items-end justify-between border-b border-divider pb-5">
            <h3 className="text-h4 font-normal">
              <span className="mr-5 text-body-sm text-accent-green">03</span>
              Coming soon
            </h3>
            <p className="text-body-sm text-text-muted">Our next product</p>
          </div>
          <article className="home-coming-soon relative mt-8 overflow-hidden rounded-xl border border-divider bg-bg-card">
            <Image
              src="/figma/landing/solutions/coming-soon-bg.webp"
              alt="Aurora over a dark landscape"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-coming-overlay" />
            <div className="relative max-w-contact-copy p-8 md:p-12">
              <span className="rounded bg-accent-green-14 px-3 py-2 text-label uppercase tracking-label text-accent-green">
                Coming soon
              </span>
              <h4 className="mt-7 text-h2-mobile font-semibold md:text-h2">
                The next lens
                <br />
                on our planet.
              </h4>
              <p className="mt-6 text-body leading-body text-text-muted">
                Something new is coming into focus. Our next product turns quiet
                signals in Earth observation data into decisions you can act on.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="border-y border-divider">
        <div className="site-container py-section-mobile lg:py-section-desktop">
          <p className="text-center text-label uppercase tracking-label text-text-dim">
            02 / <span className="text-accent-green">What we do</span>
          </p>
          <h2 className="mt-6 text-center text-h2-mobile font-normal md:text-h2">
            From raw signals to{" "}
            <span className="text-text-muted">decisions you can act on</span>
          </h2>
          <div className="mt-14 grid overflow-hidden rounded-xl border border-divider md:grid-cols-2">
            {[
              [
                "01",
                "Decision-ready outputs",
                "Counts, emissions, rankings, and alerts that plug directly into operations and reporting.",
                "/figma/landing/what-we-do/decision-ready-screenshot.webp",
              ],
              [
                "02",
                "Multi-scale coverage",
                "The same platform works from global overviews down to asset- or site-level detail.",
                "/figma/landing/what-we-do/multiscale-map.webp",
              ],
              [
                "03",
                "Seamless integrations",
                "Web dashboards, GIS layers, APIs, and exportable reports that fit your current tools and workflows.",
                "/figma/landing/what-we-do/decision-ready-screenshot.webp",
              ],
              [
                "04",
                "Science-backed",
                "Every product is grounded in peer-reviewed research and validated against ground truth.",
                "/figma/landing/what-we-do/science-paper-screenshot.webp",
              ],
            ].map(([number, title, copy, image]) => (
              <article
                key={number}
                className="border-b border-divider p-8 md:border-r"
              >
                <p className="text-body-xs text-accent-green">{number}</p>
                <h3 className="mt-6 text-h5">{title}</h3>
                <p className="mt-4 text-body-sm leading-body text-text-muted">
                  {copy}
                </p>
                {number === "03" ? (
                  <IntegrationDiagram />
                ) : (
                  <div className="home-what-image relative mt-8 overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={`${title} illustration`}
                      fill
                      sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, calc(100vw - 80px)"
                      className="object-cover"
                    />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container grid gap-14 py-section-mobile lg:grid-cols-2 lg:py-section-desktop">
        <div>
          <p className="text-label uppercase tracking-label text-text-dim">
            03 /{" "}
            <span className="text-accent-green">Mission &amp; Research</span>
          </p>
          <h2 className="mt-7 text-h2-mobile font-normal md:text-h2">
            Built on{" "}
            <em className="font-normal text-accent-green">peer-reviewed</em>{" "}
            science
          </h2>
          <p className="mt-8 text-body leading-body text-text-muted">
            Eyeclimate exists to close the gap between climate research and
            climate action. We believe the data already exists to make better
            decisions. What&apos;s missing is the infrastructure to turn raw
            observations into something operators, regulators, and
            conservationists can actually use.
          </p>
          <p className="mt-6 text-body leading-body text-text-muted">
            Our methods are published in the venues that matter and validated
            against ground truth.
          </p>
          <div className="mt-9 grid grid-cols-2 overflow-hidden rounded-xl border border-divider">
            {[
              ["300+", "Publications and patents"],
              ["11,000", "Citations"],
              ["10+ years", "Avg. research exp. per person"],
              ["Stanford / UCSB", "Startup"],
            ].map(([value, label]) => (
              <div key={label} className="border-b border-r border-divider p-6">
                <p className="text-h3-mobile">{value}</p>
                <p className="mt-2 text-label uppercase tracking-label text-text-dim">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex justify-between border-b border-divider pb-5">
            <p className="text-label uppercase tracking-label text-text-dim">
              Selected publications
            </p>
            <Link
              href="/about#publications"
              className="text-body-sm text-text-muted"
            >
              View all →
            </Link>
          </div>
          {selectedPublications.map((publication) => (
            <div
              key={publication.id}
              className="grid grid-cols-publication gap-4 border-b border-divider py-6"
            >
              <span className="text-body-sm text-accent-green">
                {new Date(
                  `${publication.publication_date}T00:00:00`,
                ).getFullYear()}
              </span>
              <a
                href={publication.publication_url}
                target="_blank"
                rel="noreferrer"
                className="text-body-sm transition-colors hover:text-accent-green"
              >
                {publication.title}
              </a>
              <p className="text-right text-h5 text-accent-green">
                {publication.citation_count}
                <span className="block text-tiny text-text-dim">cites</span>
              </p>
            </div>
          ))}
          {selectedPublications.length === 0 ? (
            <p className="border-b border-divider py-6 text-body-sm text-text-dim">
              Selected publications will appear here.
            </p>
          ) : null}
        </div>
      </section>

      <section className="border-y border-divider">
        <div className="site-container py-section-mobile lg:py-section-desktop">
          <div className="flex justify-between">
            <p className="text-label uppercase tracking-label text-text-dim">
              04 / <span className="text-accent-green">About us</span>
            </p>
            <Link
              href="/about"
              className="rounded-full bg-bg-card px-5 py-3 text-body-sm"
            >
              Meet the team ↗
            </Link>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-about-quote">
            <div className="flex items-center gap-4">
              <div className="relative size-20 overflow-hidden rounded-full">
                <Image
                  src="/images/team/satish-kumar.webp"
                  alt="Satish Kumar"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-body">Satish Kumar</p>
                <p className="text-body-xs text-text-dim">
                  Founder &amp; CEO
                  <br />
                  Remote sensing · AI · UCSB &amp; Stanford
                </p>
              </div>
            </div>
            <blockquote className="text-h3-mobile leading-heading md:text-h3">
              “We are researchers who can solve any problem in the context of
              environmental monitoring. Empiricists who can turn unsolved
              problems into unique, innovative and state of the art solutions
              backed by research.”
            </blockquote>
          </div>
        </div>
      </section>

      <section className="site-container py-section-mobile lg:py-section-desktop">
        <p className="text-label uppercase tracking-label text-text-dim">
          05 / <span className="text-accent-green">Why choose us</span>
        </p>
        <h2 className="mt-6 text-center text-h2-mobile font-normal md:text-h2">
          End-to-end.{" "}
          <span className="text-text-muted">Clean, ready to use data</span>
        </h2>
        <div className="mt-12 grid overflow-hidden rounded-xl border border-divider md:grid-cols-4">
          {values.map(([icon, title, copy]) => (
            <article
              key={title}
              className="flex flex-col items-center border-b border-divider p-8 text-center md:items-start md:border-r md:text-left"
            >
              <div className="relative size-12">
                <Image src={icon} alt="" fill sizes="48px" />
              </div>
              <h3 className="mt-7 text-body font-medium">{title}</h3>
              <p className="mt-3 text-body-xs leading-body text-text-muted">
                {copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-container py-section-mobile lg:py-section-desktop">
        <article className="grid gap-10 rounded-xl border border-divider bg-bg-card p-8 md:grid-cols-2 md:p-12">
          <div>
            <p className="text-caption uppercase tracking-caption text-accent-green">
              Featured use case · MethaneMapper
            </p>
            <h2 className="mt-7 text-h3-mobile font-normal leading-heading md:text-h3">
              Detecting and quantifying methane sources in a complex
              multi-emission site under high winds.
            </h2>
            <p className="mt-6 text-body-sm leading-body text-text-muted">
              Evaluating MethaneMapper on NASA JPL&apos;s AVIRIS-NG
              hyperspectral data — 426 spectral bands, 25 km flight line,
              multiple overlapping plumes, 4+ m/s winds.
            </p>
            <div className="mt-8 grid grid-cols-3 border-y border-divider py-5">
              <div>
                <p className="text-h5">426</p>
                <p className="text-tiny text-text-dim">Spectral bands</p>
              </div>
              <div>
                <p className="text-h5">
                  &lt;4<span className="text-body-xs">min</span>
                </p>
                <p className="text-tiny text-text-dim">Processing</p>
              </div>
              <div>
                <p className="text-h5">
                  30–250<span className="text-body-xs">kg/h</span>
                </p>
                <p className="text-tiny text-text-dim">Range detected</p>
              </div>
            </div>
            <Link
              href="/use-cases/methane-detection"
              className="mt-7 inline-flex h-11 items-center rounded-full border border-divider px-6 text-body-sm"
            >
              Read the full case&nbsp; →
            </Link>
          </div>
          <div className="relative min-h-feature-image overflow-hidden rounded-xl">
            <Image
              src="/figma/landing/featured-case/sunset-oilfield.webp"
              alt="Industrial landscape at sunrise"
              fill
              sizes="(min-width: 1280px) 620px, (min-width: 1024px) 50vw, calc(100vw - 40px)"
              className="object-cover"
            />
          </div>
        </article>
      </section>

      <section className="site-container py-section-mobile lg:py-section-desktop">
        <p className="text-label uppercase tracking-label text-text-dim">
          06 / <span className="text-accent-green">Latest</span>
        </p>
        <h2 className="mt-7 text-h2-mobile font-normal md:text-h2">
          News &amp; research.
        </h2>
        {latestArticles.length > 0 ? (
          <>
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              {latestArticles.map((article) => (
                <NewsCard key={article.slug} article={article} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/news"
                className="inline-flex h-11 items-center rounded-full border border-divider px-6 text-body-sm"
              >
                View more news&nbsp; →
              </Link>
            </div>
          </>
        ) : (
          <p className="mt-8 text-body text-text-muted">
            Published updates from the Eyeclimate team will appear here.
          </p>
        )}
      </section>

      <section className="border-y border-divider bg-bg-section-alt">
        <div className="site-container py-cta-mobile text-center md:py-cta-desktop">
          <h2 className="text-h2-mobile font-normal leading-hero md:text-home-desktop">
            Let&apos;s solve <span className="text-accent-green">your</span>{" "}
            hardest
            <br />
            problem
          </h2>
          <p className="mx-auto mt-7 max-w-cta-copy text-body leading-body text-text-muted">
            30 minutes with our team. Bring a dataset, a question, or just
            curiosity. We&apos;ll show you exactly what&apos;s possible.
          </p>
          <Link href="/contact" className={`${greenButton} mt-8`}>
            Book a demo&nbsp; →
          </Link>
          <PartnerOrganizations />
        </div>
      </section>
    </>
  );
}

function IntegrationDiagram() {
  const inputs = ["Satellite", "Airborne", "Ground"];
  const outputs = ["Dashboard", "GIS Layer", "REST API", "CSV / PDF"];

  return (
    <div
      className="home-what-image relative mt-8 overflow-hidden rounded-lg border border-divider bg-[#22262a] p-4 sm:p-6"
      role="img"
      aria-label="Satellite, airborne, and ground inputs processed by Eyeclimate into dashboard, GIS, API, and export outputs"
    >
      <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
        <div className="min-w-0">
          <p className="mb-3 text-tiny font-semibold uppercase tracking-label text-text-muted">
            Inputs
          </p>
          <div className="space-y-2">
            {inputs.map((input) => (
              <div
                key={input}
                className="flex h-9 items-center justify-center rounded-md border border-white/15 bg-white/[0.07] px-2 text-center text-tiny font-medium text-text-primary sm:h-10 sm:text-body-xs"
              >
                {input}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <span className="hidden tracking-[0.45em] text-text-dim sm:block">
            ···
          </span>
          <div className="flex size-20 shrink-0 items-center justify-center rounded-full border border-accent-green/60 bg-accent-green-14 sm:size-28">
            <div className="flex size-14 flex-col items-center justify-center rounded-full border-2 border-accent-green bg-accent-green/20 sm:size-20">
              <span className="text-body-xs font-semibold uppercase tracking-caption text-accent-green sm:text-body">
                Data
              </span>
              <span className="mt-1 text-[8px] tracking-label text-text-muted sm:text-tiny">
                eyeclimate
              </span>
            </div>
          </div>
          <span className="hidden tracking-[0.45em] text-text-dim sm:block">
            ···
          </span>
        </div>

        <div className="min-w-0">
          <p className="mb-3 text-tiny font-semibold uppercase tracking-label text-text-muted">
            Outputs
          </p>
          <div className="space-y-1.5">
            {outputs.map((output) => (
              <div
                key={output}
                className="flex h-8 items-center justify-center rounded-md border border-white/15 bg-white/[0.07] px-1 text-center text-[9px] font-medium text-text-primary sm:h-9 sm:px-2 sm:text-body-xs"
              >
                {output}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
