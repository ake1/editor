import { gql } from '@apollo/client'
import { DocType } from '../types'

export type UpdateDocumentData = {
  updateDocument: { id: string }
}

export type AllUpdateDocumentVariables = {
  title: string
  content: string
  type: DocType
  updated: string
  hasPermission: string[]
  comments: (string | null)[]
}

export type UpdateDocumentVariables = Partial<AllUpdateDocumentVariables>

export const UPDATE_DOCUMENT = gql`
  mutation updateDocument(
    $id: String!
    $title: String
    $content: String
    $type: DocumentType
    $updated: String
    $hasPermission: [String!]
    $comments: [String]
  ) {
    updateDocument(
      updateDocumentInput: {
        id: $id
        title: $title
        content: $content
        type: $type
        updated: $updated
        hasPermission: $hasPermission
        comments: $comments
      }
    ) {
      id
    }
  }
`
