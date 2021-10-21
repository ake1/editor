import { gql } from '@apollo/client'
import { DocType } from '../types'

export type CreateDocumentData = {
  createDocument: { id: string }
}

export type CreateDocumentVariables = {
  title: string
  content: string
  type: DocType
  comments: (string | null)[]
}

export const CREATE_DOCUMENT = gql`
  mutation createDocument(
    $title: String!
    $content: String!
    $type: DocumentType!
    $comments: [String]
  ) {
    createDocument(
      createDocumentInput: {
        title: $title
        content: $content
        type: $type
        comments: $comments
        hasPermission: []
      }
    ) {
      id
    }
  }
`
