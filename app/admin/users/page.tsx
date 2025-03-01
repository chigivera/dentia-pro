import { UserManagement } from "@/components/admin/UserManagement"

export default function UsersPage() {
  // In a real application, you would get the clinicId from the authenticated user's session
  const clinicId = 1

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Management</h1>
      <UserManagement clinicId={clinicId} />
    </div>
  )
}

