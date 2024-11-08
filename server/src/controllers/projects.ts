// src/controllers/projects.ts
import { Context } from 'hono'
import { projectService } from '../services/projects'
import { CreateProjectDto, UpdateProjectDto } from '../types/project'

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
      const id = Number(c.req.param('id'))
      const project = await projectService.findOne(id)
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
      const id = Number(c.req.param('id'))
      const body = await c.req.json<Partial<UpdateProjectDto>>()
      const project = await projectService.update(id, body)
      if (!project) {
        return c.json({ message: 'Project not found' }, 404)
      }
      return c.json(project)
    } catch (error) {
      return c.json({ message: error.message }, 400)
    }
  }

  async delete(c: Context) {
    try {
      const id = Number(c.req.param('id'))
      const project = await projectService.delete(id)
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
