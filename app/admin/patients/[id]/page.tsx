"use client"

import type React from "react"
import { useTranslations } from "next-intl"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import TeethChart from "@/components/TeethChart"

const PatientDetail: React.FC = () => {
  const t = useTranslations("patient")

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t("details")}</h1>
      <Card>
        <CardHeader>
          <CardTitle>John Doe</CardTitle>
          <CardDescription>Patient ID: 12345</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Age: 35</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: john.doe@example.com</p>
        </CardContent>
      </Card>
      <Tabs defaultValue="appointments">
        <TabsList>
          <TabsTrigger value="appointments">{t("appointments")}</TabsTrigger>
          <TabsTrigger value="treatmentPlans">{t("treatmentPlans")}</TabsTrigger>
          <TabsTrigger value="medicalRecords">{t("medicalRecords")}</TabsTrigger>
          <TabsTrigger value="financialManagement">{t("financialManagement")}</TabsTrigger>
        </TabsList>
        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>{t("appointments")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2023-11-15</TableCell>
                    <TableCell>10:00 AM</TableCell>
                    <TableCell>Dr. Smith</TableCell>
                    <TableCell>Check-up</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023-11-22</TableCell>
                    <TableCell>2:00 PM</TableCell>
                    <TableCell>Dr. Johnson</TableCell>
                    <TableCell>Cleaning</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="treatmentPlans">
          <Card>
            <CardHeader>
              <CardTitle>{t("treatmentPlans")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plan Name</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Orthodontic Treatment</TableCell>
                    <TableCell>2023-10-01</TableCell>
                    <TableCell>2024-10-01</TableCell>
                    <TableCell>In Progress</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cavity Fillings</TableCell>
                    <TableCell>2023-11-15</TableCell>
                    <TableCell>2023-12-15</TableCell>
                    <TableCell>Scheduled</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="medicalRecords">
          <Card>
            <CardHeader>
              <CardTitle>{t("medicalRecords")}</CardTitle>
            </CardHeader>
            <CardContent>
              <TeethChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="financialManagement">
          <Card>
            <CardHeader>
              <CardTitle>{t("financialManagement")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2023-11-15</TableCell>
                    <TableCell>Check-up</TableCell>
                    <TableCell>$150</TableCell>
                    <TableCell>Paid</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023-11-22</TableCell>
                    <TableCell>Cleaning</TableCell>
                    <TableCell>$100</TableCell>
                    <TableCell>Pending</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PatientDetail

