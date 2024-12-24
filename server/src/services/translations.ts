// services/translations.ts

import { db } from '../db'
import { eq } from 'drizzle-orm'
import { translations } from '../db/schema'
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
}

export const translationService = new TranslationService()
