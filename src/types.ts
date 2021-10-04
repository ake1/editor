export type WithoutId<T> = Omit<T, '_id'>
export type With<T> = T & { _id: string }

export interface User {
  _id: string
  username: string
}

export interface State {
  doc: SomeDoc
  availableDocs: DocMeta[]
  loadDoc: boolean
  user: User | null
}

export interface DocMeta {
  _id: string
  title: string
}

export interface UnsavedDoc {
  title: string
  content: string
}

export interface SavedDoc extends UnsavedDoc {
  _id: string
  updated: number
  hasPermission: string[]
}

export interface SomeDoc extends UnsavedDoc {
  _id?: string
  updated?: number
  hasPermission?: string[]
}

export function isSaved(doc: SomeDoc): doc is SavedDoc {
  return !!doc._id
}
