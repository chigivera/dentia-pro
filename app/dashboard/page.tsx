// app/dashboard/page.tsx

import { requireStaffOrHigher } from "@/lib/auth/server"
import DashboardClient from "./dashboard-client"

export default async function Dashboard() {
  // This will redirect to login if not authenticated
  const user = await requireStaffOrHigher()

  return <DashboardClient user={user} />
}

