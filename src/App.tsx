import { Documents } from './Documents'
import Editor from './Editor'
import Toolbar from './Toolbar'

export default function App() {
  return (
    <div
      style={{
        margin: '0 auto',
        maxWidth: '900px',
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        padding: '20px',
        justifyContent: 'space-between',
      }}
    >
      <Documents />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '20px',
          maxWidth: '700px',
        }}
      >
        <Toolbar />
        <Editor />
      </div>
    </div>
  )
}
