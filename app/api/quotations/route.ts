import { NextResponse } from "next/server"
import { api } from "@/lib/api"

export async function GET() {
  try {
    const quotations = await api.get("/quotations")
    return NextResponse.json(quotations)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch quotations" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const quotation = await request.json()
    const newQuotation = await api.post("/quotations", quotation)
    return NextResponse.json(newQuotation, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create quotation" }, { status: 500 })
  }
}

