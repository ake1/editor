import { useCallback, useContext } from 'react'
import EditorContext from './EditorContext'

export default function Toolbar() {
  const ctx = useContext(EditorContext)

  const save = useCallback(() => {
    console.log(ctx.text)
  }, [ctx])

  // use styled components
  return (
    <div
      style={{
        display: 'flex',
        gap: '5px',
        backgroundColor: '#bbb',
        padding: '3px',
      }}
    >
      <button
        style={{
          borderRadius: '0px',
          border: '1px solid #999',
          backgroundColor: '#bbb',
          color: '#111',
        }}
        onClick={save}
      >
        Save
      </button>
    </div>
  )
}
