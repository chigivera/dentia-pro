import { NextResponse } from "next/server"
import { api } from "@/lib/api"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const vendor = await api.get(`/vendors/${params.id}`)
    return NextResponse.json(vendor)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch vendor" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedVendor = await request.json()
    const vendor = await api.put(`/vendors/${params.id}`, updatedVendor)
    return NextResponse.json(vendor)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update vendor" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await api.delete(`/vendors/${params.id}`)
    return NextResponse.json({ message: "Vendor deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete vendor" }, { status: 500 })
  }
}

