"use client"

import { useTranslations } from "next-intl"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, FileText, DollarSign, PlusCircle } from "lucide-react"
import AppLayout from "@/components/layout/AppLayout"
import TeethChart from "@/components/TeethChart"
import Link from "next/link"

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const t = useTranslations("patient")
  const patientId = params.id

  // Mock patient data
  const patient = {
    id: Number.parseInt(patientId),
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    dateOfBirth: "1990-01-01",
    address: "123 Main St, Anytown, USA",
    emergencyContact: "Jane Doe (Wife) - 123-456-7891",
    medicalHistory: "No known allergies, Hypertension",
  }

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      date: "2023-12-01",
      time: "10:00 AM",
      doctor: "Dr. Smith",
      type: "Check-up",
      status: "Scheduled",
    },
    {
      id: 2,
      date: "2023-11-15",
      time: "2:00 PM",
      doctor: "Dr. Johnson",
      type: "Cleaning",
      status: "Completed",
    },
    {
      id: 3,
      date: "2023-10-20",
      time: "11:30 AM",
      doctor: "Dr. Williams",
      type: "Consultation",
      status: "Completed",
    },
  ]

  // Mock treatment plans data
  const treatmentPlans = [
    {
      id: 1,
      name: "Orthodontic Treatment",
      startDate: "2023-10-01",
      endDate: "2024-10-01",
      status: "In Progress",
      description: "Full braces treatment",
      cost: "$3,500",
    },
    {
      id: 2,
      name: "Cavity Fillings",
      startDate: "2023-11-15",
      endDate: "2023-12-15",
      status: "Scheduled",
      description: "Fill cavities in teeth #18, #19",
      cost: "$400",
    },
  ]

  // Mock financial data
  const financialRecords = [
    {
      id: 1,
      date: "2023-11-15",
      description: "Check-up",
      amount: "$150",
      status: "Paid",
    },
    {
      id: 2,
      date: "2023-10-20",
      description: "X-Ray",
      amount: "$200",
      status: "Paid",
    },
    {
      id: 3,
      date: "2023-12-01",
      description: "Orthodontic Treatment - Initial Payment",
      amount: "$1,000",
      status: "Pending",
    },
  ]

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/patients">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Patients
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-primary-900">{patient.name}</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                  <dd>{patient.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
                  <dd>{patient.phone}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Date of Birth</dt>
                  <dd>{patient.dateOfBirth}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Address</dt>
                  <dd>{patient.address}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Emergency Contact</dt>
                  <dd>{patient.emergencyContact}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Medical History</dt>
                  <dd>{patient.medicalHistory}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Button className="flex flex-col items-center justify-center h-24 space-y-2">
                  <Calendar className="h-6 w-6" />
                  <span>New Appointment</span>
                </Button>
                <Button className="flex flex-col items-center justify-center h-24 space-y-2" variant="outline">
                  <FileText className="h-6 w-6" />
                  <span>Add Medical Record</span>
                </Button>
                <Button className="flex flex-col items-center justify-center h-24 space-y-2" variant="outline">
                  <DollarSign className="h-6 w-6" />
                  <span>Create Invoice</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appointments">{t("appointments")}</TabsTrigger>
            <TabsTrigger value="treatmentPlans">{t("treatmentPlans")}</TabsTrigger>
            <TabsTrigger value="medicalRecords">{t("medicalRecords")}</TabsTrigger>
            <TabsTrigger value="financialManagement">{t("financialManagement")}</TabsTrigger>
          </TabsList>
          <TabsContent value="appointments">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{t("appointments")}</CardTitle>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Appointment
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>{appointment.doctor}</TableCell>
                        <TableCell>{appointment.type}</TableCell>
                        <TableCell>{appointment.status}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="treatmentPlans">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{t("treatmentPlans")}</CardTitle>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Treatment Plan
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plan Name</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {treatmentPlans.map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell className="font-medium">{plan.name}</TableCell>
                        <TableCell>{plan.startDate}</TableCell>
                        <TableCell>{plan.endDate}</TableCell>
                        <TableCell>{plan.status}</TableCell>
                        <TableCell>{plan.description}</TableCell>
                        <TableCell>{plan.cost}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="medicalRecords">
            <Card>
              <CardHeader>
                <CardTitle>{t("medicalRecords")}</CardTitle>
                <CardDescription>Dental chart and medical records</CardDescription>
              </CardHeader>
              <CardContent>
                <TeethChart />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="financialManagement">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{t("financialManagement")}</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    New Quotation
                  </Button>
                  <Button>
                    <DollarSign className="mr-2 h-4 w-4" />
                    New Invoice
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {financialRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>{record.description}</TableCell>
                        <TableCell>{record.amount}</TableCell>
                        <TableCell>{record.status}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}

