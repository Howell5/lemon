// src/controllers/projects.ts
import { Context } from 'hono'
import { projectService } from '../services/projects'
import { CreateProjectDto, UpdateProjectDto } from '../types/project'
import { translationService } from '../services/translations'

export class ProjectController {
  async create(c: Context) {
    try {
      const body = await c.req.json<CreateProjectDto>()
      const project = await projectService.create(body)
      return c.json(project, 201)
    } catch (error) {
      return c.json({ message: error.message }, 400)
    }
  }

  async findAll(c: Context) {
    try {
      const projects = await projectService.findAll()
      return c.json(projects)
    } catch (error) {
      return c.json({ message: error.message }, 400)
    }
  }

  async findOne(c: Context) {
    try {
      const slug = c.req.param('slug')
      const project = await projectService.findOne(slug)
      if (!project) {
        return c.json({ message: 'Project not found' }, 404)
      }
      return c.json(project)
    } catch (error) {
      return c.json({ message: error.message }, 400)
    }
  }

  async update(c: Context) {
    try {
      const slug = c.req.param('slug')
      const body = await c.req.json<Partial<UpdateProjectDto>>()
      const project = await projectService.update(slug, body)
      if (!project) {
        return c.json({ message: 'Project not found' }, 404)
      }
      return c.json(project)
    } catch (error) {
      return c.json({ message: error.message }, 400)
    }
  }

  async findTranslations(c: Context) {
    // console.log({
    //   req: c.req,
    // })

    const projectName = c.req.query('projectName')
    if (!projectName) {
      return c.json({ message: 'Project name is required' }, 400)
    }
    const translations = await translationService.findAll(projectName)
    return c.json(translations)
  }

  async delete(c: Context) {
    try {
      const slug = c.req.param('slug')
      const project = await projectService.delete(slug)
      if (!project) {
        return c.json({ message: 'Project not found' }, 404)
      }
      return c.json(project)
    } catch (error) {
      return c.json({ message: error.message }, 400)
    }
  }
}

export const projectController = new ProjectController()
