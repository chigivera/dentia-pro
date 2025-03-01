"use client"

import { useSession } from "next-auth/react"
import { apiGateway, ApiError } from "@/lib/api-gateway"
import { useState, useCallback } from "react"

interface UseApiOptions {
  onError?: (error: ApiError) => void
  onSuccess?: <T>(data: T) => void
}

export function useApi(options: UseApiOptions = {}) {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const request = useCallback(
    async <T>(\
      method: string,
      endpoint: string,
      data?: any,
      requestOptions?: RequestInit
    ): Promise<T | null> => {
  if (!session) {
    const authError = new ApiError("Not authenticated", 401)
    setError(authError)
    options.onError?.(authError)
    return null
  }

  setLoading(true)
  setError(null)

  try {
    const response = await apiGateway.request<T>(
          method,
          endpoint,
          data,
          requestOptions
        )
    options.onSuccess?.(response)
    return response
  } catch (err) {
    const apiError = err as ApiError
    setError(apiError)
    options.onError?.(apiError)
    return null
  } finally {
    setLoading(false)
  }
}
,
    [session, options]
  )

return {
    loading,
    error,
    get: <T>(endpoint: string, requestOptions?: RequestInit) =>
      request<T>("GET", endpoint, undefined, requestOptions),
    post: <T>(endpoint: string, data?: any, requestOptions?: RequestInit) =>
      request<T>("POST", endpoint, data, requestOptions),
    put: <T>(endpoint: string, data?: any, requestOptions?: RequestInit) =>
      request<T>("PUT", endpoint, data, requestOptions),
    patch: <T>(endpoint: string, data?: any, requestOptions?: RequestInit) =>
      request<T>("PATCH", endpoint, data, requestOptions),
    delete: <T>(endpoint: string, requestOptions?: RequestInit) =>
      request<T>("DELETE", endpoint, undefined, requestOptions),
  }
}

