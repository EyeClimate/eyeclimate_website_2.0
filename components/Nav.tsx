"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Button from "./Button";

const links = [
  ["Technology", "/#technology"],
  ["About", "/about"],
  ["News", "/news"],
  ["Contact", "/contact"],
] as const;
const useCases = [
  ["Methane Detection", "/use-cases/methane-detection"],
  ["Methane Monitoring", "/use-cases/methane-monitoring"],
] as const;

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [useCasesOpen, setUseCasesOpen] = useState(false);
  const useCasesRef = useRef<HTMLDivElement>(null);
  const mobileUseCasesRef = useRef<HTMLDivElement>(null);
  const linkClass = (active: boolean) =>
    `text-body-sm transition-colors hover:text-text-primary ${active ? "text-text-primary" : "text-text-muted"}`;
  const mobileLinkClass = (active: boolean) =>
    `block py-5 text-h5 transition-colors hover:text-text-primary ${active ? "text-text-primary" : "text-text-muted"}`;
  const isActive = (href: string) => {
    if (href === "/#technology")
      return pathname === "/" || pathname.startsWith("/product/");
    if (href === "/news")
      return (
        pathname === "/news" ||
        pathname.startsWith("/news/") ||
        pathname === "/newsroom"
      );
    return pathname === href;
  };
  const useCasesActive = pathname.startsWith("/use-cases/");
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);
  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      const target = event.target as Node;
      const isInsideDesktop = useCasesRef.current?.contains(target);
      const isInsideMobile = mobileUseCasesRef.current?.contains(target);
      if (!isInsideDesktop && !isInsideMobile) {
        setUseCasesOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setUseCasesOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 h-nav border-b border-divider bg-bg-page">
      <div className="site-container flex h-full items-center justify-between">
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
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-10 md:flex"
        >
          <Link
            href="/#technology"
            className={linkClass(isActive("/#technology"))}
            aria-current={isActive("/#technology") ? "page" : undefined}
          >
            Technology
          </Link>
          <div ref={useCasesRef} className="relative">
            <button
              type="button"
              onClick={() => setUseCasesOpen(!useCasesOpen)}
              aria-expanded={useCasesOpen}
              className={linkClass(useCasesActive)}
            >
              Use cases
            </button>
            {useCasesOpen && (
              <div className="absolute left-1/2 top-10 w-48 -translate-x-1/2 rounded-xl border border-divider bg-bg-card p-3 shadow-2xl">
                {useCases.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setUseCasesOpen(false)}
                    className={`block rounded-lg px-4 py-3 text-body-sm hover:bg-accent-green-10 ${pathname === href ? "bg-accent-green-10 text-text-primary" : "text-text-muted"}`}
                    aria-current={pathname === href ? "page" : undefined}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {links.slice(1).map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className={linkClass(isActive(href))}
              aria-current={isActive(href) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button href="/contact">Book a demo&nbsp; →</Button>
        </div>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
          className="flex size-10 items-center justify-center md:hidden"
        >
          {open ? (
            <span aria-hidden="true" className="text-h4 font-light">
              ×
            </span>
          ) : (
            <Image
              src="/figma/icons/mobile-menu-hamburger.svg"
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
            />
          )}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="fixed inset-x-0 bottom-0 top-nav z-50 flex flex-col bg-bg-page px-5 pb-10 pt-6 md:hidden"
        >
          <div className="divide-y divide-divider">
            <Link
              href="/#technology"
              onClick={() => setOpen(false)}
              className={mobileLinkClass(isActive("/#technology"))}
              aria-current={isActive("/#technology") ? "page" : undefined}
            >
              Technology
            </Link>
            <div ref={mobileUseCasesRef} className="py-5">
              <button
                type="button"
                onClick={() => setUseCasesOpen(!useCasesOpen)}
                className={`flex w-full items-center justify-between text-h5 transition-colors hover:text-text-primary ${useCasesActive ? "text-text-primary" : "text-text-muted"}`}
              >
                <span>Use cases</span>
                <span>{useCasesOpen ? "−" : "+"}</span>
              </button>
              {useCasesOpen && (
                <div className="mt-4 space-y-4 pl-4">
                  {useCases.map(([label, href]) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`block text-body transition-colors hover:text-text-primary ${pathname === href ? "text-text-primary" : "text-text-muted"}`}
                      aria-current={pathname === href ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {links.slice(1).map(([label, href]) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className={mobileLinkClass(isActive(href))}
                aria-current={isActive(href) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="mt-auto">
            <Button href="/contact" className="w-full">
              Book a demo&nbsp; →
            </Button>
            <p className="mt-4 text-body-xs text-text-dim">
              info@eyeclimate.com
            </p>
          </div>
        </nav>
      )}
    </header>
  );
}
