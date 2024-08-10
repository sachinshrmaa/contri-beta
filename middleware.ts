import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("accessToken")?.value || "";

  const isPublic = path.startsWith("/login") || path.startsWith("/signup");

  if (token && isPublic) {
    return NextResponse.rewrite(new URL("/dashboard/groups", request.nextUrl));
  }

  if (!token && !isPublic) {
    return NextResponse.rewrite(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
