import { useCallback, useState } from 'react'
import * as api from '../api'
import downloadBlob from './download-blob'

export default function usePdf() {
  const [loading, setLoading] = useState(false)

  const download = useCallback(async (content: string, title: string) => {
    try {
      setLoading(true)
      const blob = await api.getAsPDF(content)
      downloadBlob(
        blob,
        title ? title : `Draft - ${new Date().toLocaleDateString()}`,
      )
    } finally {
      setLoading(false)
    }
  }, [])

  return { loading, download }
}
