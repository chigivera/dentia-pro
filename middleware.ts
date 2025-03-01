// middleware.ts

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

const publicPaths = ["/", "/about", "/auth/signin", "/auth/error"]

// JWT secret key - in a real app, this would be an environment variable
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access-secret-key"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log("secret", JWT_ACCESS_SECRET)
  console.log("refreshtoken", process.env.JWT_REFRESH_SECRET)
  // Allow public paths
  if (publicPaths.some((path) => pathname === path || pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Check for access token cookie
  const accessToken = request.cookies.get("access_token")

  // If no access token, redirect to signin
  if (!accessToken) {
    const url = new URL("/auth/signin", request.url)
    url.searchParams.set("callbackUrl", encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  try {
    // Verify access token
    const decoded = jwt.verify(accessToken.value, JWT_ACCESS_SECRET) as {
      id: string
      name: string
      email: string
      role: string
      tenantId: string | null
    }

    // Role-based access logic
    if (decoded.role === "SUPER_ADMIN") {
      return NextResponse.next()
    }

    if (decoded.role === "CLINIC_ADMIN") {
      if (pathname.startsWith("/super-admin")) {
        return NextResponse.redirect(new URL("/access-denied", request.url))
      }
      return NextResponse.next()
    }

    if (decoded.role === "STAFF") {
      if (pathname.startsWith("/super-admin") || pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/access-denied", request.url))
      }
      return NextResponse.next()
    }

    // Default: deny access
    return NextResponse.redirect(new URL("/access-denied", request.url))
  } catch (error) {
    // Token is invalid or expired
    const url = new URL("/auth/signin", request.url)
    url.searchParams.set("callbackUrl", encodeURI(request.url))
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

