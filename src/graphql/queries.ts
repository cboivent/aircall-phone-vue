import { DocumentNode } from "graphql"
import gql from "graphql-tag"

export const CALL_MIN_INFOS_FRAGMENT = gql`
  fragment CallMinInfosFragment on Call {
    id
    created_at
    direction
    from
    to
    is_archived
  }
`

export const CALL_DETAILS_FRAGMENT = gql`
  fragment CallDetailsFragment on Call {
    duration
    via
    call_type
    notes {
      id
      content
    }
  }
`

export const LOGGED_USER = gql`
  query {
    me {
      id
      username
    }
  }
`

export const GET_CALLS_TOTAL_COUNT = gql`
query getCalls {
  paginatedCalls {
    totalCount
  }
}
`

export const GET_CALLS_ID_CREATED_AT = gql`
query getCalls($offset: Float! $limit: Float!) {
  paginatedCalls(offset: $offset, limit: $limit) {
    nodes {
      id
      created_at
    }
    totalCount
    hasNextPage
  }
}
`

export const GET_CALLS = gql`
  query getCalls($offset: Float! $limit: Float!) {
    paginatedCalls(offset: $offset, limit: $limit) {
      nodes {
        id
        created_at
        ...CallMinInfosFragment
      }
      totalCount
      hasNextPage
    }
  }
  ${CALL_MIN_INFOS_FRAGMENT}
`

export const GET_CALLS_BY_ID = (nbQuery: number): DocumentNode => {
  let params = ''
  let operations = ''
  for (let i = 0; i < nbQuery; i++) {
    params += `$id_${i}: ID!, `
    operations += `
      call_${i}: call(id: $id_${i}) {
        id
        created_at
        direction
        from
        to
        is_archived
      }
    `
  }
  return gql(`query getCallsById(${params}) { ${operations} }`)
}

export const GET_CALL = gql`
  query getCall($id: ID!) {
    call(id: $id) {
      id
      ...CallMinInfosFragment
      ...CallDetailsFragment
    }
  }
  ${CALL_MIN_INFOS_FRAGMENT}
  ${CALL_DETAILS_FRAGMENT}
`
