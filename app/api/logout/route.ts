// app/api/logout/route.ts

import { NextResponse } from "next/server"

// Mock refresh token store - in a real app, this would be your database
// This is just for demonstration purposes
const validRefreshTokens = new Set<string>()

export async function POST(request: Request) {
  try {
    const { refreshToken } = await request.json()

    if (!refreshToken) {
      return NextResponse.json({ message: "Refresh token is required" }, { status: 400 })
    }

    // In a real app, you would invalidate the refresh token in your database
    // validRefreshTokens.delete(refreshToken);

    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

