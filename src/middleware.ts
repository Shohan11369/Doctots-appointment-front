import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const hasToken = request.cookies.has('token');
  
  // 1. Explicitly ignore auth and public pages to prevent loops
  if (path === "/login" || path === "/register" || path === "/") {
    return NextResponse.next();
  }

  // 2. Protect specific routes
  const isProtected = 
    path.startsWith("/dashboard") ||
    path.startsWith("/admin-dashboard") ||
    path.startsWith("/doctor-dashboard");

  if (isProtected && !hasToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectPath", path);
    loginUrl.searchParams.set("message", "Please login to continue.");
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
