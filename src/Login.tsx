import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import { Route, useHistory } from 'react-router-dom'
import * as api from './api'
import SignUp from './SignUp'
import { useSnacks } from './snacks'
import { setUser } from './state'

export default function Login() {
  const snacks = useSnacks()
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const signUp = useCallback(() => {
    history.push('/login/signup')
  }, [history])

  const doneSignUp = useCallback(
    (cancel: boolean) => {
      history.push('/login')
      if (!cancel) snacks.send({ msg: 'Sign up successful' })
    },
    [snacks, history],
  )

  const signIn = useCallback(async () => {
    try {
      await api.signIn({ username, password })
      const user = await api.getUser()
      snacks.send({ msg: 'Sign in successful' })
      setUser(user)
    } catch (e) {
      snacks.send({ msg: 'Error logging in', color: 'error' })
    } finally {
      history.push('/')
    }
  }, [password, snacks, username, history])

  return (
    <Paper sx={{ width: 400, ml: 40, mr: 40, mt: 40, p: 2 }}>
      <Route path="/login/signup">
        <SignUp doneSignUp={doneSignUp} />
      </Route>

      <Route exact path="/login">
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
      </Route>
    </Paper>
  )
}
