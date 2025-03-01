import type React from "react"
import Providers from "./providers"
import "./globals.css"
import { getLocale, getMessages } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"
import { getServerSession } from "next-auth/next"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "DentiaPro - Dental Management System",
  description: "A comprehensive dental clinic management system",
  generator: "v0.dev",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const messages = await getMessages()
  const session = await getServerSession()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Providers session={session}>{children}</Providers>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}



import './globals.css'