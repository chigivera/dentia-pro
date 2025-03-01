import { NextResponse } from "next/server"
import { api } from "@/lib/api"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const purchaseOrder = await api.get(`/purchaseOrders/${params.id}`)
    return NextResponse.json(purchaseOrder)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch purchase order" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedPurchaseOrder = await request.json()
    const purchaseOrder = await api.put(`/purchaseOrders/${params.id}`, updatedPurchaseOrder)
    return NextResponse.json(purchaseOrder)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update purchase order" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await api.delete(`/purchaseOrders/${params.id}`)
    return NextResponse.json({ message: "Purchase order deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete purchase order" }, { status: 500 })
  }
}

