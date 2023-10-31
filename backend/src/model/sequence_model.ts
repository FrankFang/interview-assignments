import { connectDb } from "@/db/connect_db"
import { sequences } from "@/db/schema"

export const destroySequences = async () => {
  const { db } = await connectDb()
  await db.delete(sequences)
}
