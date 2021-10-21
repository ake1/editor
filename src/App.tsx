import { Box, Container } from '@mui/material'
import { Suspense, useEffect } from 'react'
import { Route, useHistory } from 'react-router-dom'
import * as api from './api'
import Apollo from './Apollo'
import Editor from './Editor'
import Login from './Login'
import { SnackProvider } from './snacks'
import { setUser, useSnap } from './state'
import Toolbar from './Toolbar'

export default function App() {
  const snap = useSnap()
  const history = useHistory()

  useEffect(() => {
    api
      .getUser()
      .then((u) => {
        setUser(u)
      })
      .catch(() => {
        setUser(null)
        history.push('/login')
      })
  }, [history])

  return (
    <Apollo>
      <SnackProvider>
        <Container>
          {snap.user ? (
            <Box display="flex" flexDirection="row" gap={1} padding={2}>
              <Box display="flex" flexGrow={1} flexDirection="column" gap={1}>
                <Suspense fallback={'Loading...'}>
                  <Toolbar />
                </Suspense>
                <Editor />
              </Box>
            </Box>
          ) : null}

          <Route path="/login">
            <Login />
          </Route>
        </Container>
      </SnackProvider>
    </Apollo>
  )
}
