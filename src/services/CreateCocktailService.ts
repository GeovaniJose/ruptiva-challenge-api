import { getRepository } from 'typeorm'

import AppError from '../errors/AppError'
import Cocktail from '../models/Cocktail'

interface Request {
  name: string
  alcohol_level: number
  ingredients: string[]
  user_id: string
}

class CreateCocktailService {
  public async execute({
    name,
    alcohol_level,
    ingredients,
    user_id
  }: Request): Promise<Cocktail> {
    const cocktailsRepository = getRepository(Cocktail)

    if (alcohol_level < 1 || alcohol_level > 5) {
      throw new AppError('Alcohol level must be between 1 and 5.')
    }

    const cocktail = cocktailsRepository.create({
      name,
      alcohol_level,
      ingredients,
      user_id
    })

    await cocktailsRepository.save(cocktail)

    return cocktail
  }
}

export default CreateCocktailService
