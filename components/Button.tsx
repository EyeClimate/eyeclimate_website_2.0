import Link from "next/link";

export default function Button({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex h-11 items-center justify-center rounded-full bg-text-primary px-8 text-body-sm font-medium text-text-inverse transition-opacity hover:opacity-90 ${className}`}
    >
      {children}
    </Link>
  );
}
