import { Router } from 'express'
import multer from 'multer'

import CreateUserService from '../services/CreateUserService'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'
import UpdateUserService from '../services/UpdateUserService'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import uploadConfig from '../config/upload'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
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
})

usersRouter.put('/', ensureAuthenticated, async (request, response) => {
  const { name, age } = request.body

  const updateUser = new UpdateUserService()

  const user = await updateUser.execute({
    user_id: request.user.id,
    name,
    age
  })

  delete user.password

  return response.status(200).json(user)
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService()

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    })

    delete user.password

    return response.status(200).json(user)
  }
)

export default usersRouter
