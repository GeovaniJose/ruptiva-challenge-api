import { Router } from 'express'

import usersRouter from './users.routes'

const routes = Router()

routes.use('/users', usersRouter)

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World' })
})

export default routes
