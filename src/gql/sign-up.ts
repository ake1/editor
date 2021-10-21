import { gql } from '@apollo/client'

export type SignUpData = {
  id: string
  username: string
}

export type SignUpVariables = {
  username: string
  password: string
}

export const SIGN_UP = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(createUserInput: { username: $username, password: $password }) {
      id
      username
    }
  }
`
