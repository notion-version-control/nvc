"use client"

import { Button } from "@workspace/ui/components/button"
import { signInWithNotion } from "@/app/(auth)/sign-in/actions"

export function SignInButton() {
  return (
    <form action={signInWithNotion}>
      <Button type="submit" className="w-full" size="lg">
        Continue with Notion
      </Button>
    </form>
  )
}
