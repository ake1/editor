import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
} from '@apollo/client'
import { ReactNode } from 'react'
import { setGqlClient } from './state'

export default function Apollo({
  children,
}: {
  children?: ReactNode | ReactNode[]
}) {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: '/graphql',
    typeDefs: gql`
      enum DocumentType {
        JAVASCRIPT
        HTML
      }
    `,
  })

  setGqlClient(client as any)

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
