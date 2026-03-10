import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SignOutButton } from './sign-out-button'

export default async function ProtectedPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background p-6 md:p-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Welcome!
            </h1>
            <p className="text-sm text-muted-foreground">
              You are logged in as{' '}
              <span className="font-medium text-foreground">{user.email}</span>
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h2 className="mb-3 text-sm font-medium text-foreground">
              User Information
            </h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">ID</dt>
                <dd className="font-mono text-xs text-foreground">
                  {user.id.slice(0, 8)}...
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Provider</dt>
                <dd className="text-foreground">
                  {user.app_metadata?.provider ?? 'Unknown'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Last Sign In</dt>
                <dd className="text-foreground">
                  {user.last_sign_in_at
                    ? new Date(user.last_sign_in_at).toLocaleDateString()
                    : 'N/A'}
                </dd>
              </div>
            </dl>
          </div>

          <SignOutButton />
        </div>
      </div>
    </div>
  )
}
