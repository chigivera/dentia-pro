"use client"

import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Vendor {
  id: number
  name: string
  email: string
  phone: string
  contactPerson: string
  paymentTerms: string
  rating: number
}

export function VendorManagement() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchVendors()
  }, [])

  const fetchVendors = async () => {
    try {
      const data = await api.get("/api/vendors")
      setVendors(data)
      setLoading(false)
    } catch (err) {
      setError("Failed to fetch vendors")
      setLoading(false)
    }
  }

  const handleAddVendor = () => {
    // Implement add vendor logic here
    console.log("Adding new vendor")
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Vendor Management</h2>
      <Button onClick={handleAddVendor}>Add Vendor</Button>
      {loading && <p>Loading vendors...</p>}
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
              <TableHead>Phone</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Payment Terms</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell>{vendor.name}</TableCell>
                <TableCell>{vendor.email}</TableCell>
                <TableCell>{vendor.phone}</TableCell>
                <TableCell>{vendor.contactPerson}</TableCell>
                <TableCell>{vendor.paymentTerms}</TableCell>
                <TableCell>{vendor.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

