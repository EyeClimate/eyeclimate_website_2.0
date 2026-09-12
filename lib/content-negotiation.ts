export const REPRESENTATIONS = ["text/html", "text/markdown"] as const;

type AcceptEntry = {
  type: string;
  q: number;
  specificity: number;
  position: number;
};

function parseAccept(header: string): AcceptEntry[] {
  return header
    .split(",")
    .map((raw, position) => {
      const [mediaType = "", ...parameters] = raw
        .trim()
        .split(";")
        .map((part) => part.trim());
      let q = 1;
      for (const parameter of parameters) {
        const [name, value] = parameter.split("=").map((part) => part.trim());
        if (name.toLowerCase() !== "q") continue;
        const parsed = Number(value);
        q = Number.isFinite(parsed) ? Math.max(0, Math.min(1, parsed)) : 0;
      }
      const type = mediaType.toLowerCase();
      return {
        type,
        q,
        specificity: type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2,
        position,
      };
    })
    .filter((entry) => entry.type.includes("/"));
}

function matches(entry: AcceptEntry, candidate: string) {
  if (entry.type === "*/*") return true;
  if (entry.type.endsWith("/*"))
    return candidate.startsWith(entry.type.slice(0, -1));
  return entry.type === candidate;
}

export function preferredRepresentation(
  header: string | null,
): (typeof REPRESENTATIONS)[number] | null {
  if (!header) return REPRESENTATIONS[0];
  const entries = parseAccept(header);
  if (!entries.length) return REPRESENTATIONS[0];

  let best: (typeof REPRESENTATIONS)[number] | null = null;
  let bestQ = -1;
  let bestPosition = Number.POSITIVE_INFINITY;

  for (const candidate of REPRESENTATIONS) {
    const matching = entries
      .filter((entry) => matches(entry, candidate))
      .sort(
        (a, b) => b.specificity - a.specificity || a.position - b.position,
      )[0];
    if (!matching || matching.q <= 0) continue;
    if (
      matching.q > bestQ ||
      (matching.q === bestQ && matching.position < bestPosition)
    ) {
      best = candidate;
      bestQ = matching.q;
      bestPosition = matching.position;
    }
  }

  return best;
}

export function appendVary(headers: Headers, value: string) {
  const existing = headers.get("Vary");
  const values = existing ? existing.split(",").map((item) => item.trim()) : [];
  if (!values.some((item) => item.toLowerCase() === value.toLowerCase()))
    values.push(value);
  headers.set("Vary", values.join(", "));
}

export function isNegotiablePath(pathname: string) {
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/_vercel/") ||
    pathname.startsWith("/auth/") ||
    pathname.startsWith("/portal") ||
    pathname.startsWith("/profile")
  )
    return false;
  return !/\.(?:xml|txt|webmanifest|csv|ico|svg|png|jpe?g|gif|webp)$/i.test(
    pathname,
  );
}
