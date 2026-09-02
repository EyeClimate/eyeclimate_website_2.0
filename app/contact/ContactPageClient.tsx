"use client";

import { FormEvent, useEffect, useState } from "react";

const faqs = [
  {
    question: "How fast do you respond?",
    answer:
      "Within one business day for all inquiries. Demo bookings are typically scheduled within the same week.",
  },
  {
    question: "Can you work with my existing dataset?",
    answer:
      "In most cases, yes. We support hyperspectral, thermal, RGB, and multi-modal data from satellite, airborne, drone, and ground sensors.",
  },
  {
    question: "Do you offer pilot projects?",
    answer:
      "Yes. For most engagements we start with a small-scale pilot — a single flight line, region, or campaign — to demonstrate value before scaling.",
  },
  {
    question: "Are your methods peer-reviewed?",
    answer:
      "Every core algorithm is published in peer-reviewed venues (CVPR, WACV, Remote Sensing of Environment). We share our methods openly.",
  },
  {
    question: "Where are you based?",
    answer:
      "Our research and engineering teams operate across Stanford and UC Santa Barbara. Operations are global.",
  },
  {
    question: "Do you work with academic partners?",
    answer:
      "Absolutely. We co-author publications, share validation datasets, and collaborate on grants. Reach out via the form above.",
  },
];

const labelClass =
  "mb-3 block text-label uppercase tracking-label text-text-dim";
const fieldClass =
  "w-full rounded-xl border border-divider bg-bg-field px-4 py-3.5 text-body-sm text-text-primary outline-none placeholder:text-text-dim focus:border-border-accent";

export default function ContactPageClient() {
  const [openItems, setOpenItems] = useState<Set<number>>(
    new Set(faqs.map((_, index) => index)),
  );
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (!submitted) return;
    const confirmationTimer = window.setTimeout(
      () => setSubmitted(false),
      4000,
    );
    return () => window.clearTimeout(confirmationTimer);
  }, [submitted]);

  function toggleItem(index: number) {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitting(true);
    setSubmitError("");
    try {
      const values = new FormData(form);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(values)),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok)
        throw new Error(result.error || "Unable to send message.");
      form.reset();
      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to send message.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="border-b border-divider">
        <div className="site-container grid gap-16 py-contact-mobile lg:grid-cols-contact lg:gap-24 lg:py-contact-desktop">
          <div className="lg:pt-12">
            <p className="text-label uppercase tracking-label text-text-dim">
              Contact us
            </p>
            <h1 className="mt-8 text-contact-mobile font-normal leading-hero tracking-display md:text-contact-desktop">
              Let&apos;s talk about{" "}
              <em className="block font-normal text-accent-green">
                your project.
              </em>
            </h1>
            <p className="mt-8 max-w-contact-copy text-body-lg leading-body text-text-muted">
              Tell us what you&apos;re trying to observe. Methane, wildlife, air
              quality, or something we haven&apos;t built yet. We reply within
              one business day.
            </p>
            <dl className="mt-14 space-y-8">
              <div>
                <dt className="text-label uppercase tracking-label text-text-dim">
                  Email
                </dt>
                <dd className="mt-3 text-h5">info@eyeclimate.com</dd>
              </div>
              <div>
                <dt className="text-label uppercase tracking-label text-text-dim">
                  Schedule
                </dt>
                <dd className="mt-3 text-h5">Book a 30-min demo</dd>
              </div>
              <div>
                <dt className="text-label uppercase tracking-label text-text-dim">
                  Academic
                </dt>
                <dd className="mt-3 text-h5">Research collaborations</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-divider bg-bg-card p-form-mobile md:p-form-desktop">
            <p className="text-caption uppercase tracking-caption text-accent-green">
              Send a message
            </p>
            <h2 className="mt-5 text-h3-mobile font-normal tracking-heading">
              Tell us what you need.
            </h2>
            <p className="mt-3 text-body leading-body text-text-muted">
              The more specific, the better. Datasets, sites, or research
              questions all welcome.
            </p>
            {submitted ? (
              <div
                className="mt-12 rounded-lg border border-border-accent bg-accent-green-10 p-8"
                role="status"
              >
                <h3 className="text-h5 text-accent-green">Message sent.</h3>
                <p className="mt-3 text-body text-text-muted">
                  Thanks for reaching out. We&apos;ll reply within one business
                  day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <label className="block">
                    <span className={labelClass}>Full name*</span>
                    <input
                      required
                      maxLength={120}
                      name="name"
                      autoComplete="name"
                      placeholder="Your full name"
                      className={fieldClass}
                    />
                  </label>
                  <label className="block">
                    <span className={labelClass}>Organization*</span>
                    <input
                      required
                      maxLength={160}
                      name="organization"
                      autoComplete="organization"
                      placeholder="Company or organization"
                      className={fieldClass}
                    />
                  </label>
                </div>
                <label className="block">
                  <span className={labelClass}>Email*</span>
                  <input
                    required
                    type="email"
                    maxLength={320}
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={fieldClass}
                  />
                </label>
                <label className="block">
                  <span className={labelClass}>Tell us more</span>
                  <textarea
                    name="message"
                    maxLength={5000}
                    rows={5}
                    placeholder="Briefly describe your dataset, site, region, or research question. If relevant, mention sensor types, area size, or timeframe."
                    className={`${fieldClass} resize-none`}
                  />
                </label>
                <label className="absolute -left-[9999px]" aria-hidden="true">
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
                {submitError && (
                  <p role="alert" className="text-body-sm text-red-300">
                    {submitError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="h-12 w-full rounded-full bg-accent-green text-body-sm font-medium text-text-inverse transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Send message →"}
                </button>
                <p className="text-center text-tiny leading-body text-text-dim">
                  By submitting, you agree to our privacy policy. We&apos;ll
                  never share your details.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="site-container py-faq-mobile lg:py-faq-desktop">
        <header className="flex items-end justify-between border-b border-divider pb-8">
          <h2 className="text-h2-mobile font-normal tracking-heading md:text-h2">
            FAQ
          </h2>
          <p className="text-label uppercase tracking-label text-text-dim">
            Common questions
          </p>
        </header>
        <div className="divide-y divide-divider">
          {faqs.map((faq, index) => {
            const isOpen = openItems.has(index);
            return (
              <article key={faq.question} className="py-8">
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="flex w-full items-start justify-between gap-6 text-left"
                >
                  <span
                    className={`text-body-lg ${isOpen ? "text-accent-green" : "text-text-primary"}`}
                  >
                    {faq.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full border text-body-xs ${isOpen ? "border-accent-green bg-accent-green text-text-inverse" : "border-divider text-text-muted"}`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <p
                    id={`faq-answer-${index}`}
                    className="mt-4 max-w-faq-copy text-body-sm leading-body text-text-muted"
                  >
                    {faq.answer}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
