import type React from "react"
import { useTranslations } from "next-intl"
import Sidebar from "./Sidebar"
import TopPanel from "./TopPanel"
import NotificationSystem from "./NotificationSystem"

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const t = useTranslations("common")

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopPanel />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
      <NotificationSystem />
    </div>
  )
}

export default AppLayout

