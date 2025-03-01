"use client"

import type React from "react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  Calendar,
  CreditCard,
  Settings,
  LogOut,
  Package,
  FileText,
  BarChart,
  ChevronDown,
  ChevronRight,
  Building,
  UserCog,
} from "lucide-react"
import { useState } from "react"
import { UserRole } from "@/lib/auth/types"
import { useAuth } from "@/lib/auth/context"

interface NavItemProps {
  href: string
  label: string
  icon: React.ElementType
  active?: boolean
  onClick?: () => void
}

const NavItem: React.FC<NavItemProps> = ({ href, label, icon: Icon, active, onClick }) => {
  return (
    <Link href={href} passHref>
      <Button
        variant="ghost"
        className={cn("w-full justify-start", active && "bg-sidebar-accent text-sidebar-accent-foreground")}
        onClick={onClick}
      >
        <Icon className="w-5 h-5 mr-2" />
        {label}
      </Button>
    </Link>
  )
}

interface NavGroupProps {
  label: string
  icon: React.ElementType
  children: React.ReactNode
}

const NavGroup: React.FC<NavGroupProps> = ({ label, icon: Icon, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="space-y-1">
      <Button variant="ghost" className="justify-start w-full" onClick={() => setIsOpen(!isOpen)}>
        <Icon className="w-5 h-5 mr-2" />
        {label}
        {isOpen ? <ChevronDown className="w-4 h-4 ml-auto" /> : <ChevronRight className="w-4 h-4 ml-auto" />}
      </Button>
      {isOpen && <div className="ml-6 space-y-1">{children}</div>}
    </div>
  )
}

const Sidebar: React.FC = () => {
  const t = useTranslations("common")
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const userRole = user?.role || UserRole.STAFF

  const handleLogout = async () => {
    await logout()
    window.location.href = "/"
  }

  return (
    <div className="flex flex-col w-64 border-r bg-sidebar-background text-sidebar-foreground border-sidebar-border">
      <div className="flex items-center justify-center h-20 border-b border-sidebar-border">
        <span className="text-2xl font-semibold text-sidebar-primary">DentiaPro</span>
      </div>
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {/* Common navigation items for all users */}
          <NavItem href="/dashboard" label={t("dashboard")} icon={LayoutDashboard} active={pathname === "/dashboard"} />

          <NavGroup label={t("patients")} icon={Users}>
            <NavItem href="/patients" label="All Patients" icon={Users} active={pathname === "/patients"} />
            <NavItem href="/patients/new" label="Add Patient" icon={Users} active={pathname === "/patients/new"} />
          </NavGroup>

          <NavItem
            href="/appointments"
            label={t("appointments")}
            icon={Calendar}
            active={pathname === "/appointments"}
          />

          <NavGroup label="Inventory" icon={Package}>
            <NavItem
              href="/inventory/stock"
              label="Stock Control"
              icon={Package}
              active={pathname === "/inventory/stock"}
            />
            <NavItem
              href="/inventory/vendors"
              label="Vendors"
              icon={Package}
              active={pathname === "/inventory/vendors"}
            />
          </NavGroup>

          <NavGroup label="Financial" icon={CreditCard}>
            <NavItem
              href="/financial/invoices"
              label="Invoices"
              icon={FileText}
              active={pathname === "/financial/invoices"}
            />
            <NavItem
              href="/financial/expenses"
              label="Expenses"
              icon={CreditCard}
              active={pathname === "/financial/expenses"}
            />
            <NavItem
              href="/financial/reports"
              label="Reports"
              icon={BarChart}
              active={pathname === "/financial/reports"}
            />
          </NavGroup>

          {/* Admin-specific navigation items */}
          {(userRole === UserRole.CLINIC_ADMIN || userRole === UserRole.SUPER_ADMIN) && (
            <NavItem
              href="/admin/dashboard"
              label="Admin Panel"
              icon={Settings}
              active={pathname.startsWith("/admin")}
            />
          )}

          {/* Super Admin-specific navigation items */}
          {userRole === UserRole.SUPER_ADMIN && (
            <>
              <NavItem
                href="/super-admin/dashboard"
                label="Super Admin"
                icon={Building}
                active={pathname.startsWith("/super-admin")}
              />
              <NavGroup label="Tenant Management" icon={Building}>
                <NavItem
                  href="/super-admin/clinics"
                  label="Clinics"
                  icon={Building}
                  active={pathname === "/super-admin/clinics"}
                />
                <NavItem
                  href="/super-admin/users"
                  label="Users"
                  icon={UserCog}
                  active={pathname === "/super-admin/users"}
                />
              </NavGroup>
            </>
          )}

          <NavItem href="/settings" label={t("settings")} icon={Settings} active={pathname === "/settings"} />
        </div>
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <Button variant="ghost" className="justify-start w-full" onClick={handleLogout}>
          <LogOut className="w-5 h-5 mr-2" />
          {t("logout")}
        </Button>
      </div>
    </div>
  )
}

export default Sidebar

