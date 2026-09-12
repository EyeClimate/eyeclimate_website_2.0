import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import { getPublishedPublications } from "@/lib/supabase/publications";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About us | Eyeclimate",
  description:
    "Meet the people behind Eyeclimate and learn how our research became actionable climate intelligence.",
};

const values = [
  {
    icon: "/figma/about-us/icon-science.svg",
    title: "Science First",
    copy: "Every product is grounded in transparent, peer-reviewed methods.",
  },
  {
    icon: "/figma/about-us/icon-collaboration.svg",
    title: "Collaboration",
    copy: "Climate solutions require networks, not silos.",
  },
  {
    icon: "/figma/about-us/icon-integrity.svg",
    title: "Integrity & Openness",
    copy: "We prioritize traceable data and trustworthy results.",
  },
  {
    icon: "/figma/about-us/icon-impact.svg",
    title: "Impact Over Hype",
    copy: "We build tools that work in the real world, not marketing slides.",
  },
];
const team = [
  {
    name: "Satish Kumar",
    image: "/images/team/satish-kumar.webp",
    title: "Founder and CEO",
    // expertise: "Builds large-scale computer vision and machine-learning systems for multispectral climate intelligence and aerial wildlife monitoring.",
  },
  {
    name: "Bowen Zhang",
    image: "/images/team/bowen-zhang.webp",
    title: "Co-Founder and CTO",
    // expertise: "Develops production AI systems with PyTorch, TensorFlow, TensorRT, OpenCV, cloud infrastructure, APIs, and rapid prototyping.",
  },
  {
    name: "ASM Iftekhar",
    image: "/images/team/asm-iftekhar.webp",
    title: "Co-Founder and Director of R&D",
    // expertise: "Deep-learning and computer-vision researcher focused on improving the safety of large language and multimodal generative models.",
  },
  {
    name: "Rahul Vishwakarma",
    image: "/images/team/rahul-vishwakarma.webp",
    title: "Co-Founder and Director of Engineering",
    // expertise: "Builds scalable video analytics, sensor-fusion, and industrial AI systems for asset intelligence, safety, and sustainability.",
  },
  {
    name: "Sunny Kumar Yadav",
    image: "/images/team/sunny-kumar-yadav.webp",
    title: "Engineering Lead",
    // expertise: "Develops scalable enterprise and full-stack applications across .NET, C#, SQL Server, and the MERN ecosystem.",
  },
];
const advisors = [
  {
    name: "B. S. Manjunath",
    image: "/images/advisors/b-s-manjunath.webp",
    title: "Distinguished Professor, Frank Koenig Distinguished Chair in ECE",
    // expertise: "Expert in image and video analysis, visual computing, multimedia data mining, and signal processing for bioinformatics.",
  },
  {
    name: "Michael Franco",
    image: "/images/advisors/mike-franco.webp",
    title: "Former CEO at Riptide IO Inc",
    // expertise: "Brings 30 years of leadership across real estate, enterprise software, smart buildings, and large technology teams.",
  },
  {
    name: "Jared Stabach",
    image: "/images/advisors/jared-stabach.webp",
    title: "Research Ecologist at Smithsonian Conservation Biology Institute",
    // expertise: "Studies how environmental disturbance affects terrestrial mammals using remote sensing, GIS, field data, and GPS tracking.",
  },
  {
    name: "David Arthurs",
    image: "/images/advisors/david-arthurs.webp",
    title: "Chief Financial Officer at Aquantis, Inc",
    // expertise: "Add a brief one- or two-line summary of David’s expertise and contribution to Eyeclimate.",
  },
  {
    name: "Steve Wells",
    image: "/images/advisors/steve-wells.webp",
    title: "Exited SaaS Founder, Advisor, Investor",
    // expertise: "Add a brief one- or two-line summary of Steve’s expertise and contribution to Eyeclimate.",
  },
];

function Person({
  name,
  image,
  title = "Founder & CEO",
  // expertise = "Remote sensing · AI · UCSB & Stanford",
}: {
  name: string;
  image: string;
  title?: string;
  expertise?: string;
}) {
  return (
    <article className="flex flex-col items-center text-center">
      <div className="relative size-36 overflow-hidden rounded-full md:size-40">
        <Image
          src={image}
          alt={name}
          fill
          sizes="160px"
          className="object-cover"
        />
      </div>
      <h3 className="mt-6 text-body-lg font-medium">{name}</h3>
      <p className="mt-1 text-body-sm text-text-muted">{title}</p>
      {/* <p className="mt-3 max-w-72 text-body-xs leading-body text-text-dim">
        {expertise}
      </p> */}
    </article>
  );
}

