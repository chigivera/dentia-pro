import { NextResponse } from "next/server"
import { api } from "@/lib/api"

export async function GET() {
  try {
    const categories = await api.get("/inventoryCategories")
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch inventory categories" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const category = await request.json()
    const newCategory = await api.post("/inventoryCategories", category)
    return NextResponse.json(newCategory, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create inventory category" }, { status: 500 })
  }
}

