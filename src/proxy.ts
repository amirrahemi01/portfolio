import { NextRequest, NextResponse } from "next/server";

/**
 * Keeps the URLs the site already has: English at "/" (no prefix) and Persian under "/fa".
 * Internally every page lives under /en or /fa (src/app/[lang]), so:
 *   /            ->  rendered from /en        (URL stays "/")
 *   /projects/x  ->  rendered from /en/projects/x
 *   /fa/...      ->  used as is
 *   /en/...      ->  redirected to the unprefixed URL, so there is one canonical address
 * Unknown URLs fall through to a catch-all route that shows the 404 page.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/fa" || pathname.startsWith("/fa/")) return NextResponse.next();

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip the API, Next's own files, and anything with a file extension (images, sitemap, robots...)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
