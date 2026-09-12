import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PartnerOrganizations from "@/components/PartnerOrganizations";

export const metadata: Metadata = {
  title: "Wildlife Detection | Eyeclimate",
  description:
    "Aerial AI for accurate, scalable wildlife detection and population monitoring.",
};

const users = [
  [
    "01",
    "Conservation & protection",
    "Aerial multi-species detection for parks, reserves, and endangered species monitoring programs.",
    "PARKS · RESERVES · ENDANGERED",
  ],
  [
    "02",
    "Academic research",
    "Transformer-based detection for ecological surveys, population dynamics, and behavioral studies at scale.",
    "ECOLOGY · WACV · OPEN",
  ],
  [
    "03",
    "Land management",
    "Continuous survey coverage for park rangers, ecosystem managers, and public-land agencies.",
    "RANGERS · AGENCIES · ECOSYSTEMS",
  ],
  [
    "04",
    "Rangeland & livestock",
    "CattleMapper — the WildlifeMapper specialization — for population counts on grazing land.",
    "RANCHING · LIVESTOCK · DRONE",
  ],
];

export default function WildlifeDetectionPage() {
  return (
    <>
      <section className="relative min-h-home-hero overflow-hidden">
        <Image
          src="/figma/wildlife-product-landing/hero-elephant.webp"
          alt="Elephant in its natural habitat"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-home-globe-overlay" />
        <div className="site-container relative flex min-h-home-hero items-center py-20">
          <div className="max-w-home-copy">
            <p className="text-caption uppercase tracking-caption text-accent-green">
              Product · WildlifeMapper
            </p>
            <h1 className="mt-6 text-home-mobile font-semibold italic leading-hero tracking-display md:text-home-desktop">
              <span className="not-italic text-text-primary">
                See every animal.
              </span>
              <br />
              <span className="text-accent-green">From the air.</span>
            </h1>
            <p className="mt-7 text-body-lg leading-body text-text-muted">
              AI-powered wildlife and cattle monitoring from aerial imagery. For
              conservation organizations, researchers, and land managers who
              need accuracy at scale.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex h-12 items-center rounded-md bg-accent-green px-7 text-body-sm font-semibold text-text-inverse"
            >
              Request a demo&nbsp; →
            </Link>
          </div>
        </div>
        <div className="site-container relative grid grid-cols-2 gap-6 border-t border-divider py-7 md:grid-cols-4">
          {[
            ["30k+", "Animals identified"],
            ["200", "km² surveyed"],
            ["Multi", "Species detection"],
            ["CVPR", "Peer-reviewed"],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="text-h3 font-semibold">{value}</p>
              <p className="mt-1 text-label uppercase tracking-label text-text-dim">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="site-container py-section-mobile lg:py-section-desktop">
        <p className="text-caption font-semibold uppercase tracking-caption text-accent-green">
          01&nbsp; / &nbsp;Overview
        </p>
        <h2 className="mt-6 text-h2-mobile font-semibold tracking-heading md:text-product-section">
          Aerial AI for every animal.
        </h2>
        <p className="mt-7 max-w-case-intro text-body-lg leading-body text-text-muted">
          Eyeclimate helps conservation organizations, researchers, and land
          managers detect and identify animals at scale — using
          transformer-based models built for aerial survey imagery.
        </p>
        <p className="mt-12 text-h3-mobile font-semibold leading-heading md:text-h3">
          Built for <em className="text-accent-green">accuracy</em>,{" "}
          <em className="text-accent-green">scalability</em>, and{" "}
          <em className="text-accent-green">real-world impact</em>.
        </p>
      </section>

      <section className="border-y border-divider">
        <div className="site-container space-y-16 py-section-mobile lg:py-section-desktop">
          <ProductRow
            image="/figma/wildlife-product-landing/wildlifemapper-visual.webp"
            alt="Wildebeest herd viewed during an aerial survey"
            eyebrow="02 · WildlifeMapper"
            title="Multi-species detection."
            copy="Detect and identify multiple wildlife species from aerial imagery with transformer-based precision. Built for large-scale surveys, not individual sightings."
            specs={[
              ["Model", "Transformer-based"],
              ["Input", "Aerial survey imagery"],
              ["Capability", "Multi-species detection"],
            ]}
            cta="Read the CVPR paper →"
          />
          <ProductRow
            image="/figma/wildlife-product-landing/cattlemapper-visual.webp"
            alt="Herd counted from aerial imagery"
            eyebrow="03 · CattleMapper"
            title="Every head, counted."
            subhead="A WildlifeMapper specialization for livestock."
            copy="Track cattle populations at scale using drone imagery and AI built for rangeland and livestock management."
            specs={[
              ["Platform", "Drone imagery"],
              ["Output", "Population counts"],
              ["Built for", "Rangeland · Livestock"],
            ]}
            cta="See CattleMapper in action →"
            reverse
          />
        </div>
      </section>

      <section className="site-container py-section-mobile lg:py-section-desktop">
        <p className="text-label font-semibold uppercase tracking-label text-accent-green">
          04&nbsp; / &nbsp;Featured deployment
        </p>
        <h2 className="mt-6 text-h2-mobile font-semibold tracking-heading md:text-product-section">
          Proven at the Mara.
        </h2>
        <p className="mt-4 max-w-case-intro text-body-lg leading-body text-text-muted">
          The WildlifeMapper transformer architecture — the largest deployment
          of aerial
          <br className="hidden md:block" /> wildlife survey AI to date.
        </p>
        <div className="deployment-card mt-8 grid overflow-hidden rounded-xl border border-divider bg-bg-card p-7 md:mt-5 md:grid-cols-5 md:p-10">
          <div className="flex min-h-feature-copy flex-col border-divider md:col-span-3 md:border-r md:pr-10">
            <div className="flex flex-wrap gap-3">
              <span className="rounded bg-accent-green-14 px-4 py-2 text-label font-semibold uppercase tracking-label text-accent-green">
                WACV · 2023
              </span>
              <span className="rounded bg-divider px-4 py-2 text-label font-semibold uppercase tracking-label">
                Real-world deployment
              </span>
            </div>
            <h3 className="mt-7 max-w-feature-copy text-h4 font-semibold leading-heading md:text-h3">
              WildlifeMapper: A transformer-based detection model for aerial
              wildlife survey imagery
            </h3>
            <div className="mt-auto pt-12">
              <p className="text-body-sm text-text-muted">
                S. Kumar et al.&nbsp; · &nbsp;UC Santa Barbara &amp; Stanford
              </p>
              <div className="my-4 h-px bg-divider" />
              <p className="text-body-sm leading-body text-text-muted">
                Cross-platform AI identified 30,000+ individual animals across a
                200 km² survey area in the Maasai Mara — the largest
                WildlifeMapper deployment to date.
              </p>
              <Link
                href="/news/wildlifemapper-maasai-mara-survey"
                className="mt-6 inline-block text-body-sm font-semibold text-accent-green"
              >
                Read paper&nbsp; →
              </Link>
            </div>
          </div>
          <div className="relative mt-10 md:col-span-2 md:mt-0 md:pl-10">
            <p className="text-label font-semibold uppercase tracking-label text-accent-green">
              Key result
            </p>
            <p className="mt-8 text-key-result font-semibold leading-none tracking-display">
              30k+
            </p>
            <p className="mt-3 text-body font-semibold">
              Individual animals identified
            </p>
            <p className="mt-2 text-body-sm leading-body text-text-muted">
              Across a 200 km² survey area in the Maasai Mara. The largest
              WildlifeMapper deployment to date.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-5 border-t border-divider pt-6">
              {[
                ["200", "km² surveyed"],
                ["Multi", "Species"],
                ["1st", "Of its scale"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-h4 font-semibold text-accent-green">
                    {value}
                  </p>
                  <p className="mt-2 text-label uppercase tracking-label text-text-dim">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-divider bg-bg-section-alt">
        <div className="site-container py-section-mobile lg:py-section-desktop">
          <p className="text-caption font-semibold uppercase tracking-caption text-accent-green">
            05&nbsp; · &nbsp;Applications
          </p>
          <h2 className="mt-7 text-h2-mobile font-semibold tracking-heading md:text-product-section">
            Who uses it.
          </h2>
          <p className="mt-4 text-body-lg leading-body text-text-muted">
            Four audiences deploying WildlifeMapper today.
          </p>
          <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
            {users.map(([number, title, copy, tags]) => (
              <article
                key={title}
                className="flex min-h-deployment-card flex-col rounded-xl border border-divider bg-bg-card p-6"
              >
                <p className="text-body-xs font-medium text-text-dim">
                  {number}
                </p>
                <p className="mt-3 text-label font-semibold uppercase tracking-label text-accent-green">
                  Use case
                </p>
                <h3 className="mt-5 text-h4 font-semibold leading-heading">
                  {title}
                </h3>
                <p className="mt-10 text-body-sm leading-body text-text-muted">
                  {copy}
                </p>
                <div className="mt-auto pt-6">
                  <div className="h-px bg-divider" />
                  <p className="mt-4 text-tiny font-medium uppercase tracking-label text-text-dim">
                    {tags}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="border-y border-divider bg-bg-section-alt">
        <div className="site-container py-cta-mobile text-center md:py-cta-desktop">
          <h2 className="text-h2-mobile font-normal md:text-h2">
            Let&apos;s solve <span className="text-accent-green">your</span>{" "}
            hardest problem
          </h2>
          <p className="mx-auto mt-6 max-w-cta-copy text-body text-text-muted">
            Bring us a landscape, a species, or a survey challenge. We&apos;ll
            show you what is possible.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-accent-green px-7 text-body-sm font-medium text-text-inverse"
          >
            Book a demo&nbsp; →
          </Link>
          <PartnerOrganizations />
        </div>
      </section>
    </>
  );
}

function ProductRow({
  image,
  alt,
  eyebrow,
  title,
  subhead,
  copy,
  specs,
  cta,
  reverse = false,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  subhead?: string;
  copy: string;
  specs: string[][];
  cta: string;
  reverse?: boolean;
}) {
  return (
    <article className="grid items-center gap-12 md:grid-cols-2">
      <div
        className={`relative min-h-feature-image overflow-hidden rounded-xl ${reverse ? "md:order-2" : ""}`}
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div>
        {reverse && (
          <span className="mb-4 inline-block rounded border border-border-accent bg-accent-green-10 px-4 py-2 text-label font-semibold uppercase tracking-label text-accent-green">
            Built on WildlifeMapper
          </span>
        )}
        <p className="text-caption font-semibold uppercase tracking-caption text-accent-green">
          {eyebrow}
        </p>
        <h2 className="mt-5 text-h3-mobile font-semibold tracking-heading md:text-h2">
          {title}
        </h2>
        {subhead && (
          <p className="mt-5 text-h5 font-semibold italic text-accent-green">
            {subhead}
          </p>
        )}
        <p className="mt-7 max-w-contact-copy text-body-lg leading-body text-text-muted">
          {copy}
        </p>
        <dl className="mt-10 divide-y divide-divider">
          {specs.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-6 py-3">
              <dt className="text-label font-semibold uppercase tracking-label text-text-dim">
                {label}
              </dt>
              <dd className="text-right text-body-sm font-medium">{value}</dd>
            </div>
          ))}
        </dl>
        <Link
          href="/contact"
          className="mt-8 inline-block text-body-sm font-semibold text-accent-green"
        >
          {cta}
        </Link>
      </div>
    </article>
  );
}
