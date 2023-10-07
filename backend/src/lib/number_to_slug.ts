import { IdOutOfRangeError } from "@/lib/errors"

const charset = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_.~!*'()`

const length = charset.length
export const maxId = Math.pow(length, 8) - 1

export const numberToSlug = (id: number): string => {
  if (id > maxId || id <= 0) {
    throw new IdOutOfRangeError(id)
  }
  let slug = ''
  while (id > 0) {
    let remainder = id % length
    slug = charset[remainder] + slug
    id = Math.floor(id / length)
  }
  return slug
}
