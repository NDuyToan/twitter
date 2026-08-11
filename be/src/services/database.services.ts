import { MongoClient } from 'mongodb'
import dns from 'node:dns'
import dotenv from 'dotenv'

dns.setServers(['8.8.8.8'])
dotenv.config()

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster-twitter-dev.tytn42p.mongodb.net/?appName=cluster-twitter-dev`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true
//   }
// })

// export async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect()
//     // Send a ping to confirm a successful connection
//     await client.db('admin').command({ ping: 1 })
//     console.log('Pinged your deployment. You successfully connected to MongoDB! 222')
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close()
//   }
// }

class DatabaseServices {
  private client: MongoClient

  constructor() {
    this.client = new MongoClient(uri)
  }

  async connect() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await this.client.connect()
      // Send a ping to confirm a successful connection
      await this.client.db('admin').command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB! 2222')
    } finally {
      await this.client.close()
    }
  }
}

const databaseServices = new DatabaseServices()
export default databaseServices
