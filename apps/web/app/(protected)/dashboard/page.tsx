import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/sign-in")

  return (
    <div className="flex min-h-svh p-6">
      <div className="flex flex-col gap-4">
        <h1 className="font-medium">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Signed in as {user.email}
        </p>
      </div>
    </div>
  )
}
