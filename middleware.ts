// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyJWT(token: string) {
  try {
    await jwtVerify(token, secret);
    return true;
  } catch (e) {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
  const isDashboardPage = pathname.startsWith("/dashboard");

  if (token) {
    const valid = await verifyJWT(token);
    if (valid) {
      if (isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      return NextResponse.next();
    } else {
      const res = NextResponse.redirect(new URL("/sign-in", request.url));
      res.cookies.delete("auth_token");
      return res;
    }
  } else {
    if (isDashboardPage) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
};
