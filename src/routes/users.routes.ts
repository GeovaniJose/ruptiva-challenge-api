import { Router } from 'express'

import CreateUserService from '../services/CreateUserService'

const usersRouter = Router()

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password, age } = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({
      name,
      email,
      password,
      age
    })

    delete user.password

    return response.status(200).json(user)
  } catch (err) {
    return response.status(400).json(err.message)
  }
})

export default usersRouter
