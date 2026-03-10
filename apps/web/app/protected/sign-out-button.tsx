'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@workspace/ui/components/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    setIsLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <Button
      onClick={handleSignOut}
      disabled={isLoading}
      variant="outline"
      className="w-full"
    >
      {isLoading ? 'Signing out...' : 'Sign Out'}
    </Button>
  )
}
