import { Hono } from 'hono'
import { projectController } from '../controllers/projects'

const projects = new Hono()

projects.post('/', projectController.create)
projects.get('/', projectController.findAll)
projects.get('/:slug', projectController.findOne)
projects.put('/:slug', projectController.update)
projects.delete('/:slug', projectController.delete)

export default projects
