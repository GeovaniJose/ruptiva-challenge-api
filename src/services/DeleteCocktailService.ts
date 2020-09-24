import { getRepository } from 'typeorm'

import AppError from '../errors/AppError'
import Cocktail from '../models/Cocktail'

interface Request {
  id: string
  user_id: string
}

class DeleteCocktailService {
  public async execute({ id, user_id }: Request): Promise<void> {
    const cocktailsRepository = getRepository(Cocktail)

    const cocktail = await cocktailsRepository.findOne(id)

    if (!cocktail) {
      throw new AppError('Cocktail does not exist.')
    }

    if (cocktail.user_id !== user_id) {
      throw new AppError('You do not have permission to delete this cocktail.')
    }

    await cocktailsRepository.remove(cocktail)
  }
}

export default DeleteCocktailService
