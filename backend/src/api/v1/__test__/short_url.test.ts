import { app } from "@/app"
import request from 'supertest'

describe('Short Urls', function () {
  it('generates a slug from a short url', async () => {
    const response = await request(app)
      .post('/s')
      .send({ raw: 'https://google.com' })
      .set('Content-Type', 'application/json')
    expect(response.status).toEqual(200)
    const body = response.body
    expect(body).toHaveProperty('error_code')
    expect(body.error_code).toBe(0)
    expect(body).toHaveProperty('result')
    expect(body.result.slug.length <= 8).toBe(true)
  })
})
