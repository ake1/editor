import { AlertColor } from '@mui/material'

export interface Snack {
  msg: string
  color?: AlertColor
  timeout?: number
}

export interface State {
  snacks: Snack[]
  setSnacks: (snacks: Snack[]) => void
  mounted: boolean
}
