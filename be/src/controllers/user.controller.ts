import { NextFunction, type Request, type Response } from 'express'
import { MongoServerError } from 'mongodb'
import { LoginReqBody, RegisterReqBody } from '~/models/requests/User.requests'
import usersService from '~/services/users.services'

export const loginController = async (req: Request<{}, {}, LoginReqBody>, res: Response) => {
  const { email, password } = req.body

  try {
    const result = await usersService.login({ email, password })
    return res.status(200).json({
      message: 'Login success',
      result
    })
  } catch (error) {
    console.log('err', error)
    if (error instanceof MongoServerError) {
      console.log(error)
    }
    return res.status(400).json({
      message: 'Login failed'
    })
  }
}

export const registerController = async (req: Request<{}, {}, RegisterReqBody>, res: Response, next: NextFunction) => {
  const { email, password, confirm_password, username, date_of_birth } = req.body

  try {
    //throw new Error("loi roi")
    const result = await usersService.register({ email, password, confirm_password, username, date_of_birth })
    return res.status(200).json({
      message: 'Register success',
      result
    })
  } catch (error) {
    next(error)
  }
}
