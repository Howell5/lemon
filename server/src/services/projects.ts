import { eq } from 'drizzle-orm'
import { db } from '../db'
import { projects } from '../db/schema'
import { CreateProjectDto, UpdateProjectDto } from '../types/project'

export class ProjectService {
  async create(data: CreateProjectDto) {
    const [project] = await db.insert(projects).values(data).returning()
    return project
  }

  async findAll() {
    return await db.select().from(projects)
  }

  async findOne(id: number) {
    const [project] = await db.select().from(projects).where(eq(projects.id, id))
    return project
  }

  async update(id: number, data: Partial<UpdateProjectDto>) {
    const [project] = await db
      .update(projects)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning()
    return project
  }

  async delete(id: number) {
    const [project] = await db.delete(projects).where(eq(projects.id, id)).returning()
    return project
  }
}

export const projectService = new ProjectService()
