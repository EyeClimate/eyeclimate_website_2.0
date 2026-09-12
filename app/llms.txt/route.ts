import { LLMS_TEXT } from "@/lib/agent-content";

export function GET() {
  return new Response(LLMS_TEXT, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      Vary: "Accept-Encoding",
      Link: `</llms.txt>; rel="describedby"`,
    },
  });
}
