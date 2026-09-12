import Link from "next/link";

export default function NotFound() {
  return (
    <section className="site-container py-section-mobile lg:py-section-desktop">
      <p className="text-label uppercase tracking-label text-accent-green">
        404 · Page not found
      </p>
      <h1 className="mt-6 text-h2-mobile font-normal tracking-heading md:text-h2">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-6 max-w-contact-copy text-body-lg leading-body text-text-muted">
        The address may be outdated or mistyped.
      </p>
      <Link
        className="mt-8 inline-block text-body text-accent-green hover:underline"
        href="/"
      >
        Return to Eyeclimate
      </Link>
    </section>
  );
}
