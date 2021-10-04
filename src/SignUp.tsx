import { Box, Button, TextField, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import * as api from './api'
import { useSnacks } from './snacks'

interface Props {
  doneSignUp: (cancel: boolean) => void
}

export default function SignUp(props: Props) {
  const snacks = useSnacks()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const signUp = useCallback(async () => {
    try {
      const r = await api.signUp({ username, password })
      if (r) props.doneSignUp(false)
    } catch (e) {
      snacks.send({ msg: 'Sign up failed', color: 'error' })
    }
  }, [password, props, snacks, username])

  return (
    <Box component="form" display="flex" flexDirection="column">
      <Typography variant="h4">Sign up</Typography>
      <TextField
        sx={{ mt: 1, flexGrow: 1 }}
        required
        id="username"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        sx={{ mt: 1, flexGrow: 1 }}
        required
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Box display="flex" flexDirection="row">
        <Button
          sx={{ mt: 1, mr: 1, flexGrow: 1 }}
          variant="contained"
          color="inherit"
          onClick={() => props.doneSignUp(true)}
        >
          Cancel
        </Button>

        <Button
          sx={{ mt: 1, flexGrow: 1 }}
          variant="contained"
          onClick={signUp}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  )
}
