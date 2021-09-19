import * as api from '../api'
import { isSaved, SomeDoc } from '../types'
import { state } from '.'
import { snapshot } from 'valtio'

export function setContent(content: string) {
  state.doc.content = content
}

export function setTitle(title: string) {
  state.doc.title = title
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

  if (isSaved(toSave)) {
    await api.update(toSave)
  } else {
    const id = await api.create(toSave)
    state.doc._id = id
  }
  await loadDocuments()
}

export async function deleteDocument(id?: string) {
  const snap = snapshot(state)
  const docId = id ?? snap.doc._id
  if (!docId) return

  await api.deleteOne(docId)
  state.doc._id = undefined
  state.doc.title = ''
  state.doc.content = ''
  state.loadDoc = true
  await loadDocuments()
}

export async function loadDocuments() {
  const docs = await api.getAll()
  state.availableDocs = docs
}

export async function loadDocument(id: string) {
  const doc = await api.getOne(id)
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
  }
  state.loadDoc = true
}
