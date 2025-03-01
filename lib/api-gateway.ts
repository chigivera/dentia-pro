// lib/api-gateway.ts

import { getSession } from "next-auth/react"

// API Gateway configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api"

// Error types
export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
    this.name = "ApiError"
  }
}

// CSRF token management
export async function getCsrfToken(): Promise<string> {
  const response = await fetch("/api/auth/csrf")
  const data = await response.json()
  return data.csrfToken
}

// API Gateway client
export const apiGateway = {
  // Generic request method
  async request<T>(method: string, endpoint: string, data?: any, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    const session = await getSession()

    // Default headers
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    }

    // Add CSRF token for non-GET requests
    if (method !== "GET") {
      const csrfToken = await getCsrfToken()
      headers["X-CSRF-Token"] = csrfToken
    }

    // Add authorization header if session exists
    if (session) {
      headers["Authorization"] = `Bearer ${session.user.id}`
    }

    // Prepare request options
    const requestOptions: RequestInit = {
      method,
      headers,
      credentials: "include", // Include cookies
      ...options,
      body: data ? JSON.stringify(data) : undefined,
    }

    try {
      const response = await fetch(url, requestOptions)

      // Handle non-2xx responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError(errorData.message || "An error occurred", response.status)
      }

      // Parse JSON response
      const result = await response.json()
      return result as T
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }

      // Handle network errors
      throw new ApiError(error instanceof Error ? error.message : "Network error", 0)
    }
  },

  // Convenience methods
  get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>("GET", endpoint, undefined, options)
  },

  post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>("POST", endpoint, data, options)
  },

  put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>("PUT", endpoint, data, options)
  },

  patch<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>("PATCH", endpoint, data, options)
  },

  delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>("DELETE", endpoint, undefined, options)
  },
}

