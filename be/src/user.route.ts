import express, { Router, type Request, type Response, type NextFunction } from 'express'

const userRouter = Router()

userRouter.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Time: ', Date.now())
  next()
})

userRouter.get('/tweets', (req: Request, res: Response) => {
  res.json({
    data: [
      {
        id: 1,
        title: 'hihi'
      }
    ]
  })
})

export default userRouter
