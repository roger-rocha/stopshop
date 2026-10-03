import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/session";
import { getSitePublished } from "@/lib/server/site-visibility";

function privateResponse(response: NextResponse) {
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  response.headers.set("Vercel-CDN-Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // The upload handler verifies admin sessions and signed Blob callbacks itself.
  if (pathname === "/admin/login" || pathname === "/api/admin/upload") {
    return privateResponse(NextResponse.next());
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySession(token) : null;
  if (session) {
    return privateResponse(NextResponse.next());
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    if (pathname !== "/admin") {
      url.searchParams.set("next", pathname);
    }
    return privateResponse(NextResponse.redirect(url));
  }

  if (await getSitePublished()) {
    return NextResponse.next();
  }

  if (pathname === "/robots.txt") {
    return privateResponse(new NextResponse("User-agent: *\nDisallow: /\n", {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    }));
  }

  let response: NextResponse;
  if (pathname === "/sitemap.xml" || pathname === "/llms.txt") {
    response = new NextResponse("Nosso site está em construção. Voltaremos em breve.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } else if (pathname.startsWith("/api/") || !["GET", "HEAD"].includes(req.method)) {
    response = NextResponse.json(
      { error: "Nosso site está em construção. Voltaremos em breve." },
      { status: 503 },
    );
  } else {
    const url = req.nextUrl.clone();
    url.pathname = "/em-construcao";
    url.search = "";
    response = NextResponse.rewrite(url, { status: 503 });
  }

  response.headers.set("Retry-After", "3600");
  return privateResponse(response);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico$|images/|logos/|logo.png$).*)"],
};
