import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PartnerOrganizations from "@/components/PartnerOrganizations";

export const metadata: Metadata = {
  title: "MethaneMapper | Eyeclimate",
  description:
    "Multi-scale methane intelligence across satellite, airborne, and ground sensing.",
};

const deployments = [
  [
    "01",
    "Oil and gas monitoring",
    "Detect, localize, and quantify methane emissions across upstream, midstream, and downstream infrastructure.",
    "LIDAR · UPSTREAM · PIPELINE",
  ],
  [
    "02",
    "Climate and ESG reporting",
    "Transparent methane accounting and emissions disclosure with scalable, third-party-ready sensing.",
    "GHG PROTOCOL · DISCLOSURE",
  ],
  [
    "03",
    "Environmental compliance",
    "Faster response times for regulatory and voluntary methane reduction programs at facility and network scale.",
    "EPA · ISO · VOLUNTARY",
  ],
  [
    "04",
    "Research and innovation",
    "Advanced plume analysis with state-of-the-art transformer-based remote sensing methods and open benchmarks.",
    "CVPR · IGARSS · OPEN",
  ],
];

export default function MethaneMapperPage() {
  return (
    <>
      <section className="relative min-h-home-hero overflow-hidden">
        <Image
          src="/figma/methane-product-landing/hero-pipeline-aerial.webp"
          alt="Methane monitoring landscape"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-home-globe-overlay" />
        <div className="site-container relative flex min-h-home-hero items-center py-20">
          <div className="max-w-home-copy">
            <p className="text-caption uppercase tracking-caption text-accent-green">
              Product · MethaneMapper
            </p>
            <h1 className="mt-6 text-home-mobile font-semibold italic leading-hero tracking-display md:text-home-desktop">
              <span className="not-italic text-text-primary">See methane.</span>
              <br />
              <span className="text-accent-green">At every scale.</span>
            </h1>
            <p className="mt-7 text-body-lg leading-body text-text-muted">
              From satellite screening to site-level quantification. The
              multi-modal detection stack used by operators, regulators, and
              researchers worldwide.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex h-12 items-center rounded-md bg-accent-green px-7 text-body-sm font-semibold text-text-inverse"
            >
              Book a demo&nbsp; →
            </Link>
          </div>
        </div>
        <div className="site-container relative grid grid-cols-2 gap-6 border-t border-divider py-7 md:grid-cols-4">
          {[
            ["426", "Spectral bands"],
            ["25 km", "Flight line"],
            ["<4 min", "Processing time"],
            ["30–250", "kg/h detected"],
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
        <h2 className="mt-6 max-w-case-title text-h2-mobile font-semibold tracking-heading md:text-product-section">
          One Platform, Multiple Sensing Modalities.
        </h2>
        <p className="mt-7 max-w-case-intro text-body-lg leading-body text-text-muted">
          Eyeclimate&apos;s methane detection portfolio is designed to work
          across the full monitoring stack.
        </p>
        <p className="mt-12 max-w-feature-copy text-h3-mobile font-semibold leading-heading md:text-h3">
          This multi-scale approach helps operators, regulators, and climate
          stakeholders move from{" "}
          <em className="text-accent-green">detection</em> to{" "}
          <em className="text-accent-green">verification</em> to{" "}
          <em className="text-accent-green">action.</em>
        </p>
      </section>

      <section className="border-y border-divider">
        <div className="site-container space-y-16 py-section-mobile lg:py-section-desktop">
          <SensingRow
            image="/figma/methane-product-landing/spaceborne-visual.webp"
            eyebrow="01 · Spaceborne"
            title="Detection from space."
            copy="Detect and quantify methane plumes directly from Sentinel-2 imagery. No time-series comparison, no baseline required."
            specs={[
              ["Sensor", "Sentinel-2 · 12 bands"],
              ["Approach", "End-to-end transformer"],
              ["Coverage", "Regional → Global"],
            ]}
            cta="Read Methane SatMapper →"
          />
          <SensingRow
            image="/figma/methane-product-landing/airborne-visual.webp"
            eyebrow="02 · Airborne"
            title="Detection from the air."
            copy="MethaneMapper — our transformer for airborne hyperspectral imagery, trained on thousands of real plume annotations."
            specs={[
              ["Platforms", "Airplane · Stratospheric · Drone"],
              ["Model", "MethaneMapper transformer"],
              ["Trained on", "1000s of real plumes"],
            ]}
            cta="Read MethaneMapper + 2 papers →"
            reverse
          />
          <SensingRow
            image="/figma/methane-product-landing/ground-visual.webp"
            eyebrow="03 · Ground"
            title="Site-level detection."
            copy="OGI cameras and laser sensors — sensitive to leaks down to 10 g/h, with precise flow-rate estimation on operating sites."
            specs={[
              ["Sensors", "Thermal OGI · Laser"],
              ["Sensitivity", "10 g/h emissions"],
              ["Output", "Flow-rate + detection"],
            ]}
            cta="Read EyeMethane →"
          />
        </div>
      </section>

      <section className="site-container py-section-mobile lg:py-section-desktop">
        <p className="text-caption font-semibold uppercase tracking-caption text-accent-green">
          04&nbsp; · &nbsp;Applications
        </p>
        <h2 className="mt-7 text-h2-mobile font-semibold tracking-heading md:text-product-section">
          Where it works.
        </h2>
        <p className="mt-4 text-body-lg leading-body text-text-muted">
          Four operational contexts where MethaneMapper is deployed today.
        </p>
        <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          {deployments.map(([number, title, copy, tags]) => (
            <article
              key={title}
              className="flex min-h-deployment-card flex-col rounded-xl border border-divider bg-bg-card p-6"
            >
              <p className="text-body-xs font-medium text-text-dim">{number}</p>
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
      </section>
      <section className="border-y border-divider bg-bg-section-alt">
        <div className="site-container py-cta-mobile text-center md:py-cta-desktop">
          <h2 className="text-h2-mobile font-normal md:text-h2">
            Let&apos;s solve <span className="text-accent-green">your</span>{" "}
            hardest problem
          </h2>
          <p className="mx-auto mt-6 max-w-cta-copy text-body text-text-muted">
            Share a dataset or monitoring challenge. We&apos;ll show you what
            MethaneMapper can do.
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

function SensingRow({
  image,
  eyebrow,
  title,
  copy,
  specs,
  cta,
  reverse = false,
}: {
  image: string;
  eyebrow: string;
  title: string;
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
          alt={title}
          fill
          sizes="(min-width: 1280px) 620px, (min-width: 768px) 50vw, calc(100vw - 40px)"
          className="object-cover"
        />
      </div>
      <div>
        <p className="text-caption font-semibold uppercase tracking-caption text-accent-green">
          {eyebrow}
        </p>
        <h2 className="mt-5 text-h3-mobile font-semibold tracking-heading md:text-h2">
          {title}
        </h2>
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
