import { gql } from '@apollo/client'

export type RemoveDocumentData = {
  removeDocument: { id: string }
}

export type RemoveDocumentVariables = { id: string }

export const REMOVE_DOCUMENT = gql`
  mutation removeDocument($id: String!) {
    removeDocument(id: $id) {
      id
    }
  }
`
