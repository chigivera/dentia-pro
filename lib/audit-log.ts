import { api } from "@/lib/api"

export async function logAuditEvent(userId: string, action: string, details: string) {
  try {
    await api.post("/audit-logs", {
      userId,
      action,
      details,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Failed to log audit event:", error)
  }
}

