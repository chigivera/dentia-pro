"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShieldAlert } from "lucide-react"
import { useAuth } from "@/lib/auth/context"

export default function AccessDenied() {
  const { user } = useAuth()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-4 rounded-full bg-destructive/10 p-3">
        <ShieldAlert className="h-10 w-10 text-destructive" />
      </div>
      <h1 className="mb-2 text-3xl font-bold">Access Denied</h1>
      <p className="mb-6 text-center text-muted-foreground">You don&apos;t have permission to access this page.</p>
      {user ? (
        <div className="space-y-4">
          <p className="text-center">
            You are logged in as <strong>{user.name}</strong> with role <strong>{user.role.replace("_", " ")}</strong>.
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Go to Home</Link>
            </Button>
          </div>
        </div>
      ) : (
        <Button asChild>
          <Link href="/auth/signin">Sign In</Link>
        </Button>
      )}
    </div>
  )
}

