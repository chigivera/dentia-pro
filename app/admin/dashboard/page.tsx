"use client"

import type React from "react"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", appointments: 40 },
  { name: "Feb", appointments: 30 },
  { name: "Mar", appointments: 50 },
  { name: "Apr", appointments: 45 },
  { name: "May", appointments: 60 },
  { name: "Jun", appointments: 55 },
]

const Dashboard: React.FC = () => {
  const t = useTranslations("dashboard")

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t("patientOverview")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("treatmentPlans")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
            <p className="text-sm text-gray-500">Active plans</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("billingSummary")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$5,240</p>
            <p className="text-sm text-gray-500">Total revenue this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("activePrescriptions")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">8</p>
            <p className="text-sm text-gray-500">Active prescriptions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("quickActions")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full">New Appointment</Button>
              <Button className="w-full" variant="outline">
                New Patient
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Appointment Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="appointments" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard

