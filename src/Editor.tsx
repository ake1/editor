import { Box, Paper } from '@material-ui/core'
import { useCallback } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { setContent, useSnap } from './state'
import useSocketIO from './useSocketIO'

export default function Editor() {
  const snap = useSnap()
  useSocketIO('http://localhost:1234')

  const onChange = useCallback((content: string) => {
    setContent(content)
  }, [])

  return (
    <Paper>
      <ReactQuill value={snap.doc.content} onChange={onChange}>
        <Box height={600} />
      </ReactQuill>
    </Paper>
  )
}
