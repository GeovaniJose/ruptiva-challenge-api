import { Router } from 'express'
import { getRepository } from 'typeorm'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import Cocktail from '../models/Cocktail'

const cocktailsRouter = Router()

cocktailsRouter.use(ensureAuthenticated)

cocktailsRouter.get('/', async (request, response) => {
  const cocktailsRepository = getRepository(Cocktail)
  const cocktails = await cocktailsRepository.find()

  return response.status(200).json(cocktails)
})

cocktailsRouter.post('/', async (request, response) => {
  const { id: user_id } = request.user

  const cocktailsRepository = getRepository(Cocktail)

  const cocktail = cocktailsRepository.create({
    user_id,
    name: 'Marguerita',
    alcohol_level: 3,
    ingredients: ['30ml vodka', '50ml água de coco', '1 limão']
  })

  await cocktailsRepository.save(cocktail)

  return response.status(200).json(cocktail)
})

export default cocktailsRouter
