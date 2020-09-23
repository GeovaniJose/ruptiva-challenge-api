import { Router } from 'express'

import usersRouter from './users.routes'
import sessionsRouter from './sessions.routes'
import cocktailsRouter from './cocktails.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/cocktails', cocktailsRouter)

export default routes
