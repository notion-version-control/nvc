"use server"

import { createClient } from "@/lib/supabase/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function signInWithNotion() {
  const supabase = await createClient()
  const headersList = await headers()
  const origin = headersList.get("origin") ?? "http://localhost:3000"

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "notion",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) redirect("/auth/auth-code-error")
  if (data.url) redirect(data.url)
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/sign-in")
}
