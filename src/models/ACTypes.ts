export enum Direction {
  INBOUND = 'inbound',
  OUTBOUND = 'outbound'
}

export enum CallType {
  VOICEMAIL = 'voicemail',
  MISSED = 'missed',
  ANSWERED = 'answered'
}

export interface AuthResponse {
  access_token: string
  user: User
}

export interface Call {
  id: number
  direction: Direction
  from: string
  to: string
  duration: number
  via: string
  is_archived: boolean
  call_type: CallType
  created_at: string
  notes: Note[]
}

export interface Note {
  id: number
  content: string
}

export interface User {
  id: number
  username: string
}

export interface PaginatedCalls {
  nodes: Call[],
  totalCount: number,
  hasNextPage: boolean
}
