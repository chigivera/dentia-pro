import { NextResponse } from "next/server"
import { api } from "@/lib/api"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const clinic = await api.get(`/clinics/${params.id}`)
    return NextResponse.json(clinic)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch clinic" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedClinic = await request.json()
    const clinic = await api.put(`/clinics/${params.id}`, updatedClinic)
    return NextResponse.json(clinic)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update clinic" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await api.delete(`/clinics/${params.id}`)
    return NextResponse.json({ message: "Clinic deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete clinic" }, { status: 500 })
  }
}

