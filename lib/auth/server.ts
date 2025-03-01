// lib/auth/server.ts

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { jwtDecode } from "jwt-decode";
import { type User, UserRole, type DecodedToken } from "./types"

// Cookie names
const ACCESS_TOKEN_COOKIE = "access_token"
const REFRESH_TOKEN_COOKIE = "refresh_token"

/**
 * Get access token from cookies (server-side)
 */
export function getAccessToken(): string | null {
  const cookieStore = cookies()
  return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value || null
}

/**
 * Get refresh token from cookies (server-side)
 */
export function getRefreshToken(): string | null {
  const cookieStore = cookies()
  return cookieStore.get(REFRESH_TOKEN_COOKIE)?.value || null
}

/**
 * Decode JWT token and extract user information (server-side)
 */
export function decodeToken(token: string): DecodedToken | null {
  try {
    return jwtDecode<DecodedToken>(token)
  } catch (error) {
    console.error("Failed to decode token:", error)
    return null
  }
}

/**
 * Get user from access token (server-side)
 */
export function getUserFromToken(token: string): User | null {
  const decoded = decodeToken(token)

  if (!decoded) {
    return null
  }

  return {
    id: decoded.id,
    name: decoded.name,
    email: decoded.email,
    role: decoded.role,
    tenantId: decoded.tenantId,
  }
}

/**
 * Get current user from cookies (server-side)
 */
export async function getCurrentUser(): Promise<User | null> {
  const token = getAccessToken()

  if (!token) {
    return null
  }

  return getUserFromToken(token)
}

/**
 * Require authentication (server-side)
 */
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/signin")
  }

  return user
}

/**
 * Require super admin role (server-side)
 */
export async function requireSuperAdmin(): Promise<User> {
  const user = await requireAuth()

  if (user.role !== UserRole.SUPER_ADMIN) {
    redirect("/access-denied")
  }

  return user
}

/**
 * Require clinic admin role (server-side)
 */
export async function requireClinicAdmin(): Promise<User> {
  const user = await requireAuth()

  if (user.role !== UserRole.CLINIC_ADMIN && user.role !== UserRole.SUPER_ADMIN) {
    redirect("/access-denied")
  }

  return user
}

/**
 * Require staff or higher role (server-side)
 */
export async function requireStaffOrHigher(): Promise<User> {
  return await requireAuth()
}

/**
 * Check tenant access (server-side)
 */
export async function checkTenantAccess(tenantId: string): Promise<boolean> {
  const user = await requireAuth()

  // Super admin can access all tenants
  if (user.role === UserRole.SUPER_ADMIN) {
    return true
  }

  // Check if user belongs to the requested tenant
  if (user.tenantId !== tenantId) {
    redirect("/access-denied")
  }

  return true
}

