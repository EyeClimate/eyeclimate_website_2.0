import { getMarkdownForPath, markdownNotFound } from "@/lib/agent-content";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug = [] } = await params;
  const pathname = `/${slug.map(decodeURIComponent).join("/")}`;
  const body = await getMarkdownForPath(pathname);
  const headers = {
    "Content-Type": "text/markdown; charset=utf-8",
    Vary: "Accept, Accept-Encoding",
    "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
    Link: `</llms.txt>; rel="describedby", <${pathname === "/" ? "/index.md" : `${pathname}.md`}>; rel="alternate"; type="text/markdown"`,
  };
  if (!body)
    return new Response(markdownNotFound(pathname), { status: 404, headers });
  return new Response(body, { status: 200, headers });
}
