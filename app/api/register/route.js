import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"


export async function POST(req) {
  try {
    const body = await req.json()
    const { email, password, name } = body || {}

    // Basic server-side validation
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing email or password" }), { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(String(email).toLowerCase())) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), { status: 400 })
    }

    if (typeof password !== "string" || password.length < 8) {
      return new Response(JSON.stringify({ error: "Password must be at least 8 characters" }), { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      // Generic message to avoid user enumeration details
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 })
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({ data: { email, password: hashed, name } })

    return new Response(JSON.stringify({ id: user.id, email: user.email }), { status: 201 })
  } catch (error) {
    // Log the error server-side, but return a generic message to the client
    console.error("[register] error:", error)
    return new Response(JSON.stringify({ error: "Registration failed" }), { status: 500 })
  }
}
