import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { tokenKey } from "@/constants/token";

export function middleware(request: NextRequest) {
  const hasToken = cookies().get(tokenKey)?.value;
  if (!hasToken) return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: "/my/:path*",
};
