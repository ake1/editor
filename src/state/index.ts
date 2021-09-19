import { proxy, useSnapshot } from 'valtio'
import { State } from '../types'
export * from './actions'

export const state = proxy<State>({
  availableDocs: [],
  doc: {
    title: '',
    content: '',
  },
  loadDoc: false,
})

export function useSnap() {
  return useSnapshot(state)
}
