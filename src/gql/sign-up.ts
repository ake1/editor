import { gql } from '@apollo/client'

const SIGN_UP = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(input: { username: $username, password: $password }) {
      _id
      username
    }
  }
`

export default SIGN_UP
