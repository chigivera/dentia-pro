import { NextResponse } from "next/server"
import { api } from "@/lib/api"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const invoice = await api.get(`/invoices/${params.id}`)
    return NextResponse.json(invoice)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch invoice" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedInvoice = await request.json()
    const invoice = await api.put(`/invoices/${params.id}`, updatedInvoice)
    return NextResponse.json(invoice)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update invoice" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await api.delete(`/invoices/${params.id}`)
    return NextResponse.json({ message: "Invoice deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete invoice" }, { status: 500 })
  }
}

