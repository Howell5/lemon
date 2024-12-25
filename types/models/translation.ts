import type {
  CreateRequest,
  UpdateRequest,
  PaginationParams,
  SearchParams,
} from '../api/request'

export interface Translation {
  id: number
  projectId: number
  key: string
  translation: string
  context?: string
  createdAt: string
  updatedAt: string
}

export enum TranslationStatus {
  DRAFT = 'draft',
  TRANSLATED = 'translated',
  REVIEWING = 'reviewing',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface TranslationComment {
  id: number
  content: string
  createdAt: string
}

export type CreateTranslationRequest = CreateRequest<Translation>
export type UpdateTranslationRequest = UpdateRequest<Translation>

export interface TranslationListParams extends PaginationParams, SearchParams {
  status?: TranslationStatus
  language?: string
  tags?: string[]
}

export interface ImportTranslationResponse {
  successful: number
  failed: number
  errors?: Array<{
    key: string
    error: string
  }>
}
