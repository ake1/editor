import { ref } from 'valtio'
import * as api from '../api'
import { isSaved, SomeDoc } from '../types'
import { Editor as TrixEditor } from 'react-trix'
import { state } from '.'

export function setContent(content: string) {
  state.doc.content = content
}

export function setTitle(title: string) {
  state.doc.title = title
}

export async function saveDocument(doc: SomeDoc) {
  if (isSaved(doc)) {
    await api.update(doc)
  } else {
    const id = await api.create(doc)
    state.doc._id = id
  }
  await loadDocuments()
}

export async function deleteDocument(id: string) {
  await api.deleteOne(id)
  state.doc._id = undefined
  state.doc.title = 'untitled'
  state.doc.content = ''
  state.loadDoc = true
  await loadDocuments()
}

export async function loadDocuments() {
  const docs = await api.getAll()
  state.docs = docs
}

export async function loadDocument(id: string) {
  const doc = await api.getOne(id)
  state.doc = doc
  state.loadDoc = true
}

export function doneLoading() {
  state.loadDoc = false
}

export function setEditorRef(trixEditor: TrixEditor) {
  state.editorRef = ref(trixEditor)
}

export function newDocument() {
  state.doc = {
    title: 'untitled',
    content: '',
  }
  state.loadDoc = true
}
