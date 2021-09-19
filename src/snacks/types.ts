import { AlertColor } from '@material-ui/core'

export interface Snack {
  msg: string
  color?: AlertColor
  timeout?: number
}

export interface State {
  snacks: Snack[]
  setSnacks: (snacks: Snack[]) => void
}
