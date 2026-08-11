import { type Request, type Response } from 'express'

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
