import { Box, Button, Tooltip, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import CommentDialog, { useCommentDialog } from './CommentDialog'
import { useSnap } from './state'
import useInterval from './util/useInterval'

interface Comment {
  height: string
}

export default function Comments() {
  const snap = useSnap()
  const [comments, setComments] = useState<Comment[]>([])
  const comment = useCommentDialog()
  const [rowId, setRowId] = useState<number | null>(null)

  const editComment = useCallback(
    (row: number) => {
      setRowId(row)
      comment.open()
    },
    [comment],
  )

  const hasComment = useCallback(
    (idx) => {
      return !!snap.doc.comments[idx]
    },
    [snap.doc.comments],
  )

  useInterval(() => {
    const editorElement = document.querySelector('.ql-editor')
    if (!editorElement) return
    const rows = Array.from(editorElement?.childNodes) as HTMLElement[]
    const a = rows.reduce<Comment[]>((acc, curr) => {
      if (curr.tagName === 'OL' || curr.tagName === 'UL') {
        const lis = Array.from(curr.childNodes) as HTMLLIElement[]
        for (const li of lis) {
          acc.push({ height: li.offsetHeight + 'px' })
        }
      } else {
        acc.push({ height: curr.offsetHeight + 'px' })
      }
      return acc
    }, [])

    setComments(a)
  }, 1000)

  return (
    <>
      {rowId !== null && comment.isOpen ? (
        <CommentDialog
          row={rowId}
          comment={snap.doc.comments[rowId]}
          open={comment.isOpen}
          onClose={comment.onClose}
        />
      ) : null}
      <Box width="150px">
        <Box fontFamily="sans-serif" p={1}>Hover for comment</Box>
        {comments.map((c, idx) => {
          return (
            <Tooltip
              key={idx}
              title={
                hasComment(idx) ? (
                  <Typography>{snap.doc.comments[idx]}</Typography>
                ) : (
                  ''
                )
              }
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  height: c.height,
                  fontFamily: 'sans-serif',
                }}
              >
                <>
                  <Box ml={1} sx={{ display: 'table' }}>
                    <Box
                      sx={{ display: 'table-cell', verticalAlign: 'middle' }}
                    >
                      {idx + 1}
                    </Box>
                  </Box>
                  {hasComment(idx) ? (
                    <Button
                      sx={{ width: 100, mr: 1 }}
                      variant="contained"
                      color="primary"
                      onClick={() => editComment(idx)}
                    >
                      Edit
                    </Button>
                  ) : (
                    <Button
                      sx={{ width: 100, mr: 1 }}
                      color="inherit"
                      onClick={() => editComment(idx)}
                    >
                      Comment
                    </Button>
                  )}
                </>
              </Box>
            </Tooltip>
          )
        })}
      </Box>
    </>
  )
}
