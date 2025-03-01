"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Filter, FileText, Phone, Mail } from "lucide-react"
import AppLayout from "@/components/layout/AppLayout"
import Link from "next/link"

// Mock patient data
const patients = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    dateOfBirth: "1990-01-01",
    lastVisit: "2023-11-15",
    nextAppointment: "2023-12-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "123-456-7891",
    dateOfBirth: "1985-05-15",
    lastVisit: "2023-11-10",
    nextAppointment: "2023-12-05",
  },
  {
    id: 3,
    name: "Robert Brown",
    email: "robert.brown@example.com",
    phone: "123-456-7892",
    dateOfBirth: "1978-08-22",
    lastVisit: "2023-11-05",
    nextAppointment: "2023-12-10",
  },
  {
    id: 4,
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    phone: "123-456-7893",
    dateOfBirth: "1992-03-12",
    lastVisit: "2023-10-25",
    nextAppointment: "2023-11-30",
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    phone: "123-456-7894",
    dateOfBirth: "1980-11-30",
    lastVisit: "2023-10-20",
    nextAppointment: "2023-12-15",
  },
]

export default function PatientsPage() {
  const t = useTranslations("common")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm),
  )

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary-900">{t("patients")}</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Patient
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Patient Management</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patients..."
                    className="pl-8 w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Next Appointment</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">
                      <Link href={`/patients/${patient.id}`} className="hover:underline">
                        {patient.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center text-sm">
                          <Phone className="mr-2 h-3 w-3" />
                          {patient.phone}
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail className="mr-2 h-3 w-3" />
                          {patient.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{patient.dateOfBirth}</TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                    <TableCell>{patient.nextAppointment}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}

