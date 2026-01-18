import { NextResponse } from "next/server";
import { getSession } from "./lib/auth";

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const session = await getSession();

  // Protected routes that require authentication
  const protectedRoutes = ["/items/add", "/protected"];

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // If accessing a protected route without session, redirect to login
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If logged in and trying to access login page, redirect to items
  if (pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/items", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
