import { getRepository } from 'typeorm'
import path from 'path'
import fs from 'fs'

import uploadConfig from '../config/upload'
import AppError from '../errors/AppError'
import Cocktail from '../models/Cocktail'

interface Request {
  user_id: string
  cock_id: string
  imageFilename: string
}

class UpdateCocktailImageService {
  public async execute({
    user_id,
    cock_id,
    imageFilename
  }: Request): Promise<Cocktail> {
    const cocktailsRepository = getRepository(Cocktail)

    const cocktail = await cocktailsRepository.findOne(cock_id)

    if (!cocktail) {
      throw new AppError('Cocktail does not exist.')
    }

    if (cocktail.user_id !== user_id) {
      throw new AppError('You do not have permission to update this cocktail.')
    }

    if (cocktail.image) {
      const cocktailImgFilePath = path.join(
        uploadConfig.directory,
        cocktail.image
      )
      const cocktailImgFileExists = await fs.promises.stat(cocktailImgFilePath)

      if (cocktailImgFileExists) {
        await fs.promises.unlink(cocktailImgFilePath)
      }
    }

    cocktail.image = imageFilename

    await cocktailsRepository.save(cocktail)

    return cocktail
  }
}

export default UpdateCocktailImageService
