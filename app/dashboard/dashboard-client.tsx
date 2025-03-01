// app/dashboard/dashboard-client.tsx

"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, DollarSign, FileText, Users, AlertTriangle } from "lucide-react"
import AppLayout from "@/components/layout/AppLayout"

// Mock data for charts
const appointmentData = [
  { name: "Mon", appointments: 4 },
  { name: "Tue", appointments: 6 },
  { name: "Wed", appointments: 8 },
  { name: "Thu", appointments: 5 },
  { name: "Fri", appointments: 7 },
  { name: "Sat", appointments: 3 },
  { name: "Sun", appointments: 0 },
]

const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 5500 },
]

const incomeData = [
  { name: "Revenue", value: 15000 },
  { name: "Expenses", value: 8000 },
]

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))"]

const inventoryAlerts = [
  { id: 1, name: "Dental Floss", category: "Hygiene", quantity: 5, reorderLevel: 20 },
  { id: 2, name: "Latex Gloves", category: "Safety", quantity: 10, reorderLevel: 50 },
  { id: 3, name: "Anesthetic", category: "Medicine", quantity: 3, reorderLevel: 10 },
]

const upcomingAppointments = [
  { id: 1, patient: "John Doe", time: "10:00 AM", type: "Check-up", doctor: "Dr. Smith" },
  { id: 2, patient: "Jane Smith", time: "11:30 AM", type: "Cleaning", doctor: "Dr. Johnson" },
  { id: 3, patient: "Robert Brown", time: "2:00 PM", type: "Consultation", doctor: "Dr. Williams" },
]

export default function DashboardClient({ user }: { user: any }) {
  const t = useTranslations("dashboard")
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary-900">{t("patientOverview")}</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              New Appointment
            </Button>
          </div>
        </div>

        {/* Display user info for debugging */}
        <Card className="bg-muted">
          <CardHeader>
            <CardTitle>Current User</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>Tenant ID: {user.tenantId || "None (Super Admin)"}</p>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                  <Users className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">245</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">2 pending confirmations</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,450</div>
                  <p className="text-xs text-muted-foreground">+8.2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Inventory Alerts</CardTitle>
                  <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Items below reorder level</p>
                </CardContent>
              </Card>
            </div>

            {/* Rest of the dashboard content */}
            {/* ... */}
          </TabsContent>

          {/* Other tabs content */}
          {/* ... */}
        </Tabs>
      </div>
    </AppLayout>
  )
}

