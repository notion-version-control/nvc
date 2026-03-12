import {
  createSupabaseServerClient,
  type CookieMethodsServer,
} from "@workspace/api/supabase-server"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()

  const cookieMethods: CookieMethodsServer = {
    getAll() {
      return cookieStore.getAll()
    },
    setAll(cookiesToSet) {
      try {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options),
        )
      } catch {
        // Server Component에서는 쿠키 쓰기 불가 — middleware가 처리
      }
    },
  }

  return createSupabaseServerClient(cookieMethods)
}
