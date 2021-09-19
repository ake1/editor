export interface State {
  doc: SomeDoc
  availableDocs: DocMeta[]
  loadDoc: boolean
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
}

export interface SomeDoc extends UnsavedDoc {
  _id?: string
}

export function isSaved(doc: SomeDoc): doc is SavedDoc {
  return !!doc._id
}
