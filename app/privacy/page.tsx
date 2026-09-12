import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Eyeclimate",
  description:
    "How Eyeclimate collects, uses, stores, and protects information submitted through its website.",
};

const sections = [
  {
    title: "Information we collect",
    body: "When you contact Eyeclimate, we collect the information you choose to provide, such as your name, organization, email address, and project message. Our hosting and security providers may also process limited technical information—including IP address, browser type, requested pages, timestamps, and diagnostic logs—to deliver the website reliably, prevent abuse, and investigate errors. Please do not submit sensitive personal information through the project inquiry form.",
  },
  {
    title: "How we use information",
    body: "We use submitted information to respond to inquiries, understand project requirements, evaluate potential collaborations, arrange demonstrations, maintain business records, and improve our services. We use technical information to operate, secure, diagnose, and measure the website. We do not sell personal information or use contact-form details for unrelated advertising.",
  },
  {
    title: "Service providers and disclosure",
    body: "Information may be processed by service providers that support website hosting, database storage, form delivery, team notifications, and business communications. These providers process information for the services they supply to Eyeclimate. We may also disclose information when required by law, to protect legal rights or safety, or in connection with a corporate transaction subject to appropriate safeguards.",
  },
  {
    title: "Retention and security",
    body: "We retain inquiry information only as long as reasonably necessary to respond, manage a potential or active business relationship, meet legal obligations, resolve disputes, and enforce agreements. Technical logs are generally retained for shorter operational periods. We use reasonable administrative and technical safeguards, but no internet transmission or storage system can be guaranteed completely secure.",
  },
  {
    title: "Your choices and rights",
    body: "Depending on where you live, you may have rights to request access to, correction of, deletion of, or restriction on the use of your personal information, and to object to certain processing. You may also withdraw consent where consent is the basis for processing. To make a request, email us and describe the information or interaction involved so we can verify and respond appropriately.",
  },
  {
    title: "International processing and children",
    body: "Eyeclimate works globally, so information may be processed in countries other than the one where it was submitted. Where required, appropriate protections apply to cross-border processing. This website is intended for organizations, researchers, and professionals and is not directed to children. We do not knowingly collect personal information from children through the inquiry form.",
  },
  {
    title: "Updates and contact",
    body: "We may update this policy as our website, providers, or legal obligations change. Material revisions will be reflected on this page with a new effective date. Questions or privacy requests can be sent to info@eyeclimate.com. We aim to acknowledge requests promptly and may ask for information needed to verify identity before acting on a request.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <header className="border-b border-divider">
        <div className="site-container py-contact-mobile lg:py-contact-desktop">
          <p className="text-label uppercase tracking-label text-accent-green">
            Legal
          </p>
          <h1 className="mt-6 text-contact-mobile font-normal leading-hero tracking-display md:text-contact-desktop">
            Privacy policy.
          </h1>
          <p className="mt-6 max-w-case-intro text-body-lg leading-body text-text-muted">
            This policy explains how Eyeclimate handles information provided
            through eyeclimate.com and its project inquiry form.
          </p>
          <p className="mt-4 text-body-sm text-text-dim">
            Effective September 12, 2026
          </p>
        </div>
      </header>
      <article className="site-container max-w-article py-section-mobile lg:py-section-desktop">
        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-h4 font-normal tracking-heading">
                {section.title}
              </h2>
              <p className="mt-4 text-body leading-body text-text-muted">
                {section.body}
              </p>
            </section>
          ))}
        </div>
        <p className="mt-14 border-t border-divider pt-8 text-body text-text-muted">
          Privacy question? Email{" "}
          <a
            className="text-accent-green hover:underline"
            href="mailto:info@eyeclimate.com"
          >
            info@eyeclimate.com
          </a>{" "}
          or use the{" "}
          <Link className="text-accent-green hover:underline" href="/contact">
            contact page
          </Link>
          .
        </p>
      </article>
    </>
  );
}
