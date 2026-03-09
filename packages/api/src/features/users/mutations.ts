import { supabase } from "../../lib/supabase.js"
import type { User, CreateUserInput, UpdateUserInput } from "./types.js"

export async function createUser(input: CreateUserInput): Promise<User> {
  const { data, error } = await supabase
    .from("users")
    .insert(input)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updateUser(id: string, input: UpdateUserInput): Promise<User> {
  const { data, error } = await supabase
    .from("users")
    .update(input)
    .eq("id", id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase.from("users").delete().eq("id", id)

  if (error) throw new Error(error.message)
}
