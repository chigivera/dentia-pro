import { NextResponse } from "next/server"
import { api } from "@/lib/api"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const quotation = await api.get(`/quotations/${params.id}`)
    return NextResponse.json(quotation)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch quotation" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedQuotation = await request.json()
    const quotation = await api.put(`/quotations/${params.id}`, updatedQuotation)
    return NextResponse.json(quotation)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update quotation" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await api.delete(`/quotations/${params.id}`)
    return NextResponse.json({ message: "Quotation deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete quotation" }, { status: 500 })
  }
}

