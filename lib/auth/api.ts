// lib/auth/api.ts

import type { AuthTokens, User } from "./types"
import { getTokens, setTokens, removeTokens, isTokenExpired, getUserFromToken } from "./token"

// Mock user database - in a real app, this would be your database
const users = [
  {
    id: "1",
    name: "Super Admin",
    email: "superadmin@example.com",
    password: "password123", // In a real app, this would be hashed
    role: "SUPER_ADMIN",
    tenantId: null, // Super admin doesn't belong to a specific tenant
  },
  {
    id: "2",
    name: "Clinic Admin",
    email: "clinicadmin@example.com",
    password: "password123",
    role: "CLINIC_ADMIN",
    tenantId: "clinic1", // This admin belongs to clinic1
  },
  {
    id: "3",
    name: "Staff Member",
    email: "staff@example.com",
    password: "password123",
    role: "STAFF",
    tenantId: "clinic1", // This staff belongs to clinic1
  },
]

/**
 * Login user with email and password
 */
export async function loginUser(email: string, password: string): Promise<User> {
  try {
    // In a real app, this would be an API call to your backend
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Login failed")
    }

    const tokens: AuthTokens = await response.json()
    setTokens(tokens)
    console.log(process.env.JWT_ACCESS_SECRET,process.env.JWT_REFRESH_SECRET)
    const user = getUserFromToken(tokens.accessToken)
    if (!user) {
      throw new Error("Invalid token")
    }

    return user
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

/**
 * Logout user
 */
export async function logoutUser(): Promise<void> {
  try {
    const tokens = getTokens()
    if (tokens) {
      // In a real app, this would be an API call to your backend
      await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({ refreshToken: tokens.refreshToken }),
      })
    }
  } catch (error) {
    console.error("Logout error:", error)
  } finally {
    removeTokens()
  }
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(): Promise<AuthTokens> {
  const tokens = getTokens()

  if (!tokens || !tokens.refreshToken) {
    throw new Error("No refresh token available")
  }

  try {
    // In a real app, this would be an API call to your backend
    const response = await fetch("/api/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: tokens.refreshToken }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Token refresh failed")
    }

    const newTokens: AuthTokens = await response.json()
    setTokens(newTokens)

    return newTokens
  } catch (error) {
    console.error("Token refresh error:", error)
    removeTokens()
    throw error
  }
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser(): Promise<User | null> {
  const tokens = getTokens()

  if (!tokens || !tokens.accessToken) {
    return null
  }

  // Check if token is expired and refresh if needed
  if (isTokenExpired(tokens.accessToken)) {
    try {
      const newTokens = await refreshAccessToken()
      return getUserFromToken(newTokens.accessToken)
    } catch (error) {
      return null
    }
  }

  return getUserFromToken(tokens.accessToken)
}

