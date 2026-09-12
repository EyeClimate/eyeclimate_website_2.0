import Link from "next/link";
import Image from "next/image";

const columns = [
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["News", "/news"],
      ["Contact", "/contact"],
      ["Privacy", "/privacy"],
    ],
  },
  {
    title: "Technology",
    links: [
      ["MethaneMapper", "/product/methanemapper"],
      ["WildlifeMapper", "/product/wildlifemapper"],
    ],
  },
  {
    title: "Use cases",
    links: [
      ["Methane detection", "/use-cases/methane-detection"],
      ["Methane monitoring", "/use-cases/methane-monitoring"],
    ],
  },
  { title: "Let’s connect", links: [["Book a demo", "/contact"]] },
];
const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/eyeclimate/",
    icon: "social-2.svg",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/eyeclimate/",
    icon: "social-1-a.svg",
  },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-divider bg-bg-page py-footer-mobile md:py-footer-desktop">
      <div className="site-container">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-footer md:gap-16">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-body font-medium"
            >
              <Image
                src="/images/brand/eyeclimate-logo.webp"
                alt=""
                width={28}
                height={28}
              />
              <span>Eyeclimate</span>
            </Link>
            <p className="mt-5 max-w-brand text-body-sm leading-body text-text-muted">
              Earth observation intelligence.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-label uppercase tracking-label text-text-dim">
                {column.title}
              </h2>
              <ul className="mt-5 space-y-3 text-body-sm text-text-muted">
                {column.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="transition-colors hover:text-text-primary"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col-reverse gap-6 border-t border-divider pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-body-xs text-text-dim">
            © {currentYear} Eyeclimate · All rights reserved
          </p>
          <div className="flex gap-5" aria-label="Social links">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="relative size-4 opacity-70 transition-opacity hover:opacity-100"
              >
                {social.label === "Instagram" ? (
                  <>
                    <Image
                      src="/figma/icons/social-1-a.svg"
                      alt=""
                      fill
                      sizes="16px"
                    />
                    <Image
                      src="/figma/icons/social-1-b.svg"
                      alt=""
                      width={8}
                      height={8}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                    <Image
                      src="/figma/icons/social-1-c.svg"
                      alt=""
                      width={2}
                      height={2}
                      className="absolute right-[3px] top-[3px]"
                    />
                  </>
                ) : (
                  <Image
                    src={`/figma/icons/${social.icon}`}
                    alt=""
                    fill
                    sizes="16px"
                  />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
