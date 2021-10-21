import { proxy, snapshot, useSnapshot } from 'valtio'
import { DocType, State } from '../types'
export * from './actions'

export const state = proxy<State>({
  doc: {
    title: '',
    content: '',
    type: DocType.HTML,
    comments: [],
  },
  loadDoc: false,
  user: null,
  gqlClient: null,
  ws: null,
})

export function useSnap() {
  return useSnapshot(state)
}

export function snap() {
  return snapshot(state)
}
