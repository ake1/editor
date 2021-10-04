import { createContext, ReactElement, useEffect, useState } from 'react'
import Snacks from './Snacks'
import { Snack, State } from './types'

export const SnackContext = createContext<State>(undefined as any)

export const SnackProvider = (props: {
  children: ReactElement | ReactElement[]
}) => {
  const [snacks, setSnacks] = useState<Snack[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  return (
    <SnackContext.Provider value={{ snacks, setSnacks, mounted }}>
      {props.children}
      <Snacks />
    </SnackContext.Provider>
  )
}
