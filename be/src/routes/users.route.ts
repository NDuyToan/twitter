import { NextFunction, Request, Response, Router } from 'express'
import { loginController, registerController } from '~/controllers/user.controller'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { asyncHandler } from '~/utils/asyncHandler'
import { validate } from '~/utils/validation'

const usersRouter = Router()

usersRouter.post('/login', loginValidator, loginController)


/**
 * Description: Register new user
 * Path: /register
 * Method: POST
 * Body: { name, email, password, confirmpassword, date_of_birth: Date ISO }
 * 
 * 
 */
usersRouter.post('/register', validate(registerValidator), asyncHandler(registerController))

export default usersRouter
