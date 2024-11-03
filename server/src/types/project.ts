import { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { projects } from '../db/schema'

export type Project = InferSelectModel<typeof projects>
export type NewProject = InferInsertModel<typeof projects>

export interface CreateProjectDto {
  name: string
  slug: string
  description?: string
  defaultLocale: string
  supportedLocales: string[]
}

export interface UpdateProjectDto extends Partial<CreateProjectDto> {
  id: number
}
