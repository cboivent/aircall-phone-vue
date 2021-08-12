import gql from 'graphql-tag'

export const LOGIN_USER = gql`
  mutation login($username: String! $password: String!) {
    login(input: { username: $username password: $password}) {
      access_token
      user {
        id
        username
      }
    }
  }
`

export const REFRESH_TOKEN = gql`
  mutation refreshToken {
    refreshToken {
      access_token
    }
  }
`

export const ARCHIVE_CALL = gql`
  mutation archiveCall($id: ID!) {
    archiveCall(id: $id) {
      id
      is_archived
    }
  }
`

export const ADD_NOTE = gql`
  mutation addNote($id: ID! $content: String!) {
    addNote(input: {activityId: $id content: $content }) {
      id
      notes {
        id
        content
      }
    }
  }
`
