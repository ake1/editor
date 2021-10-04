import { useEffect, useState } from 'react'
import { getUsers } from './api'
import { User } from './types'

export default function useUsers() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    getUsers().then((u) => {
      setUsers(u)
    })
  }, [])

  return users
}
