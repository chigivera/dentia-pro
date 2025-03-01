// lib/auth/types.ts

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  CLINIC_ADMIN = "CLINIC_ADMIN",
  STAFF = "STAFF",
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  tenantId: string | null
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface DecodedToken {
  id: string
  name: string
  email: string
  role: UserRole
  tenantId: string | null
  exp: number
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

