// src/types/translation.ts
import { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { translations } from '../db/schema'

export type Translation = InferSelectModel<typeof translations>
export type NewTranslation = InferInsertModel<typeof translations>

export interface CreateTranslationDto {
  projectId?: number
  key: string
  translation: string
  locale: string
  isLeaf: boolean
}

export interface UpdateTranslationDto extends Partial<CreateTranslationDto> {
  key: string
}
