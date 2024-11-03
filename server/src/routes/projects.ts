// src/routes/projects.ts
import { Hono } from 'hono'
import { projectController } from '../controllers/projects'

const projects = new Hono()

projects.post('/', projectController.create)
projects.get('/', projectController.findAll)
projects.get('/:id', projectController.findOne)
projects.put('/:id', projectController.update)
projects.delete('/:id', projectController.delete)

export default projects
