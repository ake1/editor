import { newDocument, saveDocument, useEditor } from './state'

export default function Toolbar() {
  const doc = useEditor()

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
        onClick={() => saveDocument(doc)}
      >
        Save
      </button>
      <button
        style={{
          borderRadius: '0px',
          border: '1px solid #999',
          backgroundColor: '#bbb',
          color: '#111',
        }}
        onClick={() => newDocument()}
      >
        New
      </button>
    </div>
  )
}
