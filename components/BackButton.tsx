import Link from "next/link";

export default function BackButton({
  href,
  label = "Back",
}: {
  href: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex h-11 items-center rounded-full border border-divider px-6 text-body-sm text-text-muted transition-colors hover:border-border-accent hover:text-text-primary"
    >
      ← {label}
    </Link>
  );
}
