import gql from "graphql-tag"

export const ON_UPDATED_CALL = gql`
  subscription onUpdatedCall {
    onUpdatedCall {
      id
      created_at
      is_archived
      notes {id content}
    }
  }
`
