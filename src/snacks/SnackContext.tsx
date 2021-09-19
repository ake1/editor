import { createContext, ReactElement, useState } from 'react'
import Snacks from './Snacks'
import { Snack, State } from './types'

export const SnackContext = createContext<State>(undefined as any)

export const SnackProvider = (props: {
  children: ReactElement | ReactElement[]
}) => {
  const [snacks, setSnacks] = useState<Snack[]>([])

  return (
    <SnackContext.Provider value={{ snacks, setSnacks }}>
      {props.children}
      <Snacks />
    </SnackContext.Provider>
  )
}
