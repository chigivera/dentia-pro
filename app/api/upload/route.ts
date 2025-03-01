import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { nanoid } from "nanoid"

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get("filename")

  if (!filename) {
    return NextResponse.json({ error: "Filename is required" }, { status: 400 })
  }

  try {
    const file = await request.blob()
    const uniqueFilename = `${nanoid()}-${filename}`
    const { url } = await put(uniqueFilename, file, { access: "public" })

    return NextResponse.json({ url })
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}

