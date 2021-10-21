import { useQuery } from '@apollo/client'
import { Clear, Description } from '@mui/icons-material'
import {
  Avatar,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from '@mui/material'
import { blue } from '@mui/material/colors'
import { useCallback, useEffect, useState } from 'react'
import { GetDocumentsData, GET_DOCUMENTS } from './gql/get-documents'
import { loadDocument } from './state'

export interface SimpleDialogProps {
  open: boolean
  onClose: (id: string) => void
}

export default function DocumentPicker(props: SimpleDialogProps) {
  const [filter, setFilter] = useState('')
  const { onClose, open } = props
  const { loading, data, refetch } = useQuery<GetDocumentsData>(GET_DOCUMENTS)

  useEffect(() => {
    refetch()
  }, [refetch])

  const clearFilter = useCallback(() => {
    setFilter('')
  }, [])

  const handleListItemClick = async (id: string) => {
    await loadDocument(id)
    onClose(id)
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
        {loading ? (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        ) : null}
        {data?.documents
          ? data.documents
              ?.filter((d) => d.title.includes(filter))
              .map((doc) => (
                <ListItem
                  button
                  onClick={() => handleListItemClick(doc.id)}
                  key={doc.id}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                      <Description />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={doc.title} />
                </ListItem>
              ))
          : null}
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
