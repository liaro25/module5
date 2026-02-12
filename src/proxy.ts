import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/admin"];

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));

  const raw = req.cookies.get("session")?.value;

  let session: { userId?: number; role?: string; expiresAt?: string } | null = null;

  if (raw) {
    try {
      // Try URL-decoding first
      const decoded = decodeURIComponent(raw);
      session = JSON.parse(decoded);
    } catch {
      session = null;
    }
  }

  // Expiration check (safe)
  if (session?.expiresAt) {
    const exp = new Date(session.expiresAt);
    if (!Number.isNaN(exp.getTime()) && exp < new Date()) {
      session = null;
    }
  }

  if (isProtectedRoute && !session?.userId) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }

  if (path === "/login" && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (path.startsWith("/admin") && session?.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};

