import { NextResponse } from "next/server"
import { api } from "@/lib/api"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const category = await api.get(`/inventoryCategories/${params.id}`)
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch inventory category" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedCategory = await request.json()
    const category = await api.put(`/inventoryCategories/${params.id}`, updatedCategory)
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update inventory category" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await api.delete(`/inventoryCategories/${params.id}`)
    return NextResponse.json({ message: "Inventory category deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete inventory category" }, { status: 500 })
  }
}

