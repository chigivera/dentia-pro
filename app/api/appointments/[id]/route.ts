import { NextResponse } from "next/server"
import { api } from "@/lib/api"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const appointment = await api.get(`/appointments/${params.id}`)
    return NextResponse.json(appointment)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch appointment" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedAppointment = await request.json()
    const appointment = await api.put(`/appointments/${params.id}`, updatedAppointment)
    return NextResponse.json(appointment)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await api.delete(`/appointments/${params.id}`)
    return NextResponse.json({ message: "Appointment deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete appointment" }, { status: 500 })
  }
}

