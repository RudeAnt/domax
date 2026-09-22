export type RequestCategory =
  | 'leak'
  | 'elevator'
  | 'electricity'
  | 'heating'
  | 'other'

export type RequestStatus = 'registered' | 'in_progress' | 'closed'

export interface ServiceRequest {
  id: string
  category: RequestCategory
  description: string
  address: string
  phone: string
  photoDataUrl?: string
  status: RequestStatus
  createdAt: string
  /** Нормативный срок устранения в часах от createdAt — см. src/data/slaConfig.ts */
  resolutionHours: number
}

export interface CreateRequestInput {
  category: RequestCategory
  description: string
  address: string
  phone: string
  photoDataUrl?: string
}
