import { ApolloClient, InMemoryCache } from '@apollo/client'
import { Socket } from 'socket.io-client'
import { ref, snapshot } from 'valtio'
import { state } from '.'
import * as api from '../api'
import { DocType, isSaved, SomeDoc, User } from '../types'

export function setContent(content: string) {
  state.doc.content = content
}

export function setTitle(title: string) {
  state.doc.title = title
}

export function setDoc(doc: SomeDoc) {
  state.doc.content = doc.content
  state.doc.title = doc.title
}

export function setDocType(type: DocType) {
  state.doc.type = type
}

export function setDocComment(row: number, comment: string | null) {
  if (!state.doc.comments) state.doc.comments = []
  if (state.doc.comments.length < row + 1) state.doc.comments.length = row + 1
  state.doc.comments[row] = comment
}

export async function saveDocument(doc?: SomeDoc) {
  const snap = snapshot(state)
  const toSave = { ...(doc ?? snap.doc) }
  if (!toSave) return

  if (!toSave.title) {
    const defaultTitle = `Draft - ${new Date().toLocaleDateString()}`
    toSave.title = defaultTitle
    state.doc.title = defaultTitle
  }

  const saved = isSaved(toSave)

  if (saved) {
    await api.update(toSave)
  } else {
    const id = await api.create(toSave)
    state.doc.id = id
  }
  // TODO
  // await loadDocuments()
  return saved
}

export async function deleteDocument(id?: string) {
  const snap = snapshot(state)
  const docId = id ?? snap.doc.id
  if (!docId) return

  await api.deleteOne(docId)
  state.doc.id = undefined
  state.doc.title = ''
  state.doc.content = ''
  state.loadDoc = true
}

export async function loadDocument(id: string) {
  const doc = await api.getOne(id)
  if (!doc) throw Error(`Failed to laod document ${id}`)
  state.doc = doc
  state.loadDoc = true
}

export function doneLoading() {
  state.loadDoc = false
}

export function newDocument() {
  state.doc = {
    title: '',
    content: '',
    type: DocType.HTML,
    comments: [],
  }
  state.loadDoc = true
}

export function setUser(user: User | null) {
  state.user = user
}

export function togglePermission(id: string) {
  if (!state.doc.hasPermission) state.doc.hasPermission = [id]
  else {
    const idx = state.doc.hasPermission.indexOf(id)
    if (idx === -1) state.doc.hasPermission.push(id)
    else state.doc.hasPermission.splice(idx, 1)
  }
}

export function setGqlClient(client: ApolloClient<InMemoryCache>) {
  state.gqlClient = ref(client)
}

export function setWs(ws: Socket) {
  if (!state.ws) state.ws = ref(ws)
}
