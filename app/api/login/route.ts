// app/api/login/route.ts

import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { UserRole } from "@/lib/auth/types"

// Mock user database - in a real app, this would be your database
const users = [
  {
    id: "1",
    name: "Super Admin",
    email: "superadmin@example.com",
    password: "password123", // In a real app, this would be hashed
    role: UserRole.SUPER_ADMIN,
    tenantId: null, // Super admin doesn't belong to a specific tenant
  },
  {
    id: "2",
    name: "Clinic Admin",
    email: "clinicadmin@example.com",
    password: "password123",
    role: UserRole.CLINIC_ADMIN,
    tenantId: "clinic1", // This admin belongs to clinic1
  },
  {
    id: "3",
    name: "Staff Member",
    email: "staff@example.com",
    password: "password123",
    role: UserRole.STAFF,
    tenantId: "clinic1", // This staff belongs to clinic1
  },
]

// JWT secret keys - in a real app, these would be environment variables
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access-secret-key"
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh-secret-key"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Find user by email
    const user = users.find((user) => user.email === email)

    // Check if user exists and password matches
    if (user && user.password === password) {
      // Create payload for JWT
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
      }

      // Generate access token (expires in 15 minutes)
      const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
        expiresIn: "15m",
      })

      // Generate refresh token (expires in 7 days)
      const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
        expiresIn: "7d",
      })

      // In a real app, you would store the refresh token in a database
      // associated with the user for validation when refreshing

      // Return tokens
      return NextResponse.json({ accessToken, refreshToken }, { status: 200 })
    }

    // Invalid credentials
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

