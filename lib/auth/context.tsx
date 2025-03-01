"use client"

// lib/auth/context.tsx

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { type User, type AuthState, UserRole } from "./types"
import { loginUser, logoutUser, getCurrentUser } from "./api"

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<User | null>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  })

  const checkAuth = useCallback(async () => {
    try {
      const user = await getCurrentUser()
      setState((prev) => ({ ...prev, user, isLoading: false }))
      return user
    } catch (error) {
      setState((prev) => ({ ...prev, user: null, isLoading: false }))
      return null
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const login = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const user = await loginUser(email, password)
      setState({ user, isLoading: false, error: null })
    } catch (error) {
      setState({
        user: null,
        isLoading: false,
        error: error instanceof Error ? error.message : "Login failed",
      })
      throw error
    }
  }

  const logout = async () => {
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      await logoutUser()
      setState({ user: null, isLoading: false, error: null })
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Logout failed",
      }))
    }
  }

  const value = {
    ...state,
    login,
    logout,
    checkAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

// Helper hooks for role-based access control
export function useSuperAdmin() {
  const { user } = useAuth()
  return user?.role === UserRole.SUPER_ADMIN
}

export function useClinicAdmin() {
  const { user } = useAuth()
  return user?.role === UserRole.CLINIC_ADMIN || user?.role === UserRole.SUPER_ADMIN
}

export function useStaff() {
  const { user } = useAuth()
  return user !== null
}

