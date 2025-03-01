import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
        <h1 className="mb-4 text-4xl font-bold">About</h1>
        <p className="mb-4 text-xl">
          This is a Next.js project with TypeScript, Tailwind CSS, and ShadcN UI components.
        </p>
        <p className="mb-4">
          The project structure includes folders for components, lib, hooks, services, app, and styles.
        </p>
      </div>
    </main>
  )
}

