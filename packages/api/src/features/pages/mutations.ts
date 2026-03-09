import { supabase } from "../../lib/supabase.js"
import type { Page, CreatePageInput, UpdatePageInput } from "./types.js"

export async function createPage(input: CreatePageInput): Promise<Page> {
  const { data, error } = await supabase
    .from("pages")
    .insert(input)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updatePage(id: string, input: UpdatePageInput): Promise<Page> {
  const { data, error } = await supabase
    .from("pages")
    .update(input)
    .eq("id", id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deletePage(id: string): Promise<void> {
  const { error } = await supabase.from("pages").delete().eq("id", id)

  if (error) throw new Error(error.message)
}
