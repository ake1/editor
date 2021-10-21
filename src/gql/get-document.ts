import { gql } from '@apollo/client'
import { DocType } from '../types'

export type DocumentData = {
  id: string
  title: string
  content: string
  type: DocType
  updated: string
  hasPermission: string[]
  comments: (string | null)[]
}

export type GetDocumentData = {
  document: DocumentData
}

export type GetDocumentVariables = {
  id: string
}

export const GET_DOCUMENT = gql`
  query document($id: String!) {
    document(id: $id) {
      id
      title
      content
      type
      updated
      hasPermission
      comments
    }
  }
`
