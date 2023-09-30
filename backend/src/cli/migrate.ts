import { connectDb } from "@/db/connect_db"
import 'dotenv/config'
import { migrate } from "drizzle-orm/node-postgres/migrator"


!(async () => {
  const { db, destroy } = await connectDb()
  try {
    await migrate(db, { migrationsFolder: "drizzle" })
  } catch (error) {
    console.log(error)
  } finally {
    destroy()
  }
  console.log('Migration complete!')
})()

