"use client"

import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface User {
  id: number
  name: string
  email: string
  role: string
  specialization?: string
}

export function UserManagement({ clinicId }: { clinicId: number }) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const data = await api.get(`/api/users?clinicId=${clinicId}`)
      setUsers(data)
      setLoading(false)
    } catch (err) {
      setError("Failed to fetch users")
      setLoading(false)
    }
  }

  const handleAddUser = () => {
    // Implement add user logic here
    console.log("Adding new user")
  }

  const handleEditUser = (userId: number) => {
    // Implement edit user logic here
    console.log(`Editing user with ID: ${userId}`)
  }

  const handleDeleteUser = (userId: number) => {
    // Implement delete user logic here
    console.log(`Deleting user with ID: ${userId}`)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">User Management</h2>
      <Button onClick={handleAddUser}>Add User</Button>
      {loading && <p>Loading users...</p>}
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {!loading && !error && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.specialization || "N/A"}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditUser(user.id)} className="mr-2">
                    Edit
                  </Button>
                  <Button onClick={() => handleDeleteUser(user.id)} variant="destructive">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

