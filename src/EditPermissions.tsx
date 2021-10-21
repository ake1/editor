import { useQuery } from '@apollo/client'
import { Clear, Person } from '@mui/icons-material'
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Switch,
} from '@mui/material'
import { blue } from '@mui/material/colors'
import { useCallback, useState } from 'react'
import { GetUserData, GET_USERS } from './gql/get-users'
import { togglePermission, useSnap } from './state'

export interface SimpleDialogProps {
  open: boolean
  onClose: () => void
}

export default function EditPermissions(props: SimpleDialogProps) {
  const snap = useSnap()
  const [filter, setFilter] = useState('')
  const { onClose, open } = props
  const { data } = useQuery<GetUserData>(GET_USERS)

  const hasPermission = useCallback(
    (id) => {
      const idx = snap.doc.hasPermission?.indexOf(id)
      if (idx === undefined) return false
      return idx !== -1
    },
    [snap.doc.hasPermission],
  )

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Edit access list</DialogTitle>

      <Paper sx={{ ml: 2, mr: 2, mb: 2, pl: 2, width: 250, display: 'flex' }}>
        <InputBase
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter"
          sx={{ flexGrow: 1 }}
        />
        {filter ? (
          <IconButton
            onClick={() => {
              setFilter('')
            }}
          >
            <Clear />
          </IconButton>
        ) : null}
      </Paper>

      <List sx={{ pt: 0 }}>
        {data?.users
          ?.filter((user) => user.username.includes(filter))
          ?.filter((user) => user.username !== snap.user?.username)
          .map((user) => (
            <ListItem button key={user.username}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.username} />
              <Switch
                onChange={() => {
                  togglePermission(user.id)
                }}
                checked={hasPermission(user.id)}
              ></Switch>
            </ListItem>
          ))}
      </List>

      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export function useEditPermissions() {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  return { isOpen, open, onClose }
}
