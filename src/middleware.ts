import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes: Array<string> = ["/my", "/admin"];
const publicRoutes: Array<string> = [];

export function middleware(request: NextRequest) {
  const hasToken = cookies().get("accessToken")?.value;
  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  if (!hasToken && isProtectedRoute)
    return NextResponse.redirect(new URL("/", request.url));
}

export const config = {};
