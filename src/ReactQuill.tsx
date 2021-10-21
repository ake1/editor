import { Box, Stack } from '@mui/material'
import { ReactElement, useCallback } from 'react'
import Quill, { UnprivilegedEditor } from 'react-quill'
import Comments from './Comments'

interface Props {
  value: string
  onChange: (val: string) => void
  children?: ReactElement | ReactElement[]
}

export default function ReactQuill(props: Props) {
  const onChange = useCallback(
    (
      content: string | undefined,
      _delta,
      _source,
      _editor: UnprivilegedEditor,
    ) => {
      props.onChange(content ?? '')
    },
    [props],
  )

  return (
    <Stack direction="row">
      <Quill style={{ flexGrow: 1 }} value={props.value} onChange={onChange}>
        <Box height={600} />
      </Quill>
      <Comments />
    </Stack>
  )
}
