import { Button } from '@workspace/ui/components/button'
import Link from 'next/link'

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10">
            <svg
              className="size-7 text-destructive"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              Authentication Error
            </h1>
            <p className="text-sm text-muted-foreground">
              {params?.error
                ? `Error: ${params.error}`
                : 'An unexpected error occurred during authentication.'}
            </p>
          </div>

          <Button asChild variant="outline" className="w-full">
            <Link href="/login">Try Again</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
