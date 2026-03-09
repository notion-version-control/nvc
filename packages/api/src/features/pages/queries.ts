import { supabase } from "../../lib/supabase.js"
import type { Page } from "./types.js"

export async function getPage(id: string): Promise<Page | null> {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function listPages(authorId?: string): Promise<Page[]> {
  let query = supabase.from("pages").select("*")

  if (authorId) {
    query = query.eq("author_id", authorId)
  }

  const { data, error } = await query

  if (error) throw new Error(error.message)
  return data ?? []
}
