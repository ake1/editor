import { useCallback, useEffect, useRef } from 'react'
import socketIOClient from 'socket.io-client'
import { useDebouncedCallback } from 'use-debounce/lib'
import { setDoc, setWs, useSnap } from './state'
import { isSaved, SavedDoc, SomeDoc } from './types'

function sameDoc(doc1: SomeDoc | null, doc2: SomeDoc | null) {
  if (!doc1 || !doc2) return false
  if (doc1.title !== doc2.title) return false
  if (doc1.content !== doc2.content) return false
  return true
}

function createSocket(url: string) {
  return socketIOClient(url, {
    path: '/document-updates',
    transports: ['websocket'],
  })
}

export default function useSocketIO(url: string) {
  const snap = useSnap()
  const latestUpdate = useRef<SavedDoc | null>(null)

  useEffect(() => {
    if (!snap.ws) setWs(createSocket(url))
  }, [snap.ws, url])

  const client = snap.ws

  useEffect(() => {
    if (!latestUpdate.current && snap.doc.updated) {
      latestUpdate.current = snap.doc as SavedDoc
    }
  }, [snap.doc])

  const onDoc = useCallback(
    (doc: SavedDoc) => {
      if (!snap.doc.updated) return
      if (sameDoc(doc, snap.doc)) return
      latestUpdate.current = doc
      setDoc(doc)
    },
    [snap.doc],
  )

  const emitDoc = useDebouncedCallback((doc: SavedDoc) => {
    if (!sameDoc(latestUpdate.current, doc)) {
      client?.emit('doc', doc)
    }
  }, 1000)

  useEffect(() => {
    if (!client) return
    const c = client
    c.on('doc', onDoc)
    return () => {
      c.off('doc', onDoc)
    }
  }, [client, onDoc])

  useEffect(() => {
    if (!client || !snap.doc.id) return
    const c = client
    c.emit('create', snap.doc.id)
    return () => void c.emit('leave', snap.doc.id)
  }, [client, snap.doc.id])

  useEffect(() => {
    if (!client || !isSaved(snap.doc)) return
    emitDoc(snap.doc)
  }, [snap.doc, emitDoc, snap.doc.title, snap.doc.content, client])
}
