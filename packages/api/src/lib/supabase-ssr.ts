import { createServerClient } from "@supabase/ssr"
import type { CookieOptions } from "@supabase/ssr"

export type CookieMethodsServer = {
  getAll: () => { name: string; value: string }[]
  setAll: (
    cookies: { name: string; value: string; options?: CookieOptions }[],
  ) => void
}

// 팩토리 함수 — Next.js cookies() 핸들러를 주입받음
export function createSupabaseServerClient(cookies: CookieMethodsServer) {
  return createServerClient(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_ANON_KEY"]!,
    { cookies },
  )
}
