"use client"

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <p>Access Denied. Please log in.</p>
  }

  // Image source priority:
  // 1) NEXT_PUBLIC_BARRON_IMAGE_URL environment variable (set in your hosting provider)
  // 2) public/barron.jpg (place an image file at public/barron.jpg)
  // 3) placeholder image
  const imageUrl = process.env.NEXT_PUBLIC_BARRON_IMAGE_URL || 
    "/barron.jpg" ||
    "https://via.placeholder.com/400x400?text=Provide+NEXT_PUBLIC_BARRON_IMAGE_URL"

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome, {session.user.email}!</h1>

        <div className="mb-4">
          <img
            src={imageUrl}
            alt="Profile"
            style={{ width: 320, height: 320, objectFit: "cover", borderRadius: 12, alighn: "center" }}
            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Image+not+found' }}
          />
        </div>
      </div>
    </div>
  )
}
