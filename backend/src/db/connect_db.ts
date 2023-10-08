import * as schema from '@/db/schema'
import { DatabaseConnectionError } from '@/lib/errors'
import 'dotenv/config'
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

let pool: Pool | null = null

export const connectDb = async () => {
  if (!pool) {
    pool = new Pool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })

    pool.on('error', (err, client) => {
      console.error('Unexpected error on idle client', err)
      process.exit(1)
    })
  }
  const client = await pool.connect().catch(err => Promise.reject(new DatabaseConnectionError(err)))
  const db = drizzle(client, { schema })
  return {
    client,
    db,
    pool,
    release: () => client.release(),
    destroy: () => {
      client.release()
      pool?.end()
    }
  }
}
