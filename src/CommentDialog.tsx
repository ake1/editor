import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  InputBase,
  Paper,
} from '@mui/material'
import { useCallback, useState } from 'react'
import { setDocComment } from './state'

export interface SimpleDialogProps {
  open: boolean
  row: number
  comment: string | null
  onClose: () => void
}

export default function CommentDialog(props: SimpleDialogProps) {
  const [comment, setComment] = useState(props.comment)

  const ok = useCallback(() => {
    setDocComment(props.row, comment ? comment : null)
    props.onClose()
  }, [comment, props])

  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <DialogTitle>Comment</DialogTitle>

      <Paper sx={{ ml: 2, mr: 2, mb: 2, pl: 2, width: 250, display: 'flex' }}>
        <InputBase
          multiline={true}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ minHeight: 100, flexGrow: 1 }}
        />
      </Paper>

      <DialogActions>
        <Button onClick={props.onClose} autoFocus>
          Cancel
        </Button>
        <Button onClick={ok} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export function useCommentDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  return { isOpen, open, onClose }
}
