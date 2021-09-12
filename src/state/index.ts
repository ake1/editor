import { proxy, useSnapshot } from 'valtio'
import { State } from '../types'
export * from './actions'

export const state = proxy<State>({
  docs: [],
  doc: {
    title: 'untitled',
    content: '',
  },
  loadDoc: false,
  editorRef: null,
})

export function useSnap() {
  return useSnapshot(state)
}

export function useEditor() {
  const snap = useSnap()
  return snap.doc
}
