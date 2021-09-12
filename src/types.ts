import { Editor as TrixEditor } from 'react-trix'

export interface State {
  editorRef: TrixEditor | null
  doc: SomeDoc
  docs: SlimDoc[]
  loadDoc: boolean
}

export interface SlimDoc {
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
