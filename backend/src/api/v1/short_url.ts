import { connectDb } from "@/db/connect_db"
import { sequences, shortUrls } from "@/db/schema"
import { asyncHandlerWrapper } from "@/lib/async_handler_wrapper"
import { numberToSlug } from "@/lib/number_to_slug"
import { sql } from "drizzle-orm"

/**
 * 短域名读取接口：接受短域名信息，返回长域名信息。
 **/
export const show = () => { }


/**
 * 短域名存储接口：接受长域名信息，返回短域名信息。
 **/
export const create = asyncHandlerWrapper(async (req, res) => {
  // read json from req body
  const { raw } = req.body
  const { db } = await connectDb()
  const seqResult = await db.insert(sequences).values({ id: 1, name: 'short_url', number: 1 })
    .onConflictDoUpdate({
      target: sequences.id,
      set: { number: sql<number>`sequences.number + 1`, updatedAt: new Date() }
    })
    .returning()
  if (!seqResult[0]) {
    res.status(500)
    res.end()
    return
  }
  const slug = numberToSlug(seqResult[0].number)
  const [result] = await db.insert(shortUrls).values({ raw, slug }).returning()
  res.json({ error_code: 0, result })
})
