import { Button } from "@workspace/ui/components/button"
import Link from "next/link"

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background p-6">
      <div className="flex max-w-md min-w-0 flex-col items-center gap-6 text-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Notion Version Control
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in with your Notion account to get started
          </p>
        </div>
        <Button asChild className="w-full max-w-xs">
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    </div>
  )
}
