// controllers/translations.ts

import { flatten } from '../utils'
import { Context } from 'hono'
import { translationService } from '../services/translations'
import {
  CreateTranslationDto,
  UpdateTranslationDto,
} from '../types/translation'
import { projectService } from '../services/projects'

export class TranslationController {
  async create(c: Context) {
    try {
      const body = await c.req.json<CreateTranslationDto>()
      const translation = await translationService.create(body)
      return c.json(translation, 201)
    } catch (error) {
      return c.json({ message: error.message }, 400)
    }
  }

  async update(c: Context) {
    try {
      const body = await c.req.json<UpdateTranslationDto>()
      const key = c.req.param('key')
      const translation = await translationService.update(key, body)
      return c.json(translation, 200)
    } catch (error) {
      return c.json({ message: error.message }, 400)
    }
  }

  async setTranslationByFile(c: Context) {
    try {
      const formData = await c.req.formData()
      const projectName = formData.get('projectName') as string
      const file = formData.get('file') as File
      const locale = formData.get('locale') as string

      if (!projectName || !file || !locale) {
        return c.json({ message: 'Missing required fields' }, 400)
      }

      if (file.type !== 'application/json') {
        return c.json({ message: 'File must be JSON' }, 400)
      }

      const fileContent = await file.text()
      let json = {}
      try {
        json = JSON.parse(fileContent)
        if (
          !json ||
          typeof json !== 'object' ||
          Object.keys(json)?.length === 0
        ) {
          throw new Error('Invalid JSON file')
        }
      } catch (error) {
        return c.json({ message: 'Invalid JSON file' }, 400)
      }

      const project = await projectService.findOne(projectName)
      if (!project) {
        return c.json({ message: 'Project not found' }, 404)
      }

      const flattened = flatten(json)
      for (const [key, value] of Object.entries(flattened)) {
        await translationService.create({
          projectId: project.id,
          key,
          translation: value,
          locale,
        })
      }

      return c.json({ message: 'Translations uploaded successfully' })
    } catch (error) {
      return c.json({ message: error.message }, 500)
    }
  }
}

export const translationController = new TranslationController()
