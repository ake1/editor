import { ApolloClient, InMemoryCache } from '@apollo/client'
import { Socket } from 'socket.io-client'

export enum DocType {
  JAVASCRIPT = 'JAVASCRIPT',
  HTML = 'HTML',
}

export type WithoutId<T> = Omit<T, 'id'>
export type With<T> = T & { id: string }

export interface User {
  id: string
  username: string
}

export interface State {
  doc: SomeDoc
  loadDoc: boolean
  user: User | null
  gqlClient: ApolloClient<InMemoryCache> | null
  ws: Socket | null
}

export interface DocMeta {
  id: string
  title: string
}

export interface UnsavedDoc {
  title: string
  content: string
  type: DocType
  comments: (string | null)[]
}

export interface SavedDoc extends UnsavedDoc {
  id: string
  updated: string
  hasPermission: string[]
}

export interface SomeDoc extends UnsavedDoc {
  id?: string
  updated?: string
  hasPermission?: string[]
}

export function isSaved(doc: SomeDoc): doc is SavedDoc {
  return !!doc.id
}
