// components/admin/MultiClinicDashboard.tsx

"use client"

import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Clinic {
  id: number
  name: string
  subscriptionPlan: string
  subscriptionStatus: string
  billingCycle: string
  nextBillingDate: string
}

export function MultiClinicDashboard() {
  const [clinics, setClinics] = useState<Clinic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchClinics()
  }, [])

  const fetchClinics = async () => {
    try {
      const data = await api.get("/clinics")
      setClinics(data)
      setLoading(false)
    } catch (err) {
      setError("Failed to fetch clinics")
      setLoading(false)
    }
  }

  const handleManageAccess = (clinicId: number) => {
    // Implement manage access logic here
    console.log(`Managing access for clinic with ID: ${clinicId}`)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Multi-Clinic Management Dashboard</h2>
      {loading && <p>Loading clinics...</p>}
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {!loading && !error && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Active Clinics Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Total Active Clinics: {clinics.length}</p>
              {/* Add more summary statistics here */}
            </CardContent>
          </Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Clinic Name</TableHead>
                <TableHead>Subscription Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Billing Cycle</TableHead>
                <TableHead>Next Billing Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clinics.map((clinic) => (
                <TableRow key={clinic.id}>
                  <TableCell>{clinic.name}</TableCell>
                  <TableCell>{clinic.subscriptionPlan}</TableCell>
                  <TableCell>{clinic.subscriptionStatus}</TableCell>
                  <TableCell>{clinic.billingCycle}</TableCell>
                  <TableCell>{clinic.nextBillingDate}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleManageAccess(clinic.id)}>Manage Access</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  )
}

