import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, NextLink } from "apollo-link";
import fetch from 'isomorphic-fetch';
//'https://ng5brwbgvk.execute-api.us-west-2.amazonaws.com/prod/graphql'
//http://localhost:3001/graphql
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
  fetch
});


const authLink = setContext(async (_, { headers }) => {
  const token = localStorage.getItem('@token');

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const updateToken = async (newToken: string) => {
  localStorage.setItem('@token', newToken);
}

const afterwareLink = new ApolloLink((operation, forward) =>
  (forward as NextLink)(operation).map(response => {
    const context = operation.getContext()
    const { response: { headers } } = context
    if (headers) {
      const token = headers.get('x-refresh-token')
      if (token) {
        updateToken(token);
      }
    }
    return response
  }),
)

const links = [
  afterwareLink,
  authLink,
  httpLink
]

const link = ApolloLink.from(links)

const client = new ApolloClient({  
  link: link,
  cache: (new InMemoryCache()).restore({})
})

export default client