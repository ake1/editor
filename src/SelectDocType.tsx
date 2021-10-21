import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { DocType } from './types'

interface SelectDocTypeProps {
  value: DocType
  setValue: (type: DocType) => void
}

export default function SelectDocType(props: SelectDocTypeProps) {
  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel id="select-doc-type-label">Type</InputLabel>
        <Select
          labelId="select-doc-type-id"
          id="select-doc-type"
          value={props.value}
          label="Document Type"
          onChange={(e) => props.setValue(e.target.value as DocType)}
        >
          <MenuItem value={DocType.HTML}>HTML</MenuItem>
          <MenuItem value={DocType.JAVASCRIPT}>JavaScript</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
