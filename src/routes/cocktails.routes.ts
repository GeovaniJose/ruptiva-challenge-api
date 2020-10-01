import { Router } from 'express'
import { getRepository } from 'typeorm'
import multer from 'multer'

import CreateCocktailService from '../services/CreateCocktailService'
import DeleteCocktailService from '../services/DeleteCocktailService'
import UpdateCocktailImageService from '../services/UpdateCocktailImageService'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import uploadConfig from '../config/upload'
import Cocktail from '../models/Cocktail'

const cocktailsRouter = Router()
const upload = multer(uploadConfig)

cocktailsRouter.use(ensureAuthenticated)

cocktailsRouter.get('/', async (request, response) => {
  const { id: user_id } = request.user
  const cocktailsRepository = getRepository(Cocktail)

  const cocktails = await cocktailsRepository.find({ where: { user_id } })

  return response.status(200).json(cocktails)
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

cocktailsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params
  const { id: user_id } = request.user

  const deleteCocktail = new DeleteCocktailService()

  await deleteCocktail.execute({
    id,
    user_id
  })

  return response.status(204).send()
})

cocktailsRouter.patch(
  '/image',
  ensureAuthenticated,
  upload.single('image'),
  async (request, response) => {
    const { cock_id } = request.query

    const updateCocktailImage = new UpdateCocktailImageService()

    const cocktail = await updateCocktailImage.execute({
      user_id: request.user.id,
      cock_id,
      imageFilename: request.file.filename
    })

    return response.status(200).json(cocktail)
  }
)

export default cocktailsRouter
