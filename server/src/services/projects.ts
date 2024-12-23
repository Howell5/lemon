import { eq } from 'drizzle-orm'
import { db } from '../db'
import { projects } from '../db/schema'
import { CreateProjectDto, UpdateProjectDto } from '../types/project'

export class ProjectService {
  async create(data: CreateProjectDto) {
    const slug = await this.findOne(data.slug)
    if (slug) {
      throw new Error('Slug already exists')
    }
    const [project] = await db.insert(projects).values(data).returning()
    return project
  }

  async findAll() {
    return await db.select().from(projects)
  }

  async findOne(slug: string) {
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.slug, slug))
    return project
  }

  async update(slug: string, data: Partial<UpdateProjectDto>) {
    const [project] = await db
      .update(projects)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(projects.slug, slug))
      .returning()
    return project
  }

  async delete(slug: string) {
    const [project] = await db
      .delete(projects)
      .where(eq(projects.slug, slug))
      .returning()
    return project
  }
}

export const projectService = new ProjectService()
