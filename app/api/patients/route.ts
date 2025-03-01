import { NextResponse } from "next/server"
import { api } from "@/lib/api"
import { patientSchema } from "@/lib/validations/patient"
import { logAuditEvent } from "@/lib/audit-log"
import { z } from "zod"

export async function POST(request: Request) {
  try {
    const patient = await request.json()
    const validatedPatient = patientSchema.parse(patient)
    const newPatient = await api.post("/patients", validatedPatient)

    // Log the audit event
    await logAuditEvent(
      request.headers.get("X-User-Id") || "unknown",
      "create_patient",
      `Created patient with ID ${newPatient.id}`,
    )

    return NextResponse.json(newPatient, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to create patient" }, { status: 500 })
  }
}

