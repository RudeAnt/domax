export type RequestCategory =
  | 'PLUMBING'
  | 'ELECTRICS'
  | 'ELEVATOR'
  | 'COMMON_AREA'
  | 'OTHER'

export type RequestStatus = 'CREATED' | 'IN_PROGRESS' | 'COMPLETED' | 'CLOSED'

export interface AuthorInfo {
  id: string
  fullName: string
  role: 'RESIDENT' | 'DISPATCHER'
  address: string
  apartment?: number
}

export interface ServiceRequest {
  id: string
  title: string
  category: RequestCategory
  description: string
  address: string
  apartment?: number
  photoUrl?: string
  status: RequestStatus
  /** ISO-дата нормативного дедлайна — приходит готовой с бэка, на фронте не пересчитывается */
  slaDeadline: string
  upvotesCount: number
  author: AuthorInfo
  assignee: AuthorInfo | null
  createdAt: string
  updatedAt: string
}

export interface CreateRequestInput {
  title: string
  category: RequestCategory
  description: string
  address: string
  apartment?: number
  photoUrl?: string
}

