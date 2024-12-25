// services/translations.ts

import { db } from '../db'
import { eq } from 'drizzle-orm'
import { projects, translations } from '../db/schema'
import {
  CreateTranslationDto,
  UpdateTranslationDto,
} from '../types/translation'

export class TranslationService {
  async create(dto: CreateTranslationDto) {
    const translation = await db.insert(translations).values(dto)
    return translation
  }

  async update(key: string, dto: UpdateTranslationDto) {
    const translation = await db
      .update(translations)
      .set(dto)
      .where(eq(translations.key, key))
    return translation
  }

  async findAll(slug: string) {
    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.slug, slug))
      .then(([project]) => project)

    if (!project) {
      throw new Error('Project not found')
    }

    const list = await db
      .select()
      .from(translations)
      .where(eq(translations.projectId, project.id))

    return list
  }
}

export const translationService = new TranslationService()
