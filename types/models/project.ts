import type {
  CreateRequest,
  UpdateRequest,
  PaginationParams,
  SearchParams,
} from '../api/request'

export interface Project {
  id: number
  name: string
  description: string
  status: ProjectStatus
  createdAt: string
  updatedAt: string
  settings: ProjectSettings
}

export enum ProjectStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  DELETED = 'deleted',
}

export interface ProjectSettings {
  sourceLanguage: string
  targetLanguages: string[]
  autoTranslate: boolean
  reviewEnabled: boolean
  notifications: {
    email: boolean
    slack: boolean
    webhook?: string
  }
}

export type CreateProjectRequest = CreateRequest<Project>
export type UpdateProjectRequest = UpdateRequest<Project>

export interface ProjectListParams extends PaginationParams, SearchParams {
  status?: ProjectStatus
  ownerId?: number
}
