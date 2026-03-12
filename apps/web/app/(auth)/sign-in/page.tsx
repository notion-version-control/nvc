import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { SignInButton } from "@/components/sign-in-button"

export default async function SignInPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) redirect("/dashboard")

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Notion Version Control
          </h1>
          <p className="text-muted-foreground text-sm">
            Sign in with your Notion account to get started.
          </p>
        </div>
        <SignInButton />
      </div>
    </div>
  )
}
