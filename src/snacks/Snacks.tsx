import { Alert, Snackbar } from '@material-ui/core'
import { useContext, useRef } from 'react'
import { SnackContext } from './SnackContext'

export default function Snacks() {
  const ctx = useContext(SnackContext)
  const idx = useRef(0)

  return (
    <>
      {ctx.snacks.map((n) => {
        return (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={true}
            key={idx.current++}
          >
            <Alert severity={n.color ?? 'info'} sx={{ width: '100%' }}>
              {n.msg}
            </Alert>
          </Snackbar>
        )
      })}
    </>
  )
}
