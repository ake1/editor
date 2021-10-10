import { Box, Container } from '@mui/material'
import { Suspense, useEffect } from 'react'
import * as api from './api'
import Apollo from './Apollo'
import Editor from './Editor'
import Login from './Login'
import { SnackProvider } from './snacks'
import { setUser, useSnap } from './state'
import Toolbar from './Toolbar'

export default function App() {
  const snap = useSnap()

  useEffect(() => {
    api
      .getUser()
      .then((u) => {
        setUser(u)
      })
      .catch(() => {
        setUser(null)
      })
  }, [])

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
          ) : (
            <Login />
          )}
        </Container>
      </SnackProvider>
    </Apollo>
  )
}
