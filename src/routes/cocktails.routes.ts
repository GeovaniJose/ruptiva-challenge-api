import { Router } from 'express'

import CreateCocktailService from '../services/CreateCocktailService'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const cocktailsRouter = Router()

cocktailsRouter.use(ensureAuthenticated)

cocktailsRouter.get('/', async (request, response) => {
  return response.status(200).json()
})

cocktailsRouter.post('/', async (request, response) => {
  const { name, alcohol_level, ingredients = [] } = request.body
  const { id: user_id } = request.user

  const createCocktail = new CreateCocktailService()

  const cocktail = await createCocktail.execute({
    name,
    alcohol_level,
    ingredients,
    user_id
  })

  return response.status(200).json(cocktail)
})

export default cocktailsRouter
