import { useMutation } from '@apollo/client'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import SIGN_UP from './gql/sign-up'
import { useSnacks } from './snacks'

interface Props {
  doneSignUp: (cancel: boolean) => void
}

export default function SignUp(props: Props) {
  const snacks = useSnacks()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [signUpMutation, { error, data }] = useMutation<
    {
      _id: string
      username: string
    },
    {
      username: string
      password: string
    }
  >(SIGN_UP, {
    variables: {
      username,
      password,
    },
  })

  const sentError = useRef(false)
  const resetError = () => (sentError.current = false)

  useEffect(() => {
    if (!error) return
    if (sentError.current) return
    sentError.current = true
    snacks.send({ msg: 'Sign up failed', color: 'error' })
  }, [error, snacks])

  useEffect(() => {
    if (data) {
      props.doneSignUp(false)
    }
  }, [data, props])

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
          onClick={() => {
            resetError()
            signUpMutation()
          }}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  )
}
