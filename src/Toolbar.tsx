import { Box, Button, Stack, TextField } from '@material-ui/core'
import { AddCircle, Delete, FolderOpen, Save } from '@mui/icons-material'
import { useEffect } from 'react'
import DocumentPicker, { useDocumentPicker } from './DocumentPicker'
import { useSnacks } from './snacks'
import {
  deleteDocument,
  loadDocuments,
  newDocument,
  saveDocument,
  setTitle,
  useSnap,
} from './state'

export default function Toolbar() {
  const snap = useSnap()
  const picker = useDocumentPicker()
  const snacks = useSnacks()

  useEffect(() => {
    loadDocuments()
  }, [])

  return (
    <>
      <DocumentPicker open={picker.isOpen} onClose={picker.onClose} />
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<FolderOpen />}
          onClick={picker.open}
        >
          Open
        </Button>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<AddCircle />}
          onClick={() => newDocument()}
        >
          New
        </Button>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Save />}
          onClick={async () => {
            const updated = await saveDocument()
            snacks.send({
              msg: updated ? 'Document updated' : 'Document saved',
              color: 'success',
            })
          }}
        >
          Save
        </Button>

        {snap.doc._id ? (
          <Button
            color="error"
            variant="contained"
            startIcon={<Delete />}
            onClick={async () => {
              if (snap.doc._id) {
                await deleteDocument()
                snacks.send({ msg: 'Document deleted', color: 'success' })
              }
            }}
          >
            Delete
          </Button>
        ) : null}
      </Stack>

      <Box height={50} pt={1} pb={1}>
        <TextField
          label="Title"
          value={snap.doc.title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
      </Box>
    </>
  )
}
