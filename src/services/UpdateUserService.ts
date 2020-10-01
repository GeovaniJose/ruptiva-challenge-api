import { getRepository } from 'typeorm'

import AppError from '../errors/AppError'
import User from '../models/User'

interface Request {
  user_id: string
  name: string
  age: number
}

class UpdateUserService {
  public async execute({ user_id, name, age }: Request): Promise<User> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can update profile.', 401)
    }

    user.name = name
    user.age = age

    await usersRepository.save(user)

    return user
  }
}

export default UpdateUserService
