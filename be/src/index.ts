import databaseServices from './services/database.services'
import express, { NextFunction, Request, Response } from 'express'
import usersRouter from './routes/users.route'

const app = express()
const port = 3000

app.use(express.json())
app.use('/user', usersRouter)
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Error: ', error.message)
  res.status(400).json({ message: error.message })
})

async function bootstrap() {
  await databaseServices.connect()

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

bootstrap()