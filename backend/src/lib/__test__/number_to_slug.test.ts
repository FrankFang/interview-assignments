import { IdOutOfRangeError } from "@/lib/errors"
import { maxId, numberToSlug } from "@/lib/number_to_slug"

describe('Convert a number to a slug', function () {
  it('works well', (done) => {
    const limit = 8
    const check = (slug: string) => slug.length > 0 && slug.length <= limit
    expect(check(numberToSlug(1))).toBe(true)
    expect(check(numberToSlug(1_000_000))).toBe(true)
    expect(check(numberToSlug(1_000_000_000))).toBe(true)
    expect(check(numberToSlug(1_000_000_000_000))).toBe(true)
    expect(check(numberToSlug(maxId))).toBe(true)
    expect(() => numberToSlug(maxId + 1)).toThrowError(IdOutOfRangeError)
    expect(() => numberToSlug(0)).toThrowError(IdOutOfRangeError)
    done()
  })
})
