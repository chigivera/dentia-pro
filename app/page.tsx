// app/page.tsx

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <div className="z-10 items-center justify-between w-full max-w-5xl font-mono text-sm">
        <h1 className="mb-4 text-4xl font-bold">Welcome to DentiaPro</h1>
        <p className="mb-4 text-xl">A comprehensive dental clinic management system with multi-tenancy support.</p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/env-setup">Environment Setup</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

