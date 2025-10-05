"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await signIn("credentials", {
      redirect: true,
      email,
      password,
      callbackUrl: "/dashboard"
    })
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-64">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
        />
        <button className="bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  )
}
