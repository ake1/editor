import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import * as api from './api'
import SignUp from './SignUp'
import { useSnacks } from './snacks'
import { setUser } from './state'

export default function Login() {
  const [signingUp, setSigningUp] = useState(false)
  const snacks = useSnacks()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const signUp = useCallback(() => {
    setSigningUp(true)
  }, [setSigningUp])

  const doneSignUp = useCallback(
    (cancel: boolean) => {
      setSigningUp(false)
      if (!cancel) snacks.send({ msg: 'Sign up successful' })
    },
    [snacks],
  )

  const signIn = useCallback(async () => {
    try {
      await api.signIn({ username, password })
      const user = await api.getUser()
      snacks.send({ msg: 'Sign in successful' })
      setUser(user)
    } catch (e) {
      snacks.send({ msg: 'Error logging in', color: 'error' })
    }
  }, [password, snacks, username])

  return (
    <Paper sx={{ width: 400, ml: 40, mr: 40, mt: 40, p: 2 }}>
      {signingUp ? (
        <SignUp doneSignUp={doneSignUp} />
      ) : (
        <Box component="form" display="flex" flexDirection="column">
          <Typography variant="h4">Login</Typography>
          <Typography>
            Don't have an account? <Button onClick={signUp}>Sign up</Button>
          </Typography>

          <TextField
            autoFocus={true}
            sx={{ mt: 1, flexGrow: 1 }}
            required
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => (e.key === 'Enter' ? signIn() : null)}
          />

          <TextField
            sx={{ mt: 1, flexGrow: 1 }}
            required
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => (e.key === 'Enter' ? signIn() : null)}
          />

          <Button
            sx={{ mt: 1, flexGrow: 1 }}
            variant="contained"
            onClick={signIn}
          >
            Sign in
          </Button>
        </Box>
      )}
    </Paper>
  )
}
