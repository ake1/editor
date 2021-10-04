import {
  AddCircle,
  Delete,
  FolderOpen,
  LockOpen,
  Logout,
  Save,
} from '@mui/icons-material'
import { Box, Button, Stack, TextField } from '@mui/material'
import { useCallback, useEffect } from 'react'
import * as api from './api'
import DocumentPicker, { useDocumentPicker } from './DocumentPicker'
import EditPermissions, { useEditPermissions } from './EditPermissions'
import { useSnacks } from './snacks'
import {
  deleteDocument,
  loadDocuments,
  newDocument,
  saveDocument,
  setTitle,
  setUser,
  useSnap,
} from './state'

export default function Toolbar() {
  const snap = useSnap()
  const picker = useDocumentPicker()
  const permissions = useEditPermissions()
  const snacks = useSnacks()

  useEffect(() => {
    loadDocuments()
  }, [])

  const onSave = useCallback(async () => {
    const updated = await saveDocument()
    snacks.send({
      msg: updated ? 'Document updated' : 'Document saved',
      color: 'success',
    })
  }, [snacks])

  const onSignOut = useCallback(async () => {
    try {
      await api.signOut()
      setUser(null)
      newDocument()
      snacks.send({ msg: 'Signed out', color: 'success' })
    } catch {
      snacks.send({ msg: 'Failed to sign out', color: 'error' })
    }
  }, [snacks])

  const onDelete = useCallback(async () => {
    if (snap.doc._id) {
      await deleteDocument()
      snacks.send({ msg: 'Document deleted', color: 'success' })
    }
  }, [snacks, snap.doc._id])

  return (
    <>
      <DocumentPicker open={picker.isOpen} onClose={picker.onClose} />
      <EditPermissions
        open={permissions.isOpen}
        onClose={permissions.onClose}
      />
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<FolderOpen />}
          onClick={async () => {
            await loadDocuments()
            picker.open()
          }}
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
          onClick={onSave}
        >
          Save
        </Button>

        {snap.doc._id ? (
          <Button
            variant="contained"
            color="inherit"
            startIcon={<LockOpen />}
            onClick={permissions.open}
          >
            Edit permissions
          </Button>
        ) : null}

        {snap.doc._id ? (
          <Button
            color="error"
            variant="contained"
            startIcon={<Delete />}
            onClick={onDelete}
          >
            Delete
          </Button>
        ) : null}
        <Button
          color="inherit"
          variant="contained"
          startIcon={<Logout />}
          onClick={onSignOut}
        >
          Sign out
        </Button>
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