export default async function AboutPage() {
  const publications = await getPublishedPublications();
  return (
    <>
      <section className="relative min-h-hero-mobile-height overflow-hidden md:min-h-hero-desktop">
        <Image
          src="/figma/about-us/hero-background.webp"
          alt="Wildebeest on the savanna"
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="site-container relative flex min-h-hero-mobile-height items-start pt-hero-top md:min-h-hero-desktop md:items-center md:pt-0">
          <div className="max-w-hero-copy">
            <h1 className="text-hero-mobile font-normal leading-hero tracking-display md:text-hero-desktop">
              Bringing clarity to a{" "}
              <em className="block font-normal text-accent-green md:inline">
                changing planet.
              </em>
            </h1>
            <p className="mt-6 max-w-hero-body text-body leading-body text-text-muted md:text-body-lg">
              We build AI tools that turn raw Earth observation data into
              actionable insights. We help cities, operators, and communities
              make faster, fairer, and science-backed climate decisions.
            </p>
          </div>
        </div>
      </section>

      <section className="site-container grid gap-10 py-section-mobile lg:grid-cols-2 lg:items-center lg:gap-32 lg:py-section-desktop">
        <div>
          <h2 className="text-h2-mobile font-normal tracking-heading md:text-h2">
            Our story
          </h2>
          <p className="mt-6 text-body leading-body text-text-muted">
            Eyeclimate began as a PhD research question at UCSB:
          </p>
          <blockquote className="mt-6 border-l-2 border-accent-green py-4 pl-6 text-body-lg italic leading-body md:text-h5">
            “Can we actually see environmental pollution and risk, not just model it?”
          </blockquote>
          <p className="mt-6 text-body leading-body text-text-muted">
            That question turned into prototypes, then field-tested tools, and
            eventually a company. In 2024, our core R&amp;D moved to Stanford,
            expanding our work from methane detection to air quality
            intelligence and wildlife monitoring.
          </p>
          <p className="mt-6 text-body leading-body text-text-muted">
            Today, Eyeclimate unites university research, rigorous science, and
            real-world impact — building products that help cities breathe
            cleaner air, operators reduce emissions, and ecosystems thrive.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl self-center">
          <Image
            src="/images/team/team-photo.webp"
            alt="The Eyeclimate team"
            fill
            sizes="(min-width: 1024px) 540px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="site-container py-section-mobile lg:py-section-desktop">
        <header className="mx-auto max-w-section-heading text-center">
          <h2 className="text-h2-mobile font-normal tracking-heading md:text-h2">
            Our values
          </h2>
          <p className="mt-4 text-body text-text-muted">
            What allows us to succeed and work better together.
          </p>
        </header>
        <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          {values.map((value) => (
            <article
              key={value.title}
              className="flex flex-col items-center text-center md:items-start md:text-left"
            >
              <div className="relative size-14" aria-hidden="true">
                <Image src={value.icon} alt="" fill sizes="56px" />
              </div>
              <h3 className="mt-6 text-body-lg font-medium">{value.title}</h3>
              <p className="mt-2 text-body-sm leading-body text-text-muted">
                {value.copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-container py-section-mobile lg:py-section-desktop">
        <header className="mx-auto max-w-team-heading text-center">
          <h2 className="text-h2-mobile font-normal tracking-heading md:text-h2">
            Meet our team
          </h2>
          <p className="mt-4 text-body leading-body text-text-muted">
            We are engineers, scientists, and researchers with backgrounds in
            remote sensing, AI, climate science, and environmental monitoring.
          </p>
        </header>
        <div className="mx-auto mt-16 flex max-w-people flex-wrap justify-center gap-x-8 gap-y-16">
          {team.map((person) => (
            <div
              key={person.name}
              className="w-full sm:w-[calc((100%-4rem)/3)]"
            >
              <Person {...person} />
            </div>
          ))}
        </div>
      </section>

      <section className="site-container py-section-mobile lg:py-section-desktop">
        <header className="text-center">
          <h2 className="text-h3-mobile font-normal tracking-heading md:text-h3">
            Advisors
          </h2>
          <p className="mt-4 text-body text-text-muted">Built with the best.</p>
        </header>
        <div className="mx-auto mt-16 flex max-w-people flex-wrap justify-center gap-x-8 gap-y-16">
          {advisors.map((person) => (
            <div
              key={person.name}
              className="w-full sm:w-[calc((100%-4rem)/3)]"
            >
              <Person {...person} />
            </div>
          ))}
        </div>
      </section>

      <section
        id="publications"
        className="site-container scroll-mt-24 py-section-mobile lg:py-section-desktop"
      >
        <header className="text-center">
          <h2 className="text-h3-mobile font-normal tracking-heading md:text-h3">
            Selected publications
          </h2>
          <p className="mt-4 text-body text-text-muted">
            Our methods, in the open.
          </p>
        </header>
        <div className="mt-16 border-t border-divider">
          {publications.map((publication) => {
            const detail = [
              publication.venue,
              publication.highlights,
              ...publication.tags,
            ]
              .filter(Boolean)
              .join(" · ");
            return (
              <article
                key={publication.id}
                className="grid gap-4 border-b border-divider py-8 md:grid-cols-publication md:items-center md:gap-10"
              >
                <p className="text-body-sm text-accent-green">
                  {new Date(
                    `${publication.publication_date}T00:00:00`,
                  ).getFullYear()}
                </p>
                <div>
                  <h3 className="text-body-lg font-normal leading-heading">
                    {publication.title}
                  </h3>
                  {detail ? (
                    <p className="mt-2 text-body-xs text-text-dim">{detail}</p>
                  ) : null}
                </div>
                <a
                  href={publication.publication_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-body-sm text-text-muted transition-colors hover:text-text-primary"
                >
                  Read paper&nbsp; →
                </a>
              </article>
            );
          })}
          {publications.length === 0 ? (
            <p className="border-b border-divider py-8 text-body text-text-muted">
              Published papers will appear here.
            </p>
          ) : null}
        </div>
      </section>

      <section className="border-y border-divider bg-bg-section-alt">
        <div className="site-container py-cta-mobile text-center md:py-cta-desktop">
          <h2 className="text-h3-mobile font-normal tracking-heading md:text-h3">
            What we believe in...
          </h2>
          <p className="mx-auto mt-6 max-w-cta-copy text-body leading-body text-text-muted md:text-body-lg">
            Climate intelligence should be accessible, explainable, and
            actionable. We bridge the gap between research and reality — turning
            unsolved problems into peer-reviewed research, and research into
            usable products.
          </p>
          <Button href="/contact" className="mt-8">
            Contact us
          </Button>
        </div>
      </section>
    </>
  );
}
