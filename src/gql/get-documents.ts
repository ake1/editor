import { gql } from '@apollo/client'

export type DocumentsData = {
  id: string
  title: string
}

export type GetDocumentsData = {
  documents: DocumentsData[]
}

export const GET_DOCUMENTS = gql`
  query {
    documents {
      id
      title
    }
  }
`
