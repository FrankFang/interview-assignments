import { asyncHandlerWrapper } from "@/lib/async_handler_wrapper"
import { createShortUrl, findShortUrl } from "@/model/short_url_model"

/**
 * 短域名读取接口：接受短域名信息，返回长域名信息。
 **/
export const show = asyncHandlerWrapper(async (req, res) => {
  const { slug } = req.params
  const result = await findShortUrl(slug)
  res.json({ error_no: 0, result })
})


/**
 * 短域名存储接口：接受长域名信息，返回短域名信息。
 **/
export const create = asyncHandlerWrapper(async (req, res) => {
  const { raw } = req.body
  const result = await createShortUrl(raw)
  res.json({ error_no: 0, result })
})
