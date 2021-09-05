import { useCallback, useContext } from 'react'
import 'trix/dist/trix'
import 'trix/dist/trix.css'
import { Editor as TEditor, TrixEditor } from 'react-trix'
import EditorContext from './EditorContext'

export default function Editor() {
  const ctx = useContext(EditorContext)

  const onEditorReady = useCallback(
    (editor: TEditor) => {
      editor.insertString(ctx.html ?? ctx.text ?? '')
    },
    [ctx],
  )

  const onChange = useCallback(
    (html: string, text: string) => {
      ctx.html = html
      ctx.text = text
    },
    [ctx],
  )

  return (
    <>
      <TrixEditor
        onChange={onChange}
        onEditorReady={onEditorReady}
        mergeTags={[]}
      />
    </>
  )
}
