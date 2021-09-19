import { useCallback, useContext } from 'react'
import { SnackContext } from './SnackContext'
import { Snack } from './types'

export function useSnacks() {
  const ctx = useContext(SnackContext)

  const send = useCallback(
    (snack: Snack) => {
      ctx.setSnacks([...ctx.snacks, snack])

      setTimeout(() => {
        ctx.setSnacks(ctx.snacks.filter((s) => s === snack))
      }, snack.timeout ?? 3_000)
    },
    [ctx],
  )

  return {
    send,
  }
}
