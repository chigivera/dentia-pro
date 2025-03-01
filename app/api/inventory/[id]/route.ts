import { NextResponse } from "next/server"
import { api } from "@/lib/api"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const item = await api.get(`/inventory/${params.id}`)
    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch inventory item" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedItem = await request.json()
    const item = await api.put(`/inventory/${params.id}`, updatedItem)
    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update inventory item" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await api.delete(`/inventory/${params.id}`)
    return NextResponse.json({ message: "Inventory item deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete inventory item" }, { status: 500 })
  }
}

