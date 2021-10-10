import { gql } from '@apollo/client'

const GET_USERS = gql`
  query {
    users {
      _id
      username
    }
  }
`

export default GET_USERS
