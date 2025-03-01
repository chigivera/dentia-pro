// lib/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  return response.json()
}

export const api = {
  get: (endpoint: string) => fetchApi(endpoint),
  post: (endpoint: string, data: any) => fetchApi(endpoint, { method: "POST", body: JSON.stringify(data) }),
  put: (endpoint: string, data: any) => fetchApi(endpoint, { method: "PUT", body: JSON.stringify(data) }),
  delete: (endpoint: string) => fetchApi(endpoint, { method: "DELETE" }),
}

