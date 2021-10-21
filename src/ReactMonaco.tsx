import Editor from '@monaco-editor/react'
import { Box } from '@mui/material'
import { ReactElement } from 'react'

interface Props {
  value: string
  onChange: (val: string) => void
  children?: ReactElement | ReactElement[]
}

export default function ReactMonaco(props: Props) {
  return (
    <Editor
      value={props.value}
      onChange={(e) => {
        props.onChange(e ?? '')
      }}
      defaultLanguage="javascript"
      height={600}
    >
      <Box height={600} />
    </Editor>
  )
}
