import { type Request, type Response } from 'express'
import { MongoServerError } from 'mongodb'
import usersService from '~/services/users.services'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body

  if (email === 'ndtoan@gmail.com' && password === '123123') {
    return res.json({
      message: 'Login success'
    })
  }
  res.json({
    message: 'Login failed'
  })
}

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const result = await usersService.register({ email, password })
    return res.status(200).json({
      message: 'Register success',
      result
    })
  } catch (error) {
    if (error instanceof MongoServerError) {
      console.log(error)
    }
    return res.status(400).json({
      message: 'Register failed'
    })
  }
}
