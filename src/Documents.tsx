import { useEffect } from 'react'
import {
  deleteDocument,
  loadDocument,
  loadDocuments,
  setTitle,
  useSnap,
} from './state'

export function Documents() {
  const snap = useSnap()

  useEffect(() => {
    loadDocuments()
  }, [])

  return (
    <div style={{ width: '100%', paddingTop: '20px' }}>
      {snap.docs.map((e) => {
        const isLoaded = snap.doc._id === e._id
        return (
          <div
            key={e._id}
            style={{
              color: isLoaded ? '#9d7cd8' : 'black',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            {isLoaded ? (
              <input
                type="text"
                style={{ width: '100%' }}
                value={snap.doc.title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
            ) : (
              <div
                onClick={() => loadDocument(e._id)}
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {e.title}
              </div>
            )}
            <button
              onClick={() => {
                if (!e._id) return
                deleteDocument(e._id)
              }}
            >
              x
            </button>
          </div>
        )
      })}
    </div>
  )
}
