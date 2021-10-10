import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ReactNode } from 'react'

export default function Apollo({
  children,
}: {
  children?: ReactNode | ReactNode[]
}) {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: '/graphql',
  })
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
