import { NextResponse } from "next/server"
import { api } from "@/lib/api"

export async function GET() {
  try {
    const appointments = await api.get("/appointments")
    return NextResponse.json(appointments)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const appointment = await request.json()
    const newAppointment = await api.post("/appointments", appointment)
    return NextResponse.json(newAppointment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 })
  }
}

