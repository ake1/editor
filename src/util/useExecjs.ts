import { useCallback, useState } from 'react'
import * as api from '../api'

export default function useExecjs() {
  const [loading, setLoading] = useState(false)

  const execute = useCallback(async (code: string) => {
    try {
      setLoading(true)
      const res = await api.execjs(code)
      alert(res)
    } finally {
      setLoading(false)
    }
  }, [])

  return { loading, execute }
}
