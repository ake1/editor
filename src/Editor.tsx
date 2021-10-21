import { Paper } from '@mui/material'
import { useCallback } from 'react'
import 'react-quill/dist/quill.snow.css'
import ReactMonaco from './ReactMonaco'
import ReactQuill from './ReactQuill'
import { setContent, useSnap } from './state'
import { DocType } from './types'
import useSocketIO from './useSocketIO'

export default function Editor() {
  const snap = useSnap()
  useSocketIO('/')

  const onMonacoChange = useCallback((content: string) => {
    setContent(content)
  }, [])

  const onQuillChange = useCallback((content: string) => {
    setContent(content)
  }, [])

  return (
    <Paper>
      {snap.doc.type === DocType.JAVASCRIPT ? (
        <ReactMonaco value={snap.doc.content} onChange={onMonacoChange} />
      ) : (
        <ReactQuill value={snap.doc.content} onChange={onQuillChange} />
      )}
    </Paper>
  )
}
