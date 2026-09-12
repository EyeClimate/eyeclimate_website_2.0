import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  appendVary,
  isNegotiablePath,
  preferredRepresentation,
} from "@/lib/content-negotiation";

function markdownAlternate(pathname: string) {
  return pathname === "/" ? "/index.md" : `${pathname.replace(/\/$/, "")}.md`;
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.endsWith(".md")) {
    const url = request.nextUrl.clone();
    const canonicalPath =
      pathname === "/index.md" ? "/" : pathname.slice(0, -3) || "/";
    url.pathname = `/api/markdown${canonicalPath}`;
    const rewritten = NextResponse.rewrite(url);
    appendVary(rewritten.headers, "Accept");
    appendVary(rewritten.headers, "Accept-Encoding");
    return rewritten;
  }

  if (isNegotiablePath(pathname)) {
    const accept = request.headers.get("accept");
    const representation = preferredRepresentation(accept);
    if (representation === "text/markdown") {
      const url = request.nextUrl.clone();
      url.pathname = `/api/markdown${pathname}`;
      const rewritten = NextResponse.rewrite(url);
      appendVary(rewritten.headers, "Accept");
      appendVary(rewritten.headers, "Accept-Encoding");
      return rewritten;
    }
    if (representation === null && accept) {
      return new Response(
        "Not Acceptable\n\nAvailable: text/html, text/markdown\n",
        {
          status: 406,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            Vary: "Accept, Accept-Encoding",
          },
        },
      );
    }
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    (pathname.startsWith("/profile") || pathname.startsWith("/portal"))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  if (isNegotiablePath(pathname)) {
    appendVary(response.headers, "Accept");
    appendVary(response.headers, "Accept-Encoding");
    response.headers.set(
      "Link",
      `</llms.txt>; rel="describedby", <${markdownAlternate(pathname)}>; rel="alternate"; type="text/markdown"`,
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
