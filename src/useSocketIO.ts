import { useCallback, useEffect, useRef } from 'react'
import socketIOClient from 'socket.io-client'
import { useDebouncedCallback } from 'use-debounce/lib'
import { setDoc, useSnap } from './state'
import { isSaved, SavedDoc, SomeDoc } from './types'

function sameDoc(doc1: SomeDoc | null, doc2: SomeDoc | null) {
  if (!doc1 || !doc2) return false
  if (doc1.title !== doc2.title) return false
  if (doc1.content !== doc2.content) return false
  return true
}

export default function useSocketIO(url: string) {
  const snap = useSnap()
  const latestUpdate = useRef<SavedDoc | null>(null)
  const client = useRef(socketIOClient(url))

  useEffect(() => {
    if (!latestUpdate.current && snap.doc.updated) {
      latestUpdate.current = snap.doc as SavedDoc
    }
  }, [snap.doc])

  const onDoc = useCallback(
    (doc: SavedDoc) => {
      if (!snap.doc.updated) return
      if (doc.updated <= snap.doc.updated) return
      if (sameDoc(doc, snap.doc)) return
      latestUpdate.current = doc
      setDoc(doc)
    },
    [snap.doc],
  )

  const emitDoc = useDebouncedCallback((doc: SavedDoc) => {
    if (!sameDoc(latestUpdate.current, doc)) {
      client.current.emit('doc', doc)
    }
  }, 1000)

  useEffect(() => {
    if (!client) return
    const c = client.current
    c.on('doc', onDoc)
    return () => void c.off('doc', onDoc)
  }, [client, onDoc])

  useEffect(() => {
    if (!client || !snap.doc._id) return
    const c = client.current
    c.emit('create', snap.doc._id)
    return () => void c.emit('leave', snap.doc._id)
  }, [snap.doc._id])

  useEffect(() => {
    if (!client || !isSaved(snap.doc)) return
    emitDoc(snap.doc)
  }, [snap.doc, emitDoc, snap.doc.title, snap.doc.content])
}
