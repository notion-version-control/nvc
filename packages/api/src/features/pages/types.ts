export interface Page {
  id: string
  title: string
  content: string | null
  authorId: string
  createdAt: string
  updatedAt: string
}

export interface CreatePageInput {
  title: string
  content?: string
  authorId: string
}

export interface UpdatePageInput {
  title?: string
  content?: string
}
