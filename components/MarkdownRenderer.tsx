import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function headingText(children: React.ReactNode) {
  return Array.isArray(children)
    ? children.map((child) => String(child)).join("")
    : String(children);
}

function headingSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[*_`~]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getMarkdownHeadings(content: string) {
  const occurrences = new Map<string, number>();
  return Array.from(content.matchAll(/^##\s+(.+)$/gm)).map((match) => {
    const text = match[1].replace(/[*_`~]/g, "").trim();
    const base = headingSlug(text) || "section";
    const count = occurrences.get(base) ?? 0;
    occurrences.set(base, count + 1);
    return {
      text,
      id: count ? `${base}-${count + 1}` : base,
      offset: match.index,
    };
  });
}

export default function MarkdownRenderer({ content }: { content: string }) {
  const headingIdsByOffset = new Map(
    getMarkdownHeadings(content).map(({ offset, id }) => [offset, id]),
  );

  return (
    <div className="space-y-5 text-body leading-body text-text-muted">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="pt-3 text-h2-mobile font-normal text-text-primary md:text-h2">
              {children}
            </h1>
          ),
          h2: ({ children, node }) => (
            <h2
              id={
                headingIdsByOffset.get(node?.position?.start.offset ?? -1) ??
                (headingSlug(headingText(children)) || "section")
              }
              className="scroll-mt-28 pt-5 text-h3-mobile font-normal text-text-primary md:text-h3"
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="pt-4 text-h5 font-medium text-text-primary">
              {children}
            </h3>
          ),
          p: ({ children }) => <p>{children}</p>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-accent-green underline underline-offset-4"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="ml-5 list-disc space-y-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="ml-5 list-decimal space-y-2">{children}</ol>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-accent-green bg-bg-card p-5 text-text-primary">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="rounded bg-bg-card px-2 py-1 text-body-sm text-accent-green">
              {children}
            </code>
          ),
          hr: () => <hr className="border-divider" />,
          img: ({ src, alt }) =>
            typeof src === "string" ? (
              <Image
                src={src}
                alt={alt ?? "Article image"}
                width={1200}
                height={675}
                className="h-auto w-full rounded-xl border border-divider object-cover"
              />
            ) : null,
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-body-sm">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-divider bg-bg-card p-3 text-left text-text-primary">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-divider p-3">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
