import { NextResponse } from "next/server"
import { api } from "@/lib/api"

export async function GET() {
  try {
    const inventory = await api.get("/inventory")
    return NextResponse.json(inventory)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const item = await request.json()
    const newItem = await api.post("/inventory", item)
    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create inventory item" }, { status: 500 })
  }
}

