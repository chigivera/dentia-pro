// app/api/refresh/route.ts

import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import type { UserRole } from "@/lib/auth/types"

// JWT secret keys - in a real app, these would be environment variables
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access-secret-key"
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh-secret-key"

// Mock refresh token store - in a real app, this would be your database
// This is just for demonstration purposes
const validRefreshTokens = new Set<string>()

export async function POST(request: Request) {
  try {
    const { refreshToken } = await request.json()

    if (!refreshToken) {
      return NextResponse.json({ message: "Refresh token is required" }, { status: 400 })
    }

    // In a real app, you would check if the refresh token exists in your database
    // and hasn't been revoked

    // Verify refresh token
    try {
      const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as {
        id: string
        name: string
        email: string
        role: UserRole
        tenantId: string | null
      }

      // Generate new access token
      const accessToken = jwt.sign(
        {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
          tenantId: decoded.tenantId,
        },
        JWT_ACCESS_SECRET,
        { expiresIn: "15m" },
      )

      // Generate new refresh token (token rotation for security)
      const newRefreshToken = jwt.sign(
        {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
          tenantId: decoded.tenantId,
        },
        JWT_REFRESH_SECRET,
        { expiresIn: "7d" },
      )

      // In a real app, you would update the refresh token in your database
      // validRefreshTokens.delete(refreshToken);
      // validRefreshTokens.add(newRefreshToken);

      return NextResponse.json({ accessToken, refreshToken: newRefreshToken }, { status: 200 })
    } catch (error) {
      return NextResponse.json({ message: "Invalid refresh token" }, { status: 401 })
    }
  } catch (error) {
    console.error("Refresh token error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

