import { supabase } from "../../lib/supabase.js"
import type { User } from "./types.js"

export async function getUser(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function listUsers(): Promise<User[]> {
  const { data, error } = await supabase.from("users").select("*")

  if (error) throw new Error(error.message)
  return data ?? []
}
