import { useCallback, useEffect } from 'react'
import 'trix/dist/trix'
import 'trix/dist/trix.css'
import { Editor as TEditor, TrixEditor } from 'react-trix'
import { doneLoading, setContent, setEditorRef, useSnap } from './state'

export default function Editor() {
  const snap = useSnap()

  useEffect(() => {
    if (!snap.loadDoc) return
    const e = snap.editorRef as any
    e.loadJSON({ document: [] })
    e.insertHTML(snap.doc.content)
    doneLoading()
  }, [snap.doc.content, snap.editorRef, snap.loadDoc])

  const onEditorReady = useCallback(
    (teditor: TEditor) => {
      const e = teditor as any
      e.insertHTML(snap.doc ? snap.doc.content : '')
      setEditorRef(teditor)
    },
    [snap.doc],
  )

  const onChange = useCallback((html: string) => {
    setContent(html)
  }, [])

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
