import { NextResponse } from "next/server"
import { api } from "@/lib/api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const clinicId = searchParams.get("clinicId")

  try {
    let users
    if (clinicId) {
      users = await api.get(`/users?clinicId=${clinicId}`)
    } else {
      users = await api.get("/users")
    }
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await request.json()
    const newUser = await api.post("/users", user)
    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

