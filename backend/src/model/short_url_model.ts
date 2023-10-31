import { connectDb } from "@/db/connect_db"
import { sequences, shortUrls } from "@/db/schema"
import { UnknownError } from "@/lib/errors"
import { numberToSlug } from "@/lib/number_to_slug"
import { eq, sql } from "drizzle-orm"


type NewShortUrl = typeof shortUrls.$inferInsert

export const findShortUrl = async (slug: NewShortUrl['slug']) => {
  const { db } = await connectDb()
  const result = await db.query.shortUrls.findFirst({ where: eq(shortUrls.slug, slug) })
  return result
}
export const createShortUrl = async (raw: NewShortUrl['raw']) => {
  const { db } = await connectDb()
  const first = await db.query.shortUrls.findFirst({ where: eq(shortUrls.raw, raw) })
  if (first) {
    return first
  }
  const [seqResult] = await db.insert(sequences).values({ id: 1, name: 'short_url', number: 1 })
    .onConflictDoUpdate({
      target: sequences.id,
      set: { number: sql<number>`sequences.number + 1`, updatedAt: new Date() }
    })
    .returning()
  if (!seqResult) { throw new UnknownError() }
  const slug = numberToSlug(seqResult.number)
  const [result] = await db.insert(shortUrls).values({ raw, slug }).returning()
  if (!result) { throw new UnknownError() }
  return result
}

export const destroyShortUrls = async () => {
  const { db } = await connectDb()
  await db.delete(shortUrls)
}
