import { Collection, Db, MongoClient } from 'mongodb'

import dns from 'node:dns'
import dotenv from 'dotenv'
import User from '~/models/schemas/User.schema'

dns.setServers(['8.8.8.8'])
dotenv.config()

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster-twitter-dev.tytn42p.mongodb.net/?appName=cluster-twitter-dev`

class DatabaseServices {
  private client: MongoClient
  private db: Db

  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await this.client.connect()
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB! 2222')
    } catch (error) {
      console.log(error)
    }
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }
}

const databaseServices = new DatabaseServices()
export default databaseServices
