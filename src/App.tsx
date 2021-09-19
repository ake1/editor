import { Box, Container } from '@material-ui/core'
import Editor from './Editor'
import { SnackProvider } from './snacks'
import Toolbar from './Toolbar'

export default function App() {
  return (
    <SnackProvider>
      <Container>
        <Box display="flex" flexDirection="row" gap={1} padding={2}>
          <Box display="flex" flexGrow={1} flexDirection="column" gap={1}>
            <Toolbar />
            <Editor />
          </Box>
        </Box>
      </Container>
    </SnackProvider>
  )
}
