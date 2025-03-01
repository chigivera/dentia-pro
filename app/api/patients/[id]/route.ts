import { NextResponse } from "next/server"
import { api } from "@/lib/api"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const patient = await api.get(`/patients/${params.id}`)
    return NextResponse.json(patient)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch patient" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedPatient = await request.json()
    const patient = await api.put(`/patients/${params.id}`, updatedPatient)
    return NextResponse.json(patient)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update patient" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await api.delete(`/patients/${params.id}`)
    return NextResponse.json({ message: "Patient deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete patient" }, { status: 500 })
  }
}

