import { Router } from 'express'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const cocktailsRouter = Router()

cocktailsRouter.use(ensureAuthenticated)

cocktailsRouter.get('/', async (request, response) => {
  return response.status(200).json({ ok: true })
})

export default cocktailsRouter
