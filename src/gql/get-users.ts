import { gql } from '@apollo/client'

export type GetUserData = {
  users: {
    id: string
    username: string
  }[]
}

export const GET_USERS = gql`
  query {
    users {
      id
      username
    }
  }
`
