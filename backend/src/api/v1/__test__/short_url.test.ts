import { app } from "@/app"
import { createShortUrl } from "@/model/short_url_model"
import request from 'supertest'

describe('Short Urls', function () {
  it('generates a slug from a short url', async () => {
    const response = await request(app)
      .post('/s')
      .send({ raw: 'https://google.com' })
      .set('Content-Type', 'application/json')
    const body = response.body
    expect(response.status).toEqual(200)
    expect(body).toHaveProperty('error_no')
    expect(body.error_no).toBe(0)
    expect(body).toHaveProperty('result')
    expect(body.result.slug.length <= 8).toBe(true)
  })
  it('generates the same slug for the same url', async () => {
    const url = 'https://google.com'
    const { slug } = await createShortUrl(url)
    const response = await request(app)
      .post('/s')
      .send({ raw: url })
      .set('Content-Type', 'application/json')
    const body = response.body
    expect(response.status).toEqual(200)
    expect(body).toHaveProperty('error_no')
    expect(body.error_no).toBe(0)
    expect(body).toHaveProperty('result')
    expect(body.result.slug).toBe(slug)

  })

  it('shows original url', async () => {
    const { slug } = await createShortUrl('https://google.com')
    const response = await request(app)
      .get(`/s/${slug}`)
    const body = response.body
    expect(response.status).toEqual(200)
    expect(body.error_no).toBe(0)
    expect(body).toHaveProperty('result')
    expect(body.result.raw).toBe('https://google.com')
  })
})
