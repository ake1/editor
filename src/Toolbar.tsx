import {
  AddCircle,
  Delete,
  DirectionsRun,
  Download,
  FolderOpen,
  LockOpen,
  Logout,
  Save,
} from '@mui/icons-material'
import { Button, CircularProgress, Stack, TextField } from '@mui/material'
import { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import * as api from './api'
import DocumentPicker, { useDocumentPicker } from './DocumentPicker'
import EditPermissions, { useEditPermissions } from './EditPermissions'
import SelectDocType from './SelectDocType'
import { useSnacks } from './snacks'
import {
  deleteDocument,
  newDocument,
  saveDocument,
  setDocType,
  setTitle,
  setUser,
  useSnap,
} from './state'
import { DocType } from './types'
import useExecjs from './util/useExecjs'
import usePdf from './util/usePdf'

export default function Toolbar() {
  const history = useHistory()
  const snap = useSnap()
  const picker = useDocumentPicker()
  const permissions = useEditPermissions()
  const snacks = useSnacks()
  const execjs = useExecjs()
  const pdf = usePdf()

  useEffect(() => {
    console.debug(snap.doc.content)
  }, [snap.doc.content])

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
      history.push('/login')
    } catch {
      snacks.send({ msg: 'Failed to sign out', color: 'error' })
    }
  }, [snacks, history])

  const onDelete = useCallback(async () => {
    if (!snap.doc.id) return
    await deleteDocument()
    snacks.send({ msg: 'Document deleted', color: 'success' })
  }, [snacks, snap.doc.id])

  return (
    <>
      {picker.isOpen ? (
        <DocumentPicker open={picker.isOpen} onClose={picker.onClose} />
      ) : null}
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

        {snap.doc.id ? (
          <Button
            variant="contained"
            color="inherit"
            startIcon={<LockOpen />}
            onClick={permissions.open}
          >
            Edit permissions
          </Button>
        ) : null}

        <Button
          color="inherit"
          variant="contained"
          startIcon={
            pdf.loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <Download />
            )
          }
          onClick={() => pdf.download(snap.doc.content, snap.doc.title)}
        >
          Export PDF
        </Button>

        {snap.doc.id ? (
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

      <Stack direction="row" height={50} pt={1} pb={1}>
        <TextField
          sx={{ mr: 1 }}
          label="Title"
          value={snap.doc.title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />

        {snap.doc.type === DocType.JAVASCRIPT ? (
          <Button
            sx={{ mr: 1, height: 54, padding: 3 }}
            variant="contained"
            color="secondary"
            startIcon={
              execjs.loading ? (
                <CircularProgress size={30} color="inherit" />
              ) : (
                <DirectionsRun />
              )
            }
            onClick={() => execjs.execute(snap.doc.content)}
          >
            Execute
          </Button>
        ) : null}

        <SelectDocType value={snap.doc.type} setValue={(v) => setDocType(v)} />
      </Stack>
    </>
  )
}
