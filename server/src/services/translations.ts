// services/translations.ts

import { db } from '../db'
import { eq, and, desc, asc } from 'drizzle-orm'
import { projects, translations } from '../db/schema'
import {
  CreateTranslationDto,
  UpdateTranslationDto,
} from '../types/translation'

interface FindOneTranslationDto {
  projectId: number
  key: string
  locale: string
}

export class TranslationService {
  async create(dto: CreateTranslationDto) {
    const translation = await db.insert(translations).values(dto)
    return translation
  }

  async findOne(dto: FindOneTranslationDto) {
    const { projectId, key, locale } = dto
    const translation = await db
      .select()
      .from(translations)
      .where(
        and(
          eq(translations.projectId, Number(projectId)),
          eq(translations.key, key),
          eq(translations.locale, locale)
        )
      )
      .then(([translation]) => translation)
    return translation
  }

  async update(translationId: number, dto: UpdateTranslationDto) {
    const translation = await db
      .update(translations)
      .set(dto)
      .where(eq(translations.id, translationId))
    return translation
  }

  async findAll(slug: string, locale?: string) {
    // locale is optional
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
      // if locale is provided, filter by locale
      .where(
        and(
          eq(translations.projectId, project.id),
          locale ? eq(translations.locale, locale) : undefined
        )
      )
      .orderBy(asc(translations.key))

    return list
  }

  async findAllByKey(slug: string, key: string) {
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
      .where(
        and(eq(translations.projectId, project.id), eq(translations.key, key))
      )

    return list
  }
}

export const translationService = new TranslationService()
