import { Hono } from 'hono'
import { projectController } from '../controllers/projects'

const projects = new Hono()

projects.post('/', projectController.create)
projects.get('/', projectController.findAll)
projects.get('/get', projectController.findOne)
projects.put('/update', projectController.update)
// projects.delete('/delete', projectController.delete)

export default projects
