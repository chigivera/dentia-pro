import { NextResponse } from "next/server"
import { api } from "@/lib/api"

export async function GET() {
  try {
    const clinics = await api.get("/clinics")
    return NextResponse.json(clinics)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch clinics" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const clinic = await request.json()
    const newClinic = await api.post("/clinics", clinic)
    return NextResponse.json(newClinic, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create clinic" }, { status: 500 })
  }
}

