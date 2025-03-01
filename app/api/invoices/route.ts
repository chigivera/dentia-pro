import { NextResponse } from "next/server"
import { api } from "@/lib/api"

export async function GET() {
  try {
    const invoices = await api.get("/invoices")
    return NextResponse.json(invoices)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const invoice = await request.json()
    const newInvoice = await api.post("/invoices", invoice)
    return NextResponse.json(newInvoice, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 })
  }
}

