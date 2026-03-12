import { supabase } from "../../lib/supabase.js"

export async function getUserById(id: string) {
  const { data, error } = await supabase
    .from("users")
    .select("id, email")
    .eq("id", id)
    .single()

  if (error) throw new Error(error.message)
  return data
}
