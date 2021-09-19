import { useCallback, useContext, useEffect, useState } from 'react'
import { SnackContext } from './SnackContext'
import { Snack } from './types'

export function useSnacks() {
  const ctx = useContext(SnackContext)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const send = useCallback(
    (snack: Snack) => {
      ctx.setSnacks([...ctx.snacks, snack])

      setTimeout(() => {
        if (!mounted) return
        ctx.setSnacks(ctx.snacks.filter((s) => s === snack))
      }, snack.timeout ?? 3_000)
    },
    [ctx, mounted],
  )

  return {
    send,
  }
}
