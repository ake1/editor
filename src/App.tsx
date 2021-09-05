import Editor from './Editor'
import Toolbar from './Toolbar'
import EditorContext from './EditorContext'

export default function App() {
  return (
    <EditorContext.Provider value={{ html: '', text: '' }}>
      <div
        style={{
          margin: '0 auto',
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '20px',
        }}
      >
        <Toolbar />
        <Editor />
      </div>
    </EditorContext.Provider>
  )
}
