// lib/auth.ts

import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { UserRole } from "@/app/api/auth/[...nextauth]/route"

export async function getSession() {
  return await getServerSession()
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}

export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/signin")
  }

  return user
}

export async function requireSuperAdmin() {
  const user = await requireAuth()

  if (user.role !== UserRole.SUPER_ADMIN) {
    redirect("/access-denied")
  }

  return user
}

export async function requireClinicAdmin() {
  const user = await requireAuth()

  if (user.role !== UserRole.CLINIC_ADMIN && user.role !== UserRole.SUPER_ADMIN) {
    redirect("/access-denied")
  }

  return user
}

export async function requireStaffOrHigher() {
  const user = await requireAuth()
  return user
}

export async function checkTenantAccess(tenantId: string) {
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

