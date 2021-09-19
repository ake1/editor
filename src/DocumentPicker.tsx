import { IconButton, InputBase, Paper } from '@material-ui/core'
import { Clear, Description } from '@mui/icons-material'
import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import { blue } from '@mui/material/colors'
import { useCallback, useState } from 'react'
import { loadDocument, useSnap } from './state'
import { DocMeta } from './types'

export interface SimpleDialogProps {
  open: boolean
  onClose: (value: DocMeta) => void
}

export default function DocumentPicker(props: SimpleDialogProps) {
  const snap = useSnap()
  const [filter, setFilter] = useState('')
  const { onClose, open } = props

  const clearFilter = useCallback(() => {
    setFilter('')
  }, [])

  const handleListItemClick = async (value: DocMeta) => {
    await loadDocument(value._id)
    onClose(value)
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Open file</DialogTitle>

      <Paper sx={{ ml: 2, mr: 2, mb: 2, pl: 2, width: 250, display: 'flex' }}>
        <InputBase
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter"
          sx={{ flexGrow: 1 }}
        />
        {filter ? (
          <IconButton onClick={clearFilter}>
            <Clear />
          </IconButton>
        ) : null}
      </Paper>

      <List sx={{ pt: 0 }}>
        {snap.availableDocs
          .filter((d) => d.title.includes(filter))
          .map((doc) => (
            <ListItem
              button
              onClick={() => handleListItemClick(doc)}
              key={doc._id}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <Description />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={doc.title} />
            </ListItem>
          ))}
      </List>
    </Dialog>
  )
}

export function useDocumentPicker() {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  return { isOpen, open, onClose }
}
