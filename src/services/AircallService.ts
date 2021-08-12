import {
  ADD_NOTE,
  ARCHIVE_CALL,
  LOGIN_USER,
  REFRESH_TOKEN,
} from "@/graphql/mutations"
import { GET_CALL, GET_CALLS, GET_CALLS_BY_ID, GET_CALLS_ID_CREATED_AT, GET_CALLS_TOTAL_COUNT, LOGGED_USER } from "@/graphql/queries"
import { ON_UPDATED_CALL } from "@/graphql/subscriptions"
import {
  AuthResponse,
  Call,
  PaginatedCalls,
  User,
} from "@/models/ACTypes"
import { apolloClient, wsClient } from "./ApolloService"

class AircallService {

  async getUser(): Promise<User> {
    const { data } = await apolloClient.query({
      query: LOGGED_USER,
    })
    const user: User = { ...data.me }
    return user
  }

  async getNbTotalCalls(): Promise<number> {
    const { data } = await apolloClient.query({
      query: GET_CALLS_TOTAL_COUNT,
    })
    return data.paginatedCalls.totalCount
  }

  async getCallsId(nbCall: number): Promise<Call[]> {
    const { data } = await apolloClient.query({
      query: GET_CALLS_ID_CREATED_AT,
      variables: {
        offset: 0,
        limit: nbCall
      }
    })
    const nodes: Call[] = data.paginatedCalls.nodes
    return nodes
  }

  async getCallsDetails(callsId: number[]): Promise<Call[]> {
    const variables = {} as Record<string, number>
    for (let i = 0; i < callsId.length; i++) {
      variables[`id_${i}`] = callsId[i]
    }
    const { data } = await apolloClient.query({
      query: GET_CALLS_BY_ID(callsId.length),
      variables
    })
    const calls: Call[] = Object.keys(data).map((callName) => {
      return data[callName]
    })
    return calls
  }

  async getPaginatedCalls(
    offset: number,
    limit: number
  ): Promise<PaginatedCalls> {
    console.log(`[Aircall Service] getPaginatedCalls - ${offset} - ${limit}`)
    const {
      data,
    }: { data: { paginatedCalls: PaginatedCalls } } = await apolloClient.query(
      {
        query: GET_CALLS,
        variables: { offset, limit },
      }
    )
    const paginatedCalls: PaginatedCalls = { ...data.paginatedCalls }
    return paginatedCalls
  }

  async getCall(id: string): Promise<Call> {
    const { data }: { data: { call: Call } } = await apolloClient.query({
      query: GET_CALL,
      variables: { id },
    })
    const call: Call = { ...data.call }
    return call
  }

  async login(username: string, password: string): Promise<AuthResponse> {
    const { data } = await apolloClient.mutate({
      mutation: LOGIN_USER,
      variables: { username, password },
    })
    const authResponse: AuthResponse = { ...data.login }
    return authResponse
  }

  async refreshToken(): Promise<AuthResponse> {
    const { data } = await apolloClient.mutate({
      mutation: REFRESH_TOKEN,
    })
    const authResponse: AuthResponse = { ...data.refreshToken }
    return authResponse
  }

  async archiveCall(id: number): Promise<Call> {
    const { data } = await apolloClient.mutate({
      mutation: ARCHIVE_CALL,
      variables: { id },

    })
    const call: Call = { ...data.archiveCall }
    return call
  }

  async addNote(id: number, content: string): Promise<Call> {
    const { data } = await apolloClient.mutate({
      mutation: ADD_NOTE,
      variables: { id, content },
    })
    const call: Call = { ...data.addNote }
    return call
  }

  async subscribeToOnUpdatedCall(options: { onSuccess: (a: Call) => void, onError?: (e: Error) => void }) {
    const { onSuccess, onError } = options
    apolloClient
      .subscribe({
        query: ON_UPDATED_CALL,
      })
      .subscribe({
        next(data) {
          onSuccess(data.data?.onUpdatedCall)
        },
        error(err) {
          console.error('[Aircall Service] error on subscribe - on updated call', err)
          if (onError) {
            onError(err)
          }
        },
      })
  }

  async clearStore(): Promise<unknown[]> {
    return apolloClient.clearStore()
  }

  closeWebSocket() {
    wsClient.close()
  }

}

export default new AircallService()
