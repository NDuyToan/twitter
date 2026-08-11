import databaseServices from './services/database.services'
import express from 'express'
import usersRouter from './routes/users.route'

const app = express()

const port = 3000

app.use(express.json())

app.use('/user', usersRouter)
databaseServices.connect()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
