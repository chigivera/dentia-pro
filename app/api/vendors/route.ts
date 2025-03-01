import { NextResponse } from "next/server"
import { api } from "@/lib/api"

export async function GET() {
  try {
    const vendors = await api.get("/vendors")
    return NextResponse.json(vendors)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch vendors" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const vendor = await request.json()
    const newVendor = await api.post("/vendors", vendor)
    return NextResponse.json(newVendor, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create vendor" }, { status: 500 })
  }
}

