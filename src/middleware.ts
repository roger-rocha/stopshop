import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = process.env.AUTH_SECRET ?? "";
const COOKIE = "stopshop_session";

async function isAuthed(token: string | undefined) {
  if (!token || !SECRET) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(SECRET));
    return true;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = req.cookies.get(COOKIE)?.value;
  if (await isAuthed(token)) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  if (pathname !== "/admin") {
    url.searchParams.set("next", pathname);
  }
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
