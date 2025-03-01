import { NextResponse } from "next/server"
import { api } from "@/lib/api"

export async function GET() {
  try {
    const purchaseOrders = await api.get("/purchaseOrders")
    return NextResponse.json(purchaseOrders)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch purchase orders" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const purchaseOrder = await request.json()
    const newPurchaseOrder = await api.post("/purchaseOrders", purchaseOrder)
    return NextResponse.json(newPurchaseOrder, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create purchase order" }, { status: 500 })
  }
}

