import Vue from "vue"
import VueApollo from "vue-apollo"
import ApolloClient from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { split } from "apollo-link"
import { setContext } from "apollo-link-context"
import { onError } from "apollo-link-error"
import { HttpLink } from "apollo-link-http"
import { WebSocketLink } from "apollo-link-ws"
import { getMainDefinition } from "apollo-utilities"
import { AUTH_TOKEN_NAME, HTTP_API_ENDPOINT_URI, WS_KEEP_ALIVE_TIMEOUT, WS_API_ENDPOINT_URI } from "../constants/settings"
import { SubscriptionClient } from "subscriptions-transport-ws"

Vue.use(VueApollo)

const getHeaders = (): { Authorization?: string } => {
  const headers = {} as { Authorization?: string }
  const token = localStorage.getItem(AUTH_TOKEN_NAME)
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  // console.log('[ApolloService] headers', headers)
  return headers
}

const httpLink = new HttpLink({
  uri: HTTP_API_ENDPOINT_URI,
})

export const wsClient = new SubscriptionClient(WS_API_ENDPOINT_URI, {
  reconnect: true,
  lazy: true,
  timeout: WS_KEEP_ALIVE_TIMEOUT,
  connectionParams: () => {
    console.log('[ApolloService] get connection params for wslink')
    return {
      ...getHeaders(),
    }
  },
})

wsClient.onConnected(() => {
  console.log('[ApolloService] ' + new Date().toLocaleTimeString() + " - ws connected")
})

wsClient.onDisconnected(() => {
  console.log('[ApolloService] ' + new Date().toLocaleTimeString() + " - ws disconnected")
})

wsClient.onError((error) => {
  console.log('[ApolloService] ' + new Date().toLocaleTimeString() + " - ws disconnected", error)
})

const wsLink = new WebSocketLink(wsClient)

const authLink = setContext((_, { headers }) => {
  console.log('[ApolloService] auth link - add authorization headers')
  return {
    headers: {
      ...headers,
      ...getHeaders(),
    },
  }
})

const errorHandler = onError(({ graphQLErrors, networkError }) => {
  console.log('[ApolloService] error handler')
  if (graphQLErrors) {
    graphQLErrors.forEach((err) => {
      const { message, locations, path, extensions } = err
      console.log(`[ApolloService] [GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Extensions: ${extensions}`)
    })
  }
  if (networkError) {
    console.log(`[ApolloService] [Network error]: ${networkError}`)
  }
})

const link = split(
  (operation): boolean => {
    const definition = getMainDefinition(operation.query)
    const isWs =
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    if (isWs) {
      console.log('[ApolloService] route to ws')
    } else {
      console.log('[ApolloService] route to http')
    }
    return isWs
  },
  errorHandler.concat(wsLink),
  authLink.concat(errorHandler).concat(httpLink)
)

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: true,
  }),
  connectToDevTools: true,
})

export function createApolloProvider(): VueApollo {
  return new VueApollo({
    defaultClient: apolloClient,
  })
}
