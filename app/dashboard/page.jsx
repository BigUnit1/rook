import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <p>Access Denied. Please log in.</p>
  }

  return <h1>Welcome, {session.user.email}!</h1>
}
