import { MultiClinicDashboard } from "@/components/admin/MultiClinicDashboard"

export default function SuperAdminDashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Super Admin Dashboard</h1>
      <MultiClinicDashboard />
    </div>
  )
}

